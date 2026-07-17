# Calculator Project

Files
- `calculator.html` — standalone calculator page.
- Uses `style.css` for global styling; inline calculator-specific styles exist inside `calculator.html`.

How to run
- Open `calculator.html` in a browser (or serve the folder and visit `/calculator.html`).

Behavior
- Click digits/operators to build an expression, `=` evaluates, `Clear` resets.
- Uses vanilla JS; no external dependencies.

Tips to adjust visibility issues
- The calculator container is centered and uses `max-width: 360px` inlined styles. If display appears small on desktop, increase `.calc-container` `max-width` and the `.calc-display` `font-size`.
- If global `style.css` overrides text colors, ensure the `.calc-display` and `.calc-btn` color properties are explicit (they already are).

Common fixes
- If the page looks invisible on a dark background, ensure `style.css` is being loaded (fixed to `style.css`).
