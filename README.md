# 🌍 Real World Math

A fun, game-like math education app for middle school students. Students earn XP, climb rank tiers, and solve real-world math problems — without it ever feeling like a test!

---

## 🚀 Getting Started in VS Code

### 1. Install dependencies
Open the project folder in VS Code, then open the **Terminal** (`Ctrl + `` ` ``) and run:

```bash
npm install
```

### 2. Start the app
```bash
npm start
```

This opens the app at **http://localhost:3000** in your browser.

---

## 🌐 Deploy to GitHub Pages

This project auto-deploys to GitHub Pages using GitHub Actions on every push to `master`.

1. Make sure the repo name matches the `homepage` in `package.json`.
	- Current value: `/ReWoMa`
	- If your repo name is different, update that value.
2. In GitHub: **Settings → Pages**
	- **Source**: `GitHub Actions`
3. Push to `master` (or run the workflow manually from Actions tab).

Optional manual fallback:

```bash
npm run deploy
```

After saving, wait ~1–3 minutes and open:

`https://<your-username>.github.io/ReWoMa/`

---

## 🎮 Features

- **Auto-generated kid-safe names** — Students get fun names like `TurboNarwhal47` automatically. No typing needed, no inappropriate names possible. They can reroll with the 🎲 button.
- **36 questions** across 3 difficulty levels (12 per level), randomly shuffled every session
- **XP & Rank system** — 6 tiers from Math Rookie to Galaxy Brain
- **Combo multiplier** — Answer 3+ in a row for +50% XP
- **Leaderboard** — Persistent across sessions using localStorage
- **Confetti** on high scores
- **Encouraging messages** — wrong answers are never shaming
- **Step-by-step solutions** after every question
- **"Why This Matters"** — every question explains the real-world connection

---

## 👩‍🏫 Teacher Portal

Click **Teacher** on the home screen. Default password: `mathteacher2024`

From the portal you can:
- **Add custom questions** to any difficulty level
- **Delete questions** you don't want
- **Reset** the question bank to defaults

Custom questions are saved in the browser's localStorage, so they persist between sessions on the same machine.

---

## 📁 Project Structure

```
realworld-math/
├── public/
│   └── index.html          # HTML shell with Google Fonts
├── src/
│   ├── index.js            # React entry point
│   └── App.jsx             # Entire game (questions, logic, UI)
├── package.json
└── README.md
```

---

## 🏫 Classroom Tips

- Each student plays on their own device/browser — scores are stored locally per browser
- The auto-generated names prevent inappropriate names on the leaderboard
- Teachers can add curriculum-aligned questions via the Teacher Portal
- The "Why This Matters" section after each answer helps students connect math to real life

---

## 🛠 Built With

- [React 18](https://react.dev/)
- Vanilla CSS-in-JS (no external UI library needed)
- Google Fonts: Nunito + Fredoka One
