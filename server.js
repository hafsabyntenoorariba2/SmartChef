// server.js - The Bridge for ChefVoyage
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const https = require('https');
const net = require('net');
const os = require('os');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Allow cross-origin requests from frontend tools or other LAN devices
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.set({ 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
    next();
});

// Serve ONLY the public frontend files. (Previously the whole project folder was exposed,
// including server.js, package.json, node_modules and .git.)
const PUBLIC_FILES = ['index.html', 'style.css', 'script.js', 'cuisines.js', 'recipes.js'];
const sendPublic = file => (req, res) => res.set('Cache-Control', 'no-cache').sendFile(path.join(__dirname, file));
app.get('/', sendPublic('index.html'));
PUBLIC_FILES.forEach(file => app.get(`/${file}`, sendPublic(file)));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: '7d', index: false, dotfiles: 'ignore' }));

// Reuse TLS connections and memoize upstream answers so repeat lookups return instantly.
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const CACHE_TTL = 10 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
const cache = new Map();

function isEmptyCacheValue(value) {
    if (value == null) return true;
    if (Array.isArray(value)) return value.length === 0;
    if (Array.isArray(value.elements)) return value.elements.length === 0;
    return false;
}

function withCache(key, ttl, fn, cacheEmpty = true) {
    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) return hit.promise;
    const promise = fn().then(
        value => {
            // A miss (unknown city, no shops) must not stick for the whole TTL, or the next try fails instantly.
            if (!cacheEmpty && isEmptyCacheValue(value)) cache.delete(key);
            else cache.set(key, { promise: Promise.resolve(value), expires: Date.now() + ttl });
            return value;
        },
        err => { cache.delete(key); throw err; }
    );
    cache.set(key, { promise, expires: Date.now() + ttl });
    // Bound memory: drop the oldest entry (Map iterates in insertion order).
    if (cache.size > CACHE_MAX_ENTRIES) cache.delete(cache.keys().next().value);
    return promise;
}

// Sweep expired entries so a long-running server doesn't hold stale responses forever.
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of cache) if (entry.expires <= now) cache.delete(key);
}, 5 * 60 * 1000).unref();

function isPrivateIp(ip) {
    if (!ip || !net.isIP(ip)) return true;
    if (ip === '::1' || ip.startsWith('fe80:') || ip.startsWith('fc') || ip.startsWith('fd')) return true;
    if (net.isIPv4(ip)) {
        const [a, b] = ip.split('.').map(Number);
        return a === 10 || a === 127 || a === 0 ||
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 168) ||
            (a === 169 && b === 254) ||
            (a === 100 && b >= 64 && b <= 127);
    }
    return false;
}

const NOMINATIM_HEADERS = { 'User-Agent': 'ChefVoyage/1.0 (educational meal planner)', 'Accept-Language': 'en' };
const SHOP_TYPES = new Set(['supermarket', 'grocery', 'convenience', 'greengrocer', 'general', 'department_store', 'food']);

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function shopViewbox(lat, lng, radius) {
    const dLat = radius / 111320;
    const dLon = radius / (111320 * Math.max(0.2, Math.cos(lat * Math.PI / 180)));
    return `${(lng - dLon).toFixed(5)},${(lat + dLat).toFixed(5)},${(lng + dLon).toFixed(5)},${(lat - dLat).toFixed(5)}`;
}

// --- API 0: IP-Based Geolocation (Universal fallback for any device & plain-HTTP) ---
app.get('/api/ip-location', async (req, res) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientIp = String(rawIp).split(',')[0].trim().replace(/^::ffff:/, '');

    // If client has a public IP, query it; if private (LAN/localhost) or malformed,
    // geolocate the server's own public IP instead.
    const queryIp = isPrivateIp(clientIp) ? '' : clientIp;

    try {
        const data = await withCache(`ip:${queryIp || 'self'}`, CACHE_TTL, async () => {
            const providers = [
                async () => {
                    const targetUrl = queryIp ? `https://ipwho.is/${encodeURIComponent(queryIp)}` : 'https://ipwho.is/';
                    const r = await axios.get(targetUrl, { httpAgent, httpsAgent, timeout: 3500 });
                    if (r.data && r.data.success !== false && Number.isFinite(r.data.latitude) && Number.isFinite(r.data.longitude)) {
                        return { lat: r.data.latitude, lng: r.data.longitude, city: r.data.city || '', region: r.data.region || '', country: r.data.country || '', source: 'ip' };
                    }
                    throw new Error('ipwho.is empty');
                },
                async () => {
                    const targetUrl = queryIp ? `https://freeipapi.com/api/json/${encodeURIComponent(queryIp)}` : 'https://freeipapi.com/api/json';
                    const r = await axios.get(targetUrl, { httpAgent, httpsAgent, timeout: 3500 });
                    if (r.data && Number.isFinite(r.data.latitude) && Number.isFinite(r.data.longitude)) {
                        return { lat: r.data.latitude, lng: r.data.longitude, city: r.data.cityName || '', region: r.data.regionName || '', country: r.data.countryName || '', source: 'ip' };
                    }
                    throw new Error('freeipapi empty');
                },
                async () => {
                    const targetUrl = queryIp ? `https://ipapi.co/${encodeURIComponent(queryIp)}/json/` : 'https://ipapi.co/json/';
                    const r = await axios.get(targetUrl, { headers: NOMINATIM_HEADERS, httpAgent, httpsAgent, timeout: 3500 });
                    const lat = parseFloat(r.data?.latitude);
                    const lng = parseFloat(r.data?.longitude);
                    if (Number.isFinite(lat) && Number.isFinite(lng)) {
                        return { lat, lng, city: r.data.city || '', region: r.data.region || '', country: r.data.country_name || '', source: 'ip' };
                    }
                    throw new Error('ipapi.co empty');
                }
            ];
            // First provider to answer wins. Sequential fallbacks used to add each timeout together.
            return await Promise.any(providers.map(run => run()));
        });

        res.json(data);
    } catch (err) {
        console.error('IP Geolocation Error:', err.message);
        res.status(500).json({ error: 'Could not determine IP location' });
    }
});

// --- API 1: Find Location Coordinates ---
app.get('/api/geocode', async (req, res) => {
    const query = (req.query.q || '').trim();
    if (!query) return res.status(400).json({ error: 'Missing city name' });

    try {
        const data = await withCache(`geo:${query.toLowerCase()}`, CACHE_TTL, async () => {
            // Attempt 1: Nominatim. A miss is not cached, so a typo doesn't block the corrected search.
            try {
                const r = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: { format: 'jsonv2', q: query, limit: 1, 'accept-language': 'en' },
                    headers: NOMINATIM_HEADERS,
                    httpAgent, httpsAgent,
                    timeout: 4000
                });
                if (Array.isArray(r.data) && r.data.length > 0) {
                    return r.data;
                }
            } catch (e) {
                console.warn('Backend Nominatim geocode failed, trying Photon:', e.message);
            }

            // Attempt 2: Photon OSM geocoder (tolerant, fast fallback)
            try {
                const pRes = await axios.get('https://photon.komoot.io/api/', {
                    params: { q: query, limit: 1, lang: 'en' },
                    httpAgent, httpsAgent,
                    timeout: 4000
                });
                if (pRes.data?.features?.length > 0) {
                    const f = pRes.data.features[0];
                    const [lon, lat] = f.geometry.coordinates;
                    const p = f.properties || {};
                    const name = [p.name, p.street, p.city || p.town || p.district, p.state, p.country].filter(Boolean).join(', ');
                    return [{ lat: String(lat), lon: String(lon), display_name: name || query }];
                }
            } catch (pErr) {
                console.warn('Backend Photon geocode failed:', pErr.message);
            }

            return [];
        }, false);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(data);
    } catch (error) {
        console.error("Geocode Error:", error.message);
        res.status(500).json({ error: "Could not find location" });
    }
});

// --- API 1b: Coordinates -> Readable Address (used by GPS) ---
app.get('/api/reverse', async (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        return res.status(400).json({ error: 'lat and lon are required' });
    }

    try {
        const data = await withCache(`rev:${lat.toFixed(4)},${lon.toFixed(4)}`, CACHE_TTL, async () => {
            // Attempt 1: Nominatim
            try {
                const r = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                    params: { format: 'jsonv2', lat, lon, zoom: 16, addressdetails: 1, 'accept-language': 'en' },
                    headers: NOMINATIM_HEADERS,
                    httpAgent, httpsAgent,
                    timeout: 4000
                });
                if (r.data && r.data.display_name) return r.data;
            } catch (e) {
                console.warn('Backend Nominatim reverse failed, trying Photon:', e.message);
            }

            // Attempt 2: Photon reverse
            try {
                const pRes = await axios.get('https://photon.komoot.io/reverse', {
                    params: { lat, lon },
                    httpAgent, httpsAgent,
                    timeout: 4000
                });
                if (pRes.data?.features?.length > 0) {
                    const p = pRes.data.features[0].properties || {};
                    const name = [p.name, p.street, p.city || p.town, p.country].filter(Boolean).join(', ');
                    return {
                        display_name: name || `${lat.toFixed(3)}°, ${lon.toFixed(3)}°`,
                        address: { road: p.street || p.name, city: p.city || p.town, country: p.country }
                    };
                }
            } catch (pErr) {
                console.warn('Backend Photon reverse failed:', pErr.message);
            }

            return { display_name: `${lat.toFixed(3)}°, ${lon.toFixed(3)}°` };
        });
        res.json(data);
    } catch (error) {
        console.error("Reverse Geocode Error:", error.message);
        res.status(500).json({ error: "Could not read address" });
    }
});

// --- API 2: Find Real Stores Nearby ---
// Nominatim answers a bounded shop search in about a second. The public Overpass
// servers are often queued for 10s+ and then time out, so they are only a spare.
const MAX_RADIUS = 8000;

async function nominatimShopSearch(lat, lng, radius, term) {
    const r = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            format: 'jsonv2',
            q: term,
            viewbox: shopViewbox(lat, lng, radius),
            bounded: 1,
            limit: 15,
            'accept-language': 'en'
        },
        headers: NOMINATIM_HEADERS,
        httpAgent, httpsAgent,
        timeout: 4500
    });
    return Array.isArray(r.data) ? r.data : [];
}

function toStoreElements(items, lat, lng, radius) {
    const seen = new Set();
    const elements = [];
    for (const item of items) {
        if (!item || !item.name || item.category !== 'shop' || !SHOP_TYPES.has(item.type)) continue;
        const sLat = parseFloat(item.lat);
        const sLng = parseFloat(item.lon);
        if (!Number.isFinite(sLat) || !Number.isFinite(sLng)) continue;
        if (haversineKm(lat, lng, sLat, sLng) > radius / 1000 + 0.4) continue;
        const key = String(item.osm_id || `${item.name}|${sLat.toFixed(4)}|${sLng.toFixed(4)}`);
        if (seen.has(key)) continue;
        seen.add(key);
        elements.push({
            id: item.osm_id,
            lat: sLat,
            lon: sLng,
            tags: { name: item.name || 'Local Store', shop: item.type }
        });
    }
    return elements;
}

async function findShops(lat, lng, radius) {
    const batches = await Promise.all(
        ['supermarket', 'grocery'].map(term => nominatimShopSearch(lat, lng, radius, term).catch(err => {
            console.warn(`Shop search “${term}” failed: ${err.message}`);
            return [];
        }))
    );
    let items = batches.flat();
    let usedRadius = radius;
    if (toStoreElements(items, lat, lng, radius).length < 4 && radius < MAX_RADIUS) {
        usedRadius = Math.min(radius * 2, MAX_RADIUS);
        try {
            items = items.concat(await nominatimShopSearch(lat, lng, usedRadius, 'supermarket'));
        } catch (err) {
            usedRadius = radius;
            console.warn('Wider shop search failed:', err.message);
        }
    }
    const elements = toStoreElements(items, lat, lng, usedRadius);
    if (!elements.length) {
        const err = new Error('No shops found');
        err.code = 'EMPTY';
        throw err;
    }
    return { elements, sc_radius: usedRadius };
}

app.post('/api/stores', async (req, res) => {
    const { lat, lng } = req.body || {};

    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
        return res.status(400).json({ error: 'valid lat and lng are required' });
    }
    const radius = Math.min(Math.max(Number(req.body.radius) || 2500, 500), MAX_RADIUS);

    try {
        const data = await withCache(`stores:${lat.toFixed(3)},${lng.toFixed(3)},${radius}`, 30 * 60 * 1000, () => findShops(lat, lng, radius), false);
        return res.json(data);
    } catch (error) {
        console.warn('Store lookup failed:', error.message);
        return res.status(502).json({ error: 'Could not fetch stores' });
    }
});

// Helper to get local IP address for easy mobile testing
function getLocalIp() {
    try {
        const interfaces = os.networkInterfaces();
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name] || []) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
    } catch (e) {}
    return 'localhost';
}

// Unknown API routes get JSON (not an HTML error page) so the frontend can fall back cleanly.
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// Start the server
const server = app.listen(PORT, () => {
    const localIp = getLocalIp();
    console.log(`\n✅ ChefVoyage Backend is LIVE!`);
    console.log(`💻 On this computer:  http://localhost:${PORT}`);
    console.log(`📱 On phones/devices: http://${localIp}:${PORT}`);
    console.log(`👉 Keep this terminal window OPEN while using the app.\n`);
});

server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use. Close the other ChefVoyage window or run: PORT=3001 npm start\n`);
    } else {
        console.error('Server error:', err.message);
    }
    process.exit(1);
});