# Ignore The Bait — Security Awareness Training (Web Edition)

A free, browser-based trainer for recognizing phishing emails and
social-engineering phone calls. Runs entirely client-side — no server,
no build step, no account needed. Built to be hosted for free on
**GitHub Pages**.

This is the web port of a Python desktop app; same content and logic,
rebuilt in plain HTML/CSS/JavaScript so anyone can try it with just a
link.

## Try it locally first

Since this uses plain `<script src="...">` tags (no bundler), most
browsers will run it fine straight from disk — just open `index.html`.
If your browser blocks anything when opened via `file://`, run a tiny
local server instead:

```bash
cd phishing_web
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing it on GitHub Pages

1. **Create a repo** on GitHub (public repos get free Pages hosting).
2. **Push this folder's contents to the repo root** (or to a `/docs`
   folder — either works, you'll pick which in step 4):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ignore The Bait web edition"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to your repo on GitHub → **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick the **`main`** branch, and the **`/ (root)`** folder
   (or `/docs` if you put it there). Save.
5. GitHub will give you a URL like:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   It usually takes 1-2 minutes to go live after the first push.
6. Share that link — anyone can open it and start training immediately.

No further configuration is needed. There's no backend, database, or
API key involved.

## What's different from the desktop version

- **Storage**: progress lives in the browser's `localStorage` instead
  of a SQLite file. This means:
  - Progress is **per-browser, per-device** — it won't sync between
    your phone and laptop, or between two students' computers.
  - Clearing browser data / site data for this page wipes progress.
  - A "classroom leaderboard" only works meaningfully if everyone uses
    the *same* browser/device (e.g., one shared classroom computer), or
    you treat each device's leaderboard as its own local record and
    combine CSV exports manually.
- **CSV export** downloads a file via the browser's normal download
  flow instead of a save-file dialog.
- Everything else — lessons, the Spot-the-Phish quiz with difficulty
  filtering, and the social-engineering call simulator — works exactly
  the same as the desktop version.

If you want a *real* shared classroom leaderboard synced across every
student's device, that requires a small backend or a service like
Firebase/Supabase or a Google Sheet + Apps Script endpoint. That's a
separate project on top of this one — ask if you want help building it.

## Project structure

```
phishing_web/
├── index.html              # page shell, loads all scripts in order
├── css/
│   └── styles.css          # design system (case-file/dossier theme)
└── js/
    ├── data/
    │   ├── lessons.js        # lesson content
    │   ├── quizBank.js       # simulated email bank (difficulty-tagged)
    │   ├── stats.js           # sourced "Why This Matters" statistics
    │   └── vishingScenarios.js # branching call scenario trees
    ├── utils.js             # small shared helpers (escaping, shuffling)
    ├── storage.js           # localStorage-backed persistence layer
    ├── screens/
    │   ├── login.js
    │   ├── dashboard.js
    │   ├── lessons.js
    │   ├── quiz.js
    │   ├── vishing.js
    │   └── progress.js
    ├── app.js               # sidebar nav + screen router
    └── main.js               # boots the app on page load
```

## Extending it

Same as the desktop version — edit the data files and the content
updates automatically, no code changes needed:

- **More quiz emails**: add objects to `js/data/quizBank.js` (it's a
  JS array assigned to `window.APP_DATA.quizBank` — same shape as
  before: `id`, `difficulty`, `from_name`, `from_email`, `subject`,
  `body`, optional `link_display`/`link_actual`, `is_phishing`,
  `red_flags`, `explanation`).
- **More lessons**: add to `js/data/lessons.js`.
- **Refresh the stats**: edit `js/data/stats.js`.
- **More call scenarios**: add to `js/data/vishingScenarios.js`
  (`id`, `title`, `difficulty`, `caller_name`, `intro`, `start_node`,
  and a `nodes` tree — same branching structure as the desktop
  version's JSON).

## Responsible use

This tool is for education only — every email and call scenario is
fictional. It doesn't send real messages, doesn't collect real
credentials, and shouldn't be adapted to target real people without
informed consent.
