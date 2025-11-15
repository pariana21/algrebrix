# Algebrix.ai Beta 🤖

**Autonomous. Intelligent. Everywhere.**

Your personal AI research and math assistant built with React, Express, Playwright, and Google Gemini AI.

![Algebrix.ai Beta](public/Untitled%20design.png)

## 🌟 Features

- **Advanced Math Solver**: Get step-by-step solutions to complex mathematical problems
- **Web Research Agent**: Automatically search, extract, and synthesize information from multiple sources
- **CSV Reports**: Download structured data from research results
- **Privacy & Security**: Never requests credentials or performs sensitive actions
- **Rate Limiting**: Built-in protection against abuse

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + React Router
- **Backend**: Express.js + Node.js
- **AI**: Google Gemini Pro API
- **Web Scraping**: Playwright (Chromium)
- **Data Export**: CSV-Writer

## 📋 Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key (free tier available)
- Playwright Chromium browser (installed via postinstall script)

## 🚀 Local Development

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd algebrix-beta
npm install
```

The `postinstall` script will automatically run `playwright install chromium`.

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY_FREE=your_actual_gemini_api_key
PORT=3000
NODE_ENV=development
PLAYWRIGHT_ENABLED=true
```

**Get a free Gemini API key**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### 3. Build the Frontend

```bash
npm run build
```

### 4. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Replit Deployment

### Step 1: Create a Replit Project

1. Go to [Replit](https://replit.com) and sign in
2. Click "Create Repl"
3. Choose "Import from GitHub" and paste your repository URL
4. Or create a new "Node.js" Repl and upload your code

### Step 2: Configure Environment Variables

1. In your Repl, open the **Secrets** tool (🔒 icon in left sidebar)
2. Add the following secret:
   - Key: `GEMINI_API_KEY_FREE`
   - Value: Your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step 3: Install Playwright

Replit may have restrictions on Playwright. You have two options:

#### Option A: Try Full Playwright Installation

In the Replit Shell, run:

```bash
npm install
npx playwright install chromium --with-deps
```

If you encounter permission errors, proceed to Option B.

#### Option B: Use HTTP Fallback Mode

If Playwright cannot run in Replit's environment:

1. Add this secret in Replit:
   - Key: `PLAYWRIGHT_ENABLED`
   - Value: `false`

2. The app will use HTTP fetch for page extraction (less reliable but works everywhere)

### Step 4: Configure Run Command

In your `.replit` file (create if it doesn't exist):

```toml
run = "npm start"
```

Or set the run command in the Replit UI to:

```bash
npm start
```

### Step 5: Run the Project

1. Click the green "Run" button
2. Wait for the build to complete
3. Your app will be available at the Replit-provided URL (e.g., `https://your-project.your-username.repl.co`)

### Troubleshooting Replit Deployment

**Issue: Playwright fails to install**
- Solution: Set `PLAYWRIGHT_ENABLED=false` in Secrets to use HTTP fallback

**Issue: Port binding errors**
- Solution: Replit automatically sets the PORT. The app uses `process.env.PORT || 3000`

**Issue: Build errors**
- Solution: Run `npm run build` manually in the Shell before starting

**Issue: Module not found**
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 📡 API Endpoints

### POST `/api/chat`

Chat with Algebrix for general queries and math problems.

**Request:**
```json
{
  "message": "Solve: 3x + 5 = 20",
  "history": []
}
```

**Response:**
```json
{
  "success": true,
  "response": "Step 1: Subtract 5 from both sides...",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### POST `/api/agent`

Run the research agent to search and extract web content.

**Request:**
```json
{
  "topic": "best budget laptops 2025"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Based on current market trends...",
  "results": [
    {
      "url": "https://example.com",
      "title": "Top 10 Budget Laptops",
      "excerpt": "This comprehensive guide covers..."
    }
  ],
  "csvUrl": "/api/download?file=1234567890-results.csv",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### GET `/api/download?file=<filename>`

Download generated CSV files.

**Rate Limiting:** Max 2 concurrent agent tasks per IP address.

## 🧪 Testing & Demo

### Manual Testing

1. **Chat Test:**
   - Go to `/chat`
   - Enter: "What is 25 × 34?"
   - Verify step-by-step solution appears

2. **Agent Test:**
   - Go to `/chat`
   - Enter: "best budget laptops 2025"
   - Click "Search & Summarize"
   - Verify results table and CSV download link appear

### Demo Script

Use these sample queries to demonstrate Algebrix:

**Math Problem:**
```
Solve: 3x + 5 = 20. Show step-by-step work.
```

**Web Research:**
```
best budget laptops 2025
```

**Complex Math:**
```
Calculate the area of a circle with radius 7.5 cm. Show all steps.
```

**Research Query:**
```
latest advances in quantum computing 2025
```

## 🔒 Security & Safety

### What Algebrix Will NEVER Do:

- ❌ Request or store account credentials
- ❌ Perform login actions on websites
- ❌ Make purchases or financial transactions
- ❌ Access authenticated pages without warning

### What Algebrix CAN Do:

- ✅ Search and analyze public web content
- ✅ Solve mathematical problems
- ✅ Extract and summarize information
- ✅ Generate downloadable reports

### Built-in Protections:

- Rate limiting (2 concurrent tasks per IP)
- No credential handling
- Safe file downloads only
- Timeout protection on web requests

## 📁 Project Structure

```
algebrix-beta/
├── public/
│   ├── Untitled design.png      # Logo/favicon
│   └── outputs/                 # Generated CSV files
├── server/
│   ├── index.js                 # Express server
│   ├── middleware/
│   │   └── rateLimit.js         # Rate limiting
│   ├── routes/
│   │   ├── chat.js              # Chat endpoint
│   │   ├── agent.js             # Agent endpoint
│   │   └── download.js          # File download
│   └── services/
│       ├── gemini.js            # Gemini API integration
│       ├── playwright.js        # Web scraping
│       └── csv.js               # CSV generation
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── AgentResults.tsx
│   │   ├── MathSteps.tsx
│   │   └── SafetyModal.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── ChatPage.tsx
│   ├── App.tsx
│   └── main.tsx
├── .env.example                 # Environment template
├── package.json
└── README.md
```

## 🐛 Common Issues

### Gemini API Errors

**Error:** `GEMINI_API_KEY_FREE environment variable is not set`

**Solution:** Ensure your `.env` file exists and contains a valid API key

### Playwright Errors

**Error:** `browserType.launch: Executable doesn't exist`

**Solution:** Run `npx playwright install chromium`

**Alternative:** Set `PLAYWRIGHT_ENABLED=false` to use HTTP fallback

### Build Errors

**Error:** `Cannot find module 'react-router-dom'`

**Solution:** Run `npm install` to ensure all dependencies are installed

### Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:** Change the PORT in `.env` or kill the process using port 3000

## 📝 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY_FREE` | ✅ Yes | None | Your Google Gemini API key |
| `PORT` | ❌ No | `3000` | Server port |
| `NODE_ENV` | ❌ No | `development` | Environment mode |
| `PLAYWRIGHT_ENABLED` | ❌ No | `true` | Enable/disable Playwright |

## 🤝 Contributing

This is a beta project. Feel free to submit issues and enhancement requests!

## 📜 License

This project is provided as-is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Playwright for web automation
- React and Tailwind CSS for the UI
- Express.js for the backend

---

**Built with ❤️ for the Algebrix.ai Beta**

For questions or support, please open an issue on GitHub.
