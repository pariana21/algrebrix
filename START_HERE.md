# 🚀 START HERE - Algebrix.ai Beta

## ⚡ Quick Start (5 Minutes)

### Step 1: Get Your API Key
👉 Go to: **https://makersuite.google.com/app/apikey**
- Sign in with Google
- Click "Create API Key"
- Copy your key

### Step 2: Add Your API Key
Open the file `.env` and replace this line:
```
GEMINI_API_KEY_FREE=your_gemini_api_key_here
```

With your actual key:
```
GEMINI_API_KEY_FREE=AIzaSyD...your_actual_key
```

### Step 3: Run the Application
```bash
npm install
npm run build
npm start
```

### Step 4: Test It!
1. Open browser: **http://localhost:3000**
2. Click "Start Chatting"
3. Type: **"What is 25 × 34?"**
4. Press Enter

🎉 **You should see step-by-step math solution!**

---

## 📚 Where to Go Next

| Want to... | Read this file |
|------------|----------------|
| Get running quickly | **QUICKSTART.md** |
| Deploy to Replit | **README.md** → "Replit Deployment" |
| Run a demo | **DEMO.md** |
| Understand the project | **PROJECT_SUMMARY.md** |
| Verify everything works | **SETUP_CHECKLIST.md** |
| See what was delivered | **DELIVERY_SUMMARY.md** |

---

## 🧪 Quick Tests

### Test Chat:
```
What is 5 + 3?
```
Expected: `8`

### Test Math Solver:
```
Solve: 3x + 5 = 20. Show step-by-step work.
```
Expected: Step-by-step solution ending with `x = 5`

### Test Agent:
```
best budget laptops 2025
```
Then click: **"Search & Summarize"** button
Expected: Results table + CSV download button (takes ~30 seconds)

---

## 🆘 Need Help?

**Problem:** "API key not set" error
**Solution:** Check `.env` file has your actual key

**Problem:** Playwright errors
**Solution:** Run `npx playwright install chromium` OR set `PLAYWRIGHT_ENABLED=false` in `.env`

**Problem:** Port 3000 in use
**Solution:** Change `PORT=3001` in `.env`

---

## 📖 Full Documentation

- **README.md** - Complete guide (200+ lines)
- **QUICKSTART.md** - 5-minute setup
- **DEMO.md** - Demo scripts and tests
- **PROJECT_SUMMARY.md** - Architecture overview
- **SETUP_CHECKLIST.md** - Verification steps
- **DELIVERY_SUMMARY.md** - What was delivered

---

## ✅ What You Have

✅ Complete full-stack application
✅ React + TypeScript frontend
✅ Express backend with AI
✅ Playwright web scraping
✅ Math solver with step-by-step
✅ CSV export functionality
✅ Security features (rate limiting)
✅ Comprehensive documentation

---

**Ready? Let's go! 🚀**

1. Get API key ➜ 2. Update .env ➜ 3. Run npm commands ➜ 4. Test

**Total time: ~5 minutes**
