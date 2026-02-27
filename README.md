# 🌍 Real World Math

A fun, game-like math education app for middle school students. Students earn XP, climb rank tiers, and solve real-world math problems — without it ever feeling like a test!

---

## 🌐 Deploying to GitHub Pages (one-time setup)

The app is hosted at **https://dishchiibikoh-community-school.github.io/ReWoMa** via GitHub Actions.

After merging to `main` for the first time, you must enable the GitHub Actions deployment source **once** in the repository settings:

1. Go to your repository on GitHub.com
2. Click **Settings** (top navigation tab)
3. In the left sidebar, click **Pages** (under *Code and automation*)
4. Under **Build and deployment → Source**, open the dropdown and select **GitHub Actions**
5. Click **Save**

That's it! Every future push to `main` will automatically build and deploy the app. You can watch the progress under the **Actions** tab.

> **Already done?** If the source is already set to *GitHub Actions*, you don't need to change anything.

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
