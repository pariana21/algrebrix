# Algebrix.ai Beta - Quick Start Guide

Get up and running in 5 minutes! ⚡

## 🚀 Fastest Path to Running

### 1. Get Your API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### 2. Configure (1 minute)

```bash
cp .env.example .env
```

Edit `.env` and paste your API key:

```env
GEMINI_API_KEY_FREE=YOUR_KEY_HERE
```

### 3. Install & Run (2 minutes)

```bash
npm install
npm run build
npm start
```

Open your browser to: **http://localhost:3000**

## ✅ That's It!

You should see:
- Landing page at `/`
- Chat interface at `/chat`

## 🧪 Quick Test

1. Go to `/chat`
2. Type: **"What is 25 × 34?"**
3. Press Enter
4. See step-by-step solution!

## 🔍 Test the Agent

1. In chat, type: **"best budget laptops 2025"**
2. Click the green **"Search & Summarize"** button
3. Wait 20-30 seconds
4. See results table and download CSV!

## 🚨 Troubleshooting

**"API key not set" error?**
→ Check your `.env` file exists and has `GEMINI_API_KEY_FREE=...`

**Playwright errors?**
→ Run: `npx playwright install chromium`
→ Or set `PLAYWRIGHT_ENABLED=false` in `.env`

**Port 3000 in use?**
→ Change `PORT=3001` in `.env`

## 📖 Full Documentation

See `README.md` for complete instructions including:
- Replit deployment
- API documentation
- Architecture details
- Security features

---

**Need help?** Check `DEMO.md` for sample queries and expected behavior.
