# ChefVoyage

Pick dishes from 43 countries, scale them to your guest count, get **one merged shopping list**, and find real supermarkets near you.

## Run it

```bash
npm install
npm start          # http://localhost:3000  (use PORT=3001 npm start to change the port)
```

Open the printed `http://<your-ip>:3000` address on a phone on the same Wi-Fi to try it there.
The backend is optional: if it's offline the app talks to OpenStreetMap services directly.

## Project layout

| File | Purpose |
| --- | --- |
| `index.html` | Markup for all six steps + completion screen |
| `style.css` | Design system (light + dark tokens, animations, responsive, print) |
| `script.js` | App logic (navigation, list merging, location + stores, effects) |
| `cuisines.js` | Recipe data (`worldCuisines`) |
| `server.js` | Express proxy/cache for geocoding, IP lookup and Overpass store search |

## Features

- Merges ingredients across dishes (g/kg and ml/L are normalised first, so totals are correct)
- Light / dark theme, follows the OS until you choose
- Animated step transitions, tilt + spotlight cards, count-up stats, confetti, skeleton loaders
- Keyboard: `Ctrl/⌘ + K` quick search for any country or dish, `/` focuses search, `Esc` goes back
- Region-grouped country cards, veg-friendly / spicy filters, "Add all shown", dish preview with scaled ingredients
- 🎲 Surprise me, resume banner, undo for removals and clears
- Shopping list: stat tiles, filter, hide ticked, pantry staples, custom items
- Share / copy / WhatsApp / download (.txt) / print the shopping list
- Store results filtered by type, with walking / driving time estimates
- Respects `prefers-reduced-motion`
