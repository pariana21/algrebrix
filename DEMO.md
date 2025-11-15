# Algebrix.ai Beta - Demo Script

This document provides sample queries and expected behaviors for demonstrating the full capabilities of Algebrix.ai Beta.

## 🎯 Demo Scenarios

### Scenario 1: Basic Math Problem

**Query:**
```
Solve: 3x + 5 = 20. Show step-by-step work.
```

**Expected Behavior:**
- Chat interface displays the query
- Algebrix responds with step-by-step solution:
  - Step 1: Subtract 5 from both sides
  - Step 2: Simplify to get 3x = 15
  - Step 3: Divide both sides by 3
  - Final Answer: x = 5
- Each step is highlighted in the UI
- Final answer is prominently displayed

**Validation:**
✅ Response appears within 2-5 seconds
✅ Steps are clearly formatted
✅ Math is correct

---

### Scenario 2: Web Research Agent

**Query:**
```
best budget laptops 2025
```

**Action:**
1. Enter the query in the chat input
2. Click the **"Search & Summarize"** button (green button)

**Expected Behavior:**
- User message shows "🔍 Search & Summarize: best budget laptops 2025"
- Progress indicators appear:
  - "Searching..."
  - "Extracting pages..."
  - "Generating CSV..."
- Agent response includes:
  - A 3-5 sentence summary of findings
  - A table showing 5 results with URL, Title, and Excerpt
  - A blue "Download CSV" button

**Validation:**
✅ Process completes in 20-40 seconds
✅ Table displays 5 rows
✅ CSV download works and contains valid data
✅ Summary is coherent and relevant

---

### Scenario 3: Complex Math with Multiple Steps

**Query:**
```
Calculate the area of a circle with radius 7.5 cm. Show all intermediate calculations.
```

**Expected Behavior:**
- Algebrix responds with:
  - Formula: A = πr²
  - Step 1: Square the radius (7.5² = 56.25)
  - Step 2: Multiply by π (56.25 × 3.14159...)
  - Final Answer: Approximately 176.71 cm²
- Each calculation step is shown clearly
- Units are included

**Validation:**
✅ Formula is stated
✅ Intermediate calculations shown
✅ Final answer is correct and rounded appropriately

---

### Scenario 4: Multi-Turn Conversation

**Conversation:**

**Turn 1:**
```
What is 15 × 23?
```

**Expected:** `345`

**Turn 2:**
```
Now add 100 to that result.
```

**Expected:** `445`

**Turn 3:**
```
Divide the final result by 5.
```

**Expected:** `89`

**Validation:**
✅ Context is maintained across turns
✅ Each calculation references the previous result
✅ All answers are correct

---

### Scenario 5: Research with Specific Domain

**Query:**
```
latest advances in quantum computing 2025
```

**Action:**
Click "Search & Summarize"

**Expected Behavior:**
- Agent searches for recent quantum computing advances
- Extracts content from 5 relevant sources
- Summary highlights key breakthroughs or trends
- CSV contains structured data

**Validation:**
✅ Sources are relevant to quantum computing
✅ Content is recent (mentions 2024-2025)
✅ Summary is technically coherent

---

## 🔍 Feature Testing Checklist

### Chat Functionality
- [ ] Messages send on Enter key
- [ ] Messages send on Send button click
- [ ] Loading spinner appears during processing
- [ ] User messages appear on right (blue)
- [ ] Assistant messages appear on left (gray)
- [ ] Timestamps are displayed
- [ ] Scrolling works smoothly

### Agent Functionality
- [ ] "Search & Summarize" button is visible
- [ ] Button is disabled when input is empty
- [ ] Progress indicators update in order
- [ ] Results table displays correctly
- [ ] URLs in table are clickable
- [ ] CSV download button appears
- [ ] CSV file downloads successfully
- [ ] CSV contains correct data format

### Math Display
- [ ] Step-by-step solutions are highlighted
- [ ] Final answers are prominently displayed
- [ ] Mathematical notation is readable
- [ ] Multi-line solutions format correctly

### Safety & Security
- [ ] Safety modal appears on first chat page visit
- [ ] Modal can be dismissed
- [ ] Footer displays security promise
- [ ] Rate limiting prevents spam (test by making 3 quick agent requests)

### Navigation
- [ ] Header logo links to home page
- [ ] "Home" and "Chat" nav links work
- [ ] Landing page CTA buttons work
- [ ] Browser back/forward buttons work

### Responsive Design
- [ ] Landing page looks good on mobile
- [ ] Chat interface works on tablet
- [ ] Tables scroll horizontally on small screens
- [ ] Buttons are touch-friendly

---

## 🧪 Edge Cases to Test

### Error Handling

**Test 1: Empty Message**
- Action: Try to send empty message
- Expected: Button is disabled, nothing happens

**Test 2: Network Error Simulation**
- Action: Disconnect internet, send message
- Expected: Error message displays in chat

**Test 3: Invalid API Key**
- Action: Set invalid `GEMINI_API_KEY_FREE`
- Expected: Error message: "GEMINI_API_KEY_FREE environment variable is not set"

### Rate Limiting

**Test:** Open chat in 3 browser tabs, trigger agent search in all 3 simultaneously
- Expected: First 2 succeed, third receives 429 error with retry message

### Long Content

**Test:** Enter very long query (500+ characters)
- Expected: Query sends successfully, response handles long content

### Special Characters

**Test:** Send query with special characters: `Solve: 2x² + 3x - 5 = 0`
- Expected: Math renders correctly, solution provided

---

## 📊 Performance Benchmarks

| Operation | Expected Time | Acceptable Range |
|-----------|---------------|------------------|
| Simple chat message | 2-3 seconds | 1-5 seconds |
| Complex math solution | 3-5 seconds | 2-8 seconds |
| Agent search (5 pages) | 25-35 seconds | 15-50 seconds |
| CSV generation | < 1 second | < 2 seconds |
| Page load (landing) | < 1 second | < 2 seconds |

---

## 🎬 Recommended Demo Flow

**For a live demo or presentation:**

1. **Start at Landing Page** (30 seconds)
   - Highlight the hero section and tagline
   - Scroll through features
   - Mention the German "Über" section

2. **Navigate to Chat** (15 seconds)
   - Click "Start Chatting" CTA
   - Show safety modal, explain protections
   - Dismiss modal

3. **Demo Math Capability** (1 minute)
   - Enter: "Solve: 3x + 5 = 20. Show step-by-step work."
   - Highlight step-by-step display
   - Explain formatting (steps in blue, answer in green)

4. **Demo Agent Research** (2 minutes)
   - Enter: "best budget laptops 2025"
   - Click "Search & Summarize"
   - Point out progress indicators
   - Show results table
   - Click CSV download
   - Open CSV in Excel/Sheets to show data

5. **Highlight Security** (30 seconds)
   - Scroll to footer
   - Read security promise
   - Mention rate limiting

6. **Q&A and Exploration** (remaining time)

**Total Demo Time: ~5 minutes**

---

## 🐛 Known Limitations

1. **Playwright on Replit:** May not work due to environment restrictions. Use `PLAYWRIGHT_ENABLED=false` fallback.

2. **Gemini API Rate Limits:** Free tier has limits. If exceeded, errors will occur.

3. **Search Accuracy:** Gemini may not always return real URLs. Fallback URLs are provided.

4. **Context Length:** Very long conversations may exceed API limits.

5. **Page Extraction:** Some websites block scrapers or have complex JavaScript that may not render.

---

## 📝 Demo Talking Points

**What makes Algebrix unique:**
- Autonomous: Acts independently to research and solve problems
- Multi-modal: Handles both math and web research
- Transparent: Shows step-by-step reasoning
- Secure: Built-in privacy protections

**Technical highlights:**
- React + TypeScript frontend
- Express backend with rate limiting
- Playwright for real web scraping
- Google Gemini Pro for AI
- CSV export for data portability

**Use cases:**
- Students: Homework help with step-by-step explanations
- Researchers: Quick web searches with synthesized summaries
- Analysts: Data extraction and CSV reports
- Anyone: General questions with intelligent responses

---

**Happy demoing! 🚀**
