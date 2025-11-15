# Algebrix.ai Beta - Setup Checklist ✅

Use this checklist to ensure everything is configured correctly before running the project.

## 📋 Pre-Flight Checklist

### 1. System Requirements
- [ ] Node.js 18 or higher installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (optional, for cloning)

### 2. Project Files
- [ ] All project files downloaded/cloned
- [ ] `package.json` exists
- [ ] `.env.example` exists
- [ ] `server/` directory exists with all subdirectories
- [ ] `src/` directory exists with all components

### 3. API Key Configuration
- [ ] Visited [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Created a free Gemini API key
- [ ] Copied `.env.example` to `.env`
- [ ] Pasted API key into `.env` file
- [ ] Verified `GEMINI_API_KEY_FREE=your_actual_key` is set

### 4. Dependencies
- [ ] Ran `npm install` successfully
- [ ] No critical errors in installation output
- [ ] `node_modules/` directory created
- [ ] Playwright installed (automatic via postinstall)

### 5. Build Process
- [ ] Ran `npm run build` successfully
- [ ] `dist/` directory created
- [ ] No TypeScript errors
- [ ] Build output shows ~195KB bundle

### 6. File Permissions (if needed)
- [ ] `public/outputs/` directory exists
- [ ] Write permissions on `public/outputs/`
- [ ] `server/` files are readable

## 🚀 Launch Checklist

### Starting the Server
- [ ] Port 3000 is available (or change `PORT` in `.env`)
- [ ] Ran `npm start` or `npm run dev`
- [ ] Server starts without errors
- [ ] Console shows: "🚀 Algebrix.ai Beta server running on port 3000"

### Accessing the Application
- [ ] Opened browser to `http://localhost:3000`
- [ ] Landing page loads successfully
- [ ] Logo/icon appears in header
- [ ] Navigation links work (Home, Chat)
- [ ] Clicked "Start Chatting" → navigated to `/chat`

### Testing Chat
- [ ] Chat page loads
- [ ] Safety modal appears on first visit
- [ ] Dismissed safety modal
- [ ] Input box is visible and active
- [ ] "Search & Summarize" button is visible
- [ ] Sent test message: "What is 5 + 3?"
- [ ] Received response within 5 seconds
- [ ] Response is relevant and correct

### Testing Agent
- [ ] Entered topic: "best budget laptops 2025"
- [ ] Clicked "Search & Summarize" button
- [ ] Progress indicators appeared:
  - [ ] "Searching..."
  - [ ] "Extracting pages..."
  - [ ] "Generating CSV..."
- [ ] Results table appeared with 5 rows
- [ ] "Download CSV" button appeared
- [ ] Clicked download button
- [ ] CSV file downloaded successfully
- [ ] Opened CSV in Excel/Sheets
- [ ] CSV has 3 columns: URL, Title, Excerpt
- [ ] CSV has 5 data rows (plus header)

## 🔧 Troubleshooting Checklist

### If Chat Doesn't Work
- [ ] Checked browser console for errors
- [ ] Verified `GEMINI_API_KEY_FREE` is set in `.env`
- [ ] Restarted server after changing `.env`
- [ ] Checked server console for error messages
- [ ] Verified internet connection (API calls require network)

### If Agent Doesn't Work
- [ ] Waited full 30-40 seconds for completion
- [ ] Checked if rate limit was hit (max 2 concurrent)
- [ ] Verified Playwright is installed: `npx playwright --version`
- [ ] If Playwright errors, set `PLAYWRIGHT_ENABLED=false` in `.env`
- [ ] Restarted server after env changes

### If CSV Download Fails
- [ ] Checked `public/outputs/` directory exists
- [ ] Verified write permissions on `public/outputs/`
- [ ] Checked server console for file system errors
- [ ] Tried agent search again (generates new CSV)

### If Build Fails
- [ ] Deleted `node_modules/` and `package-lock.json`
- [ ] Ran `npm install` again
- [ ] Checked for TypeScript errors in terminal
- [ ] Verified all `.tsx` files have correct imports

### If Port is In Use
- [ ] Changed `PORT=3001` in `.env`
- [ ] Or killed process on port 3000:
  ```bash
  # Linux/Mac
  lsof -ti:3000 | xargs kill -9

  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

## 📱 Replit-Specific Checklist

### Replit Setup
- [ ] Created Replit account
- [ ] Imported project from GitHub or uploaded files
- [ ] Set Node.js as project type
- [ ] Opened Secrets (🔒 icon)
- [ ] Added `GEMINI_API_KEY_FREE` secret
- [ ] Value is actual Gemini API key (not placeholder)

### Playwright on Replit
- [ ] Tried: `npx playwright install chromium --with-deps`
- [ ] If fails: Added secret `PLAYWRIGHT_ENABLED=false`
- [ ] Restarted Replit after adding secrets

### Replit Run Configuration
- [ ] `.replit` file exists in project root
- [ ] Run command is set to `npm start`
- [ ] Or manually set in Replit UI
- [ ] Clicked green "Run" button
- [ ] Waited for build to complete
- [ ] Opened Replit webview URL

## ✨ Success Indicators

You'll know everything is working when:

1. ✅ Landing page displays with logo and features
2. ✅ Chat responds to "What is 5 + 3?" with "8"
3. ✅ Math query "Solve: 3x + 5 = 20" shows step-by-step solution
4. ✅ Agent search returns 5 results in a table
5. ✅ CSV downloads and opens with data
6. ✅ No errors in browser console
7. ✅ No errors in server console
8. ✅ All navigation links work

## 📞 Getting Help

If you've checked everything and still have issues:

1. **Check the README**: `README.md` has detailed troubleshooting
2. **Check DEMO.md**: Verify you're testing with correct queries
3. **Check Console Logs**:
   - Browser console (F12)
   - Server console (terminal)
4. **Verify Environment**:
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ```
5. **Check API Key**: Test it at [Google AI Studio](https://makersuite.google.com/app/apikey)

## �� Learning Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Playwright Documentation](https://playwright.dev)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 📊 Final Verification

Run this command to verify all key files exist:

```bash
ls -R server/ src/ | grep -E "\.(js|tsx|ts)$" | wc -l
```

Expected: ~20+ files

Check server structure:
```bash
tree server/
```

Expected output:
```
server/
├── index.js
├── middleware/
│   └── rateLimit.js
├── routes/
│   ├── agent.js
│   ├── chat.js
│   └── download.js
└── services/
    ├── csv.js
    ├── gemini.js
    └── playwright.js
```

---

**Once all checkboxes are checked, you're ready to use Algebrix.ai Beta! 🚀**

Questions? See `README.md`, `QUICKSTART.md`, or `DEMO.md`.
