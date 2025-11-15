# Algebrix.ai Beta

## Overview

Algebrix.ai Beta is a full-stack AI-powered research and mathematics assistant that combines conversational AI with autonomous web research capabilities. The application uses Google's Gemini Pro API for natural language processing and mathematical problem-solving, while employing Playwright for intelligent web scraping and data extraction. Users can engage in step-by-step math problem-solving or initiate autonomous research agents that search the web, extract relevant content, and generate structured CSV reports.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18 with TypeScript, React Router for navigation, Tailwind CSS for styling, and Vite as the build tool.

**Design Pattern**: Component-based architecture with page-level routing. The application follows a clear separation between presentation components (`Header`, `Footer`, `MathSteps`, `AgentResults`, `SafetyModal`) and container components (`LandingPage`, `ChatPage`, `ChatWidget`).

**State Management**: Local component state using React hooks (`useState`, `useRef`, `useEffect`). No global state management library is used, keeping the architecture simple and focused on component-level concerns.

**Routing Structure**: Two primary routes - a marketing landing page (`/`) and the chat interface (`/chat`). Static file serving is handled by the Express backend with fallback to `index.html` for client-side routing.

**UI/UX Decisions**: Dark theme with smoke and grid background effects for visual appeal. The chat interface includes real-time message rendering with special formatting for mathematical steps (highlighted in blue) and final answers (highlighted in green). A safety modal appears on first visit to establish user expectations about security and privacy.

### Backend Architecture

**Technology Stack**: Node.js with Express 5, ES modules pattern, and three core service layers (Gemini AI, Playwright scraping, CSV generation).

**API Design**: RESTful endpoints organized by concern:
- `/api/chat` - Conversational AI interactions with Gemini
- `/api/agent` - Autonomous research workflow orchestration
- `/api/download` - CSV file delivery with path sanitization

**Service Layer Pattern**: Business logic is encapsulated in dedicated service modules:
- `gemini.js` - Handles all Google Gemini API interactions, including chat and web search
- `playwright.js` - Manages headless browser operations with fallback to HTTP requests
- `csv.js` - Generates structured CSV files from extracted data

**Rate Limiting Strategy**: IP-based concurrent request limiting (max 2 per IP) to prevent abuse. The middleware tracks active requests per IP and automatically cleans up on response completion.

**Error Handling**: Graceful degradation with fallback mechanisms. If Playwright fails (restrictive environments), the system falls back to basic HTTP extraction. CSV generation failures don't crash the entire agent workflow.

**Static File Serving**: Express serves both the Vite-built frontend (`dist/`) and user-generated files (`public/outputs/`) with proper routing fallback for React Router.

### Data Flow Architecture

**Agent Research Workflow**:
1. User submits research topic through chat interface
2. Backend calls Gemini API to perform web search and identify top 5 URLs
3. For each URL, Playwright launches headless browser, removes overlays/cookie banners, and extracts title + meaningful paragraph
4. Extracted data is written to timestamped CSV file in `public/outputs/`
5. Gemini generates 3-5 sentence summary of findings
6. Response includes summary, results table, and CSV download link
7. Frontend renders results in tabular format with download button

**Chat Message Flow**:
1. User message sent via POST to `/api/chat` with conversation history
2. Backend constructs Gemini prompt with system instructions and conversation context
3. Gemini API returns response with mathematical formatting or conversational answer
4. Frontend `MathSteps` component parses response for step-by-step formatting
5. Messages stored in component state with timestamps

**File Generation Pattern**: CSV files are generated with timestamp-based filenames to prevent collisions. Files are stored in `public/outputs/` which is served statically, allowing direct download links without streaming.

### Security Architecture

**API Key Management**: Environment variable-based configuration using dotenv. The application expects `GEMINI_API_KEY_FREE` to be set and fails gracefully with clear error messages if missing.

**Input Sanitization**: Path traversal protection in download endpoint using `path.basename()`. Query parameters are validated before file system access.

**Safety Boundaries**: System prompt explicitly instructs Gemini to never request credentials, perform logins, or make purchases. A safety modal educates users on these limitations on first visit.

**CORS Configuration**: Enabled for local development flexibility while maintaining production security through Express CORS middleware.

**Content Security**: Playwright extracts only publicly accessible content. Cookie banners and overlays are automatically removed to prevent accidental interaction with authentication prompts.

## External Dependencies

### AI Service Integration

**Google Gemini Pro API**: Primary AI service for natural language understanding, mathematical problem-solving, web search capabilities, and content summarization. Uses the `gemini-pro` model via REST API. Requires free-tier API key from Google AI Studio. Configured with temperature 0.7, topK 40, topP 0.95, and max 2048 output tokens.

### Web Scraping Infrastructure

**Playwright**: Headless Chromium browser automation for robust content extraction. Installed via postinstall script (`playwright install chromium`). Configured with no-sandbox mode for compatibility with restrictive environments. Can be disabled via `PLAYWRIGHT_ENABLED=false` environment variable, triggering fallback to basic HTTP requests.

**Fallback Mechanism**: When Playwright is unavailable, the system uses native fetch to retrieve page content. This ensures the application can run in environments where browser automation is restricted (e.g., certain cloud platforms).

### Data Processing

**csv-writer**: Node.js library for generating properly formatted CSV files with headers. Used to create downloadable research reports with columns: URL, Title, Excerpt.

### Development and Build Tools

**Vite**: Modern build tool optimized for React/TypeScript. Configured with React plugin and lucide-react optimization exclusion. Handles both development server (with HMR) and production builds.

**TypeScript**: Strict type checking with separate configs for app code (`tsconfig.app.json`) and build tools (`tsconfig.node.json`). Uses bundler module resolution for modern import patterns.

**Tailwind CSS**: Utility-first CSS framework with custom animations (`smokeMove`) and utility classes (`smoke-bg`, `grid-bg`) for visual effects.

### Supporting Libraries

**React Router DOM**: Client-side routing with browser history mode. Handles navigation between landing page and chat interface.

**Lucide React**: Icon library providing consistent visual elements (Brain, Search, Shield, Zap, etc.).

**Express Middleware**: CORS for cross-origin requests, native JSON body parsing, static file serving.

### Deployment Considerations

**Replit Configuration**: Includes `.replit` file specifying Node.js runtime and npm scripts. Postinstall hook ensures Playwright browser binaries are available.

**Environment Variables**: Single required variable (`GEMINI_API_KEY_FREE`) with template in `.env.example`. Optional `PORT` and `PLAYWRIGHT_ENABLED` for deployment flexibility.

**Port Binding**: Server binds to `0.0.0.0` to support containerized deployments and cloud platforms. Default port 5000 with environment override capability.