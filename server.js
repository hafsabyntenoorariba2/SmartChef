// server.js - The Bridge for SmartChef
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const http = require('http');
const https = require('https');

const app = express();
const PORT = 3000; // This is where your browser will talk to us

// Allow your frontend (localhost:5500) to connect
app.use(cors()); 
app.use(express.json());

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

const NOMINATIM_HEADERS = { 'User-Agent': 'SmartChef-Local/1.0' };

// --- API 1: Find Location Coordinates ---
app.get('/api/geocode', async (req, res) => {
    const query = (req.query.q || '').trim();
    if (!query) return res.status(400).json({ error: 'Missing city name' });

    try {
        const data = await withCache(`geo:${query.toLowerCase()}`, CACHE_TTL, () =>
            axios.get('https://nominatim.openstreetmap.org/search', {
                params: { format: 'jsonv2', q: query, limit: 1, 'accept-language': 'en' },
                headers: NOMINATIM_HEADERS,
                httpAgent, httpsAgent,
                timeout: 10000
            }).then(r => r.data)
        );
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
        const data = await withCache(`rev:${lat.toFixed(4)},${lon.toFixed(4)}`, CACHE_TTL, () =>
            axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: { format: 'jsonv2', lat, lon, zoom: 16, addressdetails: 1, 'accept-language': 'en' },
                headers: NOMINATIM_HEADERS,
                httpAgent, httpsAgent,
                timeout: 10000
            }).then(r => r.data)
        );
        res.json(data);
    } catch (error) {
        console.error("Reverse Geocode Error:", error.message);
        res.status(500).json({ error: "Could not read address" });
    }
});

// --- API 2: Find Real Stores Nearby ---
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const MAX_RADIUS = 6000;

function buildOverpassQuery(lat, lng, radius) {
    return `[out:json][timeout:15];nwr["shop"~"^(supermarket|grocery)$"](around:${radius},${lat},${lng});out center 30;`;
}

async function queryOverpass(lat, lng, radius) {
    const response = await axios.post(
        OVERPASS_URL,
        `data=${encodeURIComponent(buildOverpassQuery(lat, lng, radius))}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
                'User-Agent': 'SmartChef-Local/1.0'
            },
            httpAgent, httpsAgent,
            timeout: 16000
        }
    );
    return response.data;
}

app.post('/api/stores', async (req, res) => {
    const { lat, lng, radius = 2500 } = req.body || {};

    if (typeof lat !== 'number' || typeof lng !== 'number') {
        return res.status(400).json({ error: 'lat and lng are required' });
    }

    // Overpass answers 429/504 when requests arrive in a burst; it recovers after a short idle.
    const BACKOFF_MS = [3000, 9000];

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
                const wider = await fetchWithRetry(usedRadius);
                if ((wider.elements || []).length > (result.elements || []).length) result = wider;
                else usedRadius = radius;
            }

            return { ...result, sc_radius: usedRadius };
        });
        return res.json(data);
    } catch (error) {
        return res.status(502).json({ error: "Could not fetch stores" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n✅ SmartChef Backend is LIVE at http://localhost:${PORT}`);
    console.log(`👉 Keep this terminal window OPEN while using the app.\n`);
});