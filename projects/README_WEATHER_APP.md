# Weather App Project

Files
- `as.html` — UI and entry point.
- `as.css` — styling.
- `as.js` — logic using Open-Meteo geocoding + forecast APIs.

How to run
- Open `as.html` in a browser or serve the project and visit `/as.html`.
- No API key required (uses free Open-Meteo endpoints). Be mindful of request limits.

Notes
- The app does a geocoding lookup then requests current weather.
- Default city on load is `Mumbai` (change in `as.js` last line).

Troubleshooting
- If weather doesn't appear, check console for network errors. Some browsers block mixed-content if serving via `file://` and the API is `https://`; run a local server to avoid issues.
