// server.js - The Bridge for ChefVoyage
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const https = require('https');
const os = require('os');
const path = require('path');

const app = express();
const PORT = 3000;

// Allow cross-origin requests from frontend tools or other LAN devices
app.use(cors()); 
app.use(express.json());

// Serve static frontend files directly so any device opening http://<ip>:3000 works out of the box
app.use(express.static(__dirname));

// Reuse TLS connections and memoize upstream answers so repeat lookups return instantly.
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const CACHE_TTL = 10 * 60 * 1000;
const cache = new Map();

function withCache(key, ttl, fn) {
    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) return hit.promise;
    const promise = fn().then(
        value => { cache.set(key, { promise: Promise.resolve(value), expires: Date.now() + ttl }); return value; },
        err => { cache.delete(key); throw err; }
    );
    cache.set(key, { promise, expires: Date.now() + ttl });
    return promise;
}

const NOMINATIM_HEADERS = { 'User-Agent': 'ChefVoyage-Local/1.0' };

// --- API 0: IP-Based Geolocation (Universal fallback for any device & plain-HTTP) ---
app.get('/api/ip-location', async (req, res) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientIp = String(rawIp).split(',')[0].trim().replace(/^::ffff:/, '');

    const isPrivate = !clientIp ||
        clientIp === '127.0.0.1' ||
        clientIp === '::1' ||
        clientIp.startsWith('192.168.') ||
        clientIp.startsWith('10.') ||
        clientIp.startsWith('172.16.') ||
        clientIp.startsWith('172.17.') ||
        clientIp.startsWith('172.18.') ||
        clientIp.startsWith('172.19.') ||
        clientIp.startsWith('172.2') ||
        clientIp.startsWith('172.3');

    // If client has a public IP, query it; if private (LAN/localhost), geolocate server's public IP
    const queryIp = isPrivate ? '' : clientIp;

    try {
        const data = await withCache(`ip:${queryIp || 'self'}`, CACHE_TTL, async () => {
            // Provider 1: ipwho.is
            try {
                const targetUrl = queryIp ? `https://ipwho.is/${encodeURIComponent(queryIp)}` : 'https://ipwho.is/';
                const r = await axios.get(targetUrl, { httpAgent, httpsAgent, timeout: 6000 });
                if (r.data && r.data.success !== false && Number.isFinite(r.data.latitude) && Number.isFinite(r.data.longitude)) {
                    return {
                        lat: r.data.latitude,
                        lng: r.data.longitude,
                        city: r.data.city || '',
                        region: r.data.region || '',
                        country: r.data.country || '',
                        source: 'ip'
                    };
                }
            } catch (e1) {
                console.warn('Backend ipwho.is failed, trying freeipapi:', e1.message);
            }

            // Provider 2: freeipapi.com
            try {
                const targetUrl = queryIp ? `https://freeipapi.com/api/json/${encodeURIComponent(queryIp)}` : 'https://freeipapi.com/api/json';
                const r = await axios.get(targetUrl, { httpAgent, httpsAgent, timeout: 6000 });
                if (r.data && Number.isFinite(r.data.latitude) && Number.isFinite(r.data.longitude)) {
                    return {
                        lat: r.data.latitude,
                        lng: r.data.longitude,
                        city: r.data.cityName || '',
                        region: r.data.regionName || '',
                        country: r.data.countryName || '',
                        source: 'ip'
                    };
                }
            } catch (e2) {
                console.warn('Backend freeipapi failed, trying ipapi.co:', e2.message);
            }

            // Provider 3: ipapi.co
            const targetUrl = queryIp ? `https://ipapi.co/${encodeURIComponent(queryIp)}/json/` : 'https://ipapi.co/json/';
            const r = await axios.get(targetUrl, {
                headers: NOMINATIM_HEADERS,
                httpAgent, httpsAgent,
                timeout: 6000
            });
            const lat = parseFloat(r.data?.latitude);
            const lng = parseFloat(r.data?.longitude);
            if (Number.isFinite(lat) && Number.isFinite(lng)) {
                return {
                    lat,
                    lng,
                    city: r.data.city || '',
                    region: r.data.region || '',
                    country: r.data.country_name || '',
                    source: 'ip'
                };
            }

            throw new Error('All IP services failed');
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
            // Attempt 1: Nominatim
            try {
                const r = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: { format: 'jsonv2', q: query, limit: 1, 'accept-language': 'en' },
                    headers: NOMINATIM_HEADERS,
                    httpAgent, httpsAgent,
                    timeout: 8000
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
                    params: { q: query, limit: 1 },
                    httpAgent, httpsAgent,
                    timeout: 8000
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
        });

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
                    timeout: 8000
                });
                if (r.data) return r.data;
            } catch (e) {
                console.warn('Backend Nominatim reverse failed, trying Photon:', e.message);
            }

            // Attempt 2: Photon reverse
            try {
                const pRes = await axios.get('https://photon.komoot.io/reverse', {
                    params: { lat, lon },
                    httpAgent, httpsAgent,
                    timeout: 8000
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
const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MAX_RADIUS = 8000;

function buildOverpassQuery(lat, lng, radius) {
    return `[out:json][timeout:15];nwr["shop"~"^(supermarket|grocery|convenience|greengrocer|general|department_store|food)$"](around:${radius},${lat},${lng});out center 40;`;
}

async function queryOverpass(lat, lng, radius) {
    const postData = `data=${encodeURIComponent(buildOverpassQuery(lat, lng, radius))}`;
    let lastError = null;

    for (const endpoint of OVERPASS_ENDPOINTS) {
        try {
            const response = await axios.post(
                endpoint,
                postData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': '*/*',
                        'User-Agent': 'ChefVoyage-Local/1.0'
                    },
                    httpAgent, httpsAgent,
                    timeout: 14000
                }
            );
            if (response.data && Array.isArray(response.data.elements)) {
                return response.data;
            }
        } catch (err) {
            lastError = err;
            console.warn(`Overpass endpoint ${endpoint} failed: ${err.message}`);
        }
    }
    throw lastError || new Error('All Overpass endpoints failed');
}

app.post('/api/stores', async (req, res) => {
    const { lat, lng, radius = 2500 } = req.body || {};

    if (typeof lat !== 'number' || typeof lng !== 'number') {
        return res.status(400).json({ error: 'lat and lng are required' });
    }

    const BACKOFF_MS = [2000, 5000];

    const fetchWithRetry = async (r) => {
        for (let attempt = 0; ; attempt++) {
            try {
                return await queryOverpass(lat, lng, r);
            } catch (error) {
                const status = error.response?.status;
                const retryable = status === 429 || status === 504 || status === 503;
                console.warn(`Store fetch attempt ${attempt + 1} failed: ${error.message}`);
                if (!retryable || attempt >= BACKOFF_MS.length) throw error;
                await sleep(BACKOFF_MS[attempt]);
            }
        }
    };

    try {
        const data = await withCache(`stores:${lat.toFixed(3)},${lng.toFixed(3)},${radius}`, CACHE_TTL, async () => {
            let result = await fetchWithRetry(radius);
            let usedRadius = radius;

            // Sparse area: widen once so the "nearest stores" list is actually useful.
            if ((result.elements || []).length < 4 && radius < MAX_RADIUS) {
                usedRadius = Math.min(radius * 2, MAX_RADIUS);
                try {
                    const wider = await fetchWithRetry(usedRadius);
                    if ((wider.elements || []).length > (result.elements || []).length) result = wider;
                    else usedRadius = radius;
                } catch (wErr) {
                    usedRadius = radius;
                }
            }

            return { ...result, sc_radius: usedRadius };
        });
        return res.json(data);
    } catch (error) {
        return res.status(502).json({ error: "Could not fetch stores" });
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

// Start the server
app.listen(PORT, () => {
    const localIp = getLocalIp();
    console.log(`\n✅ ChefVoyage Backend is LIVE!`);
    console.log(`💻 On this computer:  http://localhost:${PORT}`);
    console.log(`📱 On phones/devices: http://${localIp}:${PORT}`);
    console.log(`👉 Keep this terminal window OPEN while using the app.\n`);
});