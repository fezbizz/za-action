# SA Action — Movements & Leaders Tracking

## Movements to Follow

| Movement | Focus | Platforms |
|---|---|---|
| **March and March** | Anti-illegal immigration marches, protests | Facebook, YouTube, TikTok |
| **LACO** (Limpele Action Committee?) | Community action, immigration enforcement | Facebook, YouTube |
| **SACR** (South African Citizens Radicals?) | Civic action, border control advocacy | Facebook, YouTube |
| **Vezi Production** | Media coverage of ground-level movements | YouTube, Facebook, TikTok |

## Key Leaders / Figures

| Name | Role | Platforms |
|---|---|---|
| **Jacinta Zinhle Mangobese Zuma** | Movement leader, activist | Facebook, YouTube, TikTok |
| *(add more as discovered)* | | |

## Content Strategy

1. **Monitor daily** — check Facebook pages, YouTube channels, TikTok accounts of these movements
2. **Extract events** — dates, times, locations, meeting points
3. **Verify** — cross-check across multiple sources before publishing
4. **Publish** — add to the `events` array in `script.js` and push to GitHub
5. **Amplify** — share the SA Action page link in movement Facebook groups and WhatsApp groups

## How to Add an Event (for you to do when you find one)

1. Open `/data/data/com.hermesagent.android/files/home/za-action/script.js`
2. Find the `events` array near the top
3. Add a new entry like:
   ```js
   { date: "17 Jul", day: "Thu", title: "National Shutdown March", desc: "Nationwide protests against illegal immigration.", location: "Multiple locations", org: "March and March" },
   ```
4. Save, commit, push to both `main` and `gh-pages`
5. The site updates automatically within 1-2 minutes

## Future Vision

- Automated scraping of movement social media pages
- WhatsApp broadcast channel for instant alerts
- Mobile app (PWA or native) with push notifications
- Crowdsourced event reporting from users on the ground
