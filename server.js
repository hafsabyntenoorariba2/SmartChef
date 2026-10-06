// server.js - The Bridge for SmartChef
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000; // This is where your browser will talk to us

// Allow your frontend (localhost:5500) to connect
app.use(cors()); 
app.use(express.json());

// --- API 1: Find Location Coordinates ---
app.get('/api/geocode', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Missing city name' });

    try {
        // We ask Nominatim directly from the server (No CORS issues!)
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: { format: 'json', q: query, limit: 1 },
            headers: { 'User-Agent': 'SmartChef-Local/1.0' }
        });
        
        // Send the clean JSON back to your browser
        res.json(response.data);
    } catch (error) {
        console.error("Geocode Error:", error.message);
        res.status(500).json({ error: "Could not find location" });
    }
});

// --- API 2: Find Real Stores Nearby ---
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const sleep = ms => new Promise(r => setTimeout(r, ms));

app.post('/api/stores', async (req, res) => {
    const { lat, lng, radius = 2500 } = req.body || {};

    if (typeof lat !== 'number' || typeof lng !== 'number') {
        return res.status(400).json({ error: 'lat and lng are required' });
    }

    // Build the Overpass Query safely on the server side
    const overpassQuery = `[out:json][timeout:25];(node["shop"="supermarket"](around:${radius},${lat},${lng});way["shop"="supermarket"](around:${radius},${lat},${lng});node["shop"="grocery"](around:${radius},${lat},${lng});way["shop"="grocery"](around:${radius},${lat},${lng}););out center 20;`;

    // Overpass answers 429/504 when requests arrive in a burst; it recovers after ~20s idle.
    const BACKOFF_MS = [6000, 18000];

    for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
        try {
            const response = await axios.post(
                OVERPASS_URL,
                `data=${encodeURIComponent(overpassQuery)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': '*/*',
                        'User-Agent': 'SmartChef-Local/1.0'
                    },
                    timeout: 20000
                }
            );

            return res.json(response.data);
        } catch (error) {
            const status = error.response?.status;
            const retryable = status === 429 || status === 504 || status === 503;
            console.warn(`Store fetch attempt ${attempt + 1} failed: ${error.message}`);

            if (!retryable || attempt === BACKOFF_MS.length) {
                return res.status(502).json({ error: "Could not fetch stores" });
            }
            await sleep(BACKOFF_MS[attempt]);
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n✅ SmartChef Backend is LIVE at http://localhost:${PORT}`);
    console.log(`👉 Keep this terminal window OPEN while using the app.\n`);
});