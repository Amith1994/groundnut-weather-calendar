# Groundnut Weather Calendar

Static advisory generator for groundnut crop weather planning in Chitradurga district.

## Features

- Editable 5-day weather forecast
- Side-by-side `OLD ADVISORY` vs `NEW ADVISORY`
- Domains for agrometeorology, agronomy, pest & disease, and important practices
- Rule-based pest scenario cards
- GitHub Pages-friendly static deployment

## Files

- `index.html` - app layout
- `style.css` - visual design
- `app.js` - advisory engine and rendering logic

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Push these files to the default branch.
3. In GitHub, open `Settings -> Pages`.
4. Set source to `Deploy from a branch`.
5. Select the default branch and `/ (root)`.
6. Save and wait for the Pages URL to be published.

## Advisory Logic

The current MVP is deterministic and browser-side:

- Heat + low rain -> irrigation and mulch focus
- Repeated rain -> drainage focus
- Humidity + cloud -> foliar disease watch
- Wind + rain -> avoid spray operations

This keeps the logic testable and lets you add Gemini or GPT later as an optional formatting layer.
