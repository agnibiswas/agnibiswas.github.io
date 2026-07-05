# Agni Biswas — Portfolio Site

A story-driven, interactive portfolio positioning Agni for **senior / architect roles** in
autonomy, sensorics and embedded systems. Plain HTML/CSS/JS — no build step, no framework.

Three files:
- `index.html` — content and structure (each section is commented)
- `style.css` — dark "ember + signal" theme; all colors/fonts live under `:root` at the top
- `script.js` — all interactions (nav, scroll reveals, animated pipeline, architecture explorer, etc.)

## What's on the page
- **Hero** with an animated Sense → Model → Decide → Act autonomy pipeline and a rotating title.
- **The arc** — the career narrative ("if you connect the dots it's one idea"), the story-behind layer.
- **Experience** — interactive timeline; early roles tucked into an expandable panel.
- **How I build** — an interactive 4-layer architecture explorer (hover/click a layer).
- **Work, Skills, Education, Contact** — with copy-email.
- Accessible: respects `prefers-reduced-motion`, keyboard-focusable cards, semantic markup.

## View it locally
Double-click `index.html` — it opens in your browser. No server needed.

## Edit content
Open `index.html` in any text editor. Section comments (`<!-- ==== SECTION ==== -->`) mark each block.
To retune the look, edit the variables under `:root` at the top of `style.css` (accent = `--ember`).

## Deploy for free — Netlify Drop (fastest)
1. Go to https://app.netlify.com/drop
2. Drag the whole project folder (all three files) onto the page.
3. You get a live URL instantly. Create a free account to keep it and set a custom subdomain.

## Deploy for free — GitHub Pages
1. Create a new **public** repo at github.com (e.g. `portfolio`).
2. Click **uploading an existing file**, drag in the three files, **Commit**.
3. **Settings → Pages** → Source: **Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. Wait ~1 min, refresh — your live URL appears (e.g. `https://<username>.github.io/portfolio/`).

## Custom domain (optional)
Both hosts support pointing a domain you own (e.g. `agnibiswas.com`) at the site for free — buy the
domain from a registrar and add a couple of DNS records. Ask and I'll walk you through it.
