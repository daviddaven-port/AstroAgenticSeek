# BACKEND ARCHITECTURE GUIDE - WesternOS

> **Critical Backend Documentation for Future Agents**  
> Last Updated: 2025-12-22  
> Complexity Level: ADVANCED

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack
```
Frontend: Astro 5.16.4 + React 19.2.3
Backend: Astro SSR (Node.js)
State: React Context API + Zustand (v5.0)
File System: BrowserFS (IndexedDB + HTTP overlay)
AI Services: Vercel AI SDK + Direct Google/OpenAI SDKs
Browser Automation: Playwright 1.57.0
```

---

## 📂 DIRECTORY STRUCTURE

```
src/
├── pages/
│   ├── api/
│   │   ├── agent.ts              # Main AI agent endpoint (Playwright automation)
│   │   └── agent-gemini.ts       # Simple Gemini chat endpoint
│   ├── index.astro               # Vim Terminal Landing Page
│   ├── desktop.astro             # WesternOS Main Desktop
│   └── toolkit.astro             # Tools/Utilities Page
├── contexts/
│   ├── fileSystem/               # BrowserFS Integration
│   │   ├── index.ts              # Provider Export
│   │   ├── useAsyncFs.ts         # BrowserFS React Hook
│   │   ├── useFileSystemContextState.ts
│   │   └── types.ts
│   ├── process/                  # Window/Process Management
│   │   ├── index.ts              # Provider Export
│   │   ├── functions.ts          # Process CRUD operations
│   │   ├── directory.ts          # Process/App Registry
│   │   ├── useProcessContextState.ts
│   │   └── types.ts
│   ├── session/                  # User Session & Settings
│   │   ├── index.ts              # Provider Export
│   │   ├── useSessionContextState.ts
│   │   └── types.ts
│   └── index.tsx                 # OSProvider (Combines all contexts)
├── components/
│   ├── apps/                     # Application Components
│   │   ├── Telegraph/            # Terminal Emulator
│   │   ├── Docs/                 # File Explorer
│   │   ├── Ledger/               # Logs/Settings
│   │   ├── Browser/              # Web Browser
│   │   └── AIChat/               # Chat Interface
│   ├── system/                   # Desktop System Components
│   │   ├── Desktop/index.tsx     # Main Desktop Container
│   │   ├── Window/               # Draggable Window System
│   │   └── Taskbar/              # Bottom Taskbar
│   └── mac/                      # macOS-style components (legacy)
└── lib/
    └── agent/
        └── PlaywrightManager.ts  # Singleton Playwright Instance Manager
```

---

## 🔐 BACKEND API ENDPOINTS

### 1. `/api/agent.ts` - Advanced AI Agent with Browser Automation

**Purpose**: Executes multi-step web automation tasks using LLM planning + Playwright execution.

**Request Schema** (Validated with Zod):
```typescript
{
  action: "START" | "GET_NEXT_STEP" | "EXECUTE_STEP",
  goal: string,              // User's natural language goal
  sessionId: string,         // Unique session identifier
  apiKey: string,            // User's LLM API key (BYOK)
  provider: "google" | "openai" | "anthropic",
  previousSteps?: Array<any>, // Step history for context
  step?: {                   // For EXECUTE_STEP
    tool: "GOTO" | "ACT" | "EXTRACT" | "OBSERVE" | "CLOSE" | "WAIT" | "NAVBACK",
    instruction: string
  }
}
```

**Actions**:
- **START**: Generates initial URL from goal, navigates browser
- **GET_NEXT_STEP**: Uses LLM to determine next action based on history
- **EXECUTE_STEP**: Executes a browser action via Playwright

**Security Features**:
- ✅ Zod schema validation on all inputs
- ✅ SSRF protection (URL protocol whitelist)
- ✅ API key validation
- ✅ Input sanitization
- ❌ **MISSING**: Rate limiting, session timeout
- ❌ **MISSING**: Proper session management (currently uses global Playwright instance)

**Critical Issues Found**:
1. **No Session Isolation**: `PlaywrightManager` is a singleton. Multiple concurrent users will interfere with each other.
2. **Memory Leak Risk**: Pages never properly cleaned up per-session.
3. **Error Handling**: Generic errors don't provide enough context for debugging.

---

### 2. `/api/agent-gemini.ts` - Simple Gemini Chat

**Purpose**: Direct Gemini API integration for simple chat/task execution.

**Request Schema**:
```typescript
{
  action: "EXECUTE_TASK",
  goal: string,
  apiKey: string,
  sessionId: string
}
```

**Security Features**:
- ✅ API key format validation (regex check)
- ✅ Input length limits (2000 chars)
- ✅ Security headers (X-Frame-Options, X-XSS-Protection)
- ✅ Specific error handling (quota, invalid key)
- ❌ **MISSING**: Request rate limiting

---

## 🧠 CONTEXT SYSTEM (STATE MANAGEMENT)

### FileSystem Context (`src/contexts/fileSystem/`)

**Purpose**: Virtual filesystem using BrowserFS (IndexedDB + HTTP overlay).

**Configuration** (from `useAsyncFs.ts`):
```typescript
{
  fs: "MountableFileSystem",
  options: {
    "/": {
      fs: "OverlayFS",
      options: {
        readable: {
          fs: "HTTPRequest",
          options: { 
            index: "/fs-index.json",  // File manifest
            baseUrl: "/fs"            // Static file location
          },
        },
        writable: { 
          fs: "IndexedDB", 
          options: { storeName: "western-os-fs" }
        },
      },
    },
  },
}
```

**How It Works**:
1. **Read**: First checks IndexedDB (writable layer), falls back to HTTP (readonly layer from `/public/fs/`)
2. **Write**: All writes go to IndexedDB, never to HTTP layer
3. **Async API**: All fs methods return Promises wrapping BrowserFS callbacks

**API Methods**:
```typescript
- exists(path: string): Promise<boolean>
- readFile(path: string): Promise<Buffer>
- writeFile(path: string, data: Buffer | string, overwrite?: boolean): Promise<boolean>
- readdir(path: string): Promise<string[]>
- mkdir(path: string, overwrite?: boolean): Promise<boolean>
- stat(path: string): Promise<Stats>
- lstat, rename, rmdir, unlink, etc.
```

**Critical Issues Found**:
1. **No Error Boundaries**: If BrowserFS fails to initialize, entire app crashes.
2. **Race Condition**: `fs` state might be undefined when components try to use it.
3. **No Loading State**: Telegraph/Docs apps check `if (!fs)` but don't show proper loading UI.

---

### Process Context (`src/contexts/process/`)

**Purpose**: Manages open windows/applications (similar to OS process management).

**Key Concepts**:
- **Process**: A running application instance (defined in `directory.ts`)
- **PID**: Unique identifier (`appName__url__instance`)
- **Singleton**: Apps marked `singleton: true` only allow one instance

**Process Registry** (`directory.ts`):
```typescript
{
  Telegraph: {
    Component: Telegraph,      // React component
    backgroundColor: "#000",
    defaultSize: { height: 400, width: 600 },
    icon: "📠",
    title: "Telegraph"
  },
  // ... Browser, Docs, Ledger, AIChat
}
```

**State Structure**:
```typescript
type Processes = {
  [pid: string]: {
    Component: React.ComponentType,
    title: string,
    icon: string,
    minimized?: boolean,
    maximized?: boolean,
    closing?: boolean,
    url?: string,
    // ... other arguments
  }
}
```

**API Methods**:
```typescript
- open(id: string, args: ProcessArguments, icon?: string): void
- close(id: string, closing?: boolean): void
- maximize(id: string): void
- minimize(id: string): void
- argument(id: string, name: string, value: any): void
- linkElement(id: string, name: string, element: HTMLElement): void
```

**Critical Issues Found**:
1. **No Process Lifecycle Hooks**: No way to cleanup resources when window closes.
2. **Memory Leak**: Closed processes don't cleanup their event listeners.
3. **Missing Validation**: `open()` doesn't validate if app exists in directory.

---

### Session Context (`src/contexts/session/`)

**Purpose**: User session state (wallpaper, theme, window positions, focus management).

**State Managed**:
```typescript
- sessionLoaded: boolean          // Is session loaded from fs?
- windowStates: Record<string, WindowState>  // Window positions/sizes
- themeName: string                // Current theme
- wallpaperImage: string          // Wallpaper path
- stackOrder: string[]            // Z-index order of windows
- foregroundId: string            // Currently focused window
```

**Persistence**:
- Saves to BrowserFS at `/session.json`
- Auto-saves on state changes (debounced via useEffect)
- Loads on mount from filesystem

**Critical Issues Found**:
1. **Stub Implementations**: Many methods are no-ops (`setAiEnabled: () => {}`)
2. **Missing Persistence**: `stackOrder`, `foregroundId` not persisted
3. **Race Condition**: Reads from fs before fs is guaranteed ready

---

## 🔧 CRITICAL FIXES NEEDED

### Priority 1: Session Management in API Routes

**Problem**: `agent.ts` uses singleton Playwright instance - incompatible with multi-user.

**Solution** (Pseudocode for next agent):
```typescript
// Create session manager
class SessionManager {
  sessions: Map<string, { page: Page, lastActive: Date }>;
  
  async getOrCreateSession(sessionId: string): Promise<Page> {
    if (!this.sessions.has(sessionId)) {
      const page = await PlaywrightManager.createPage();
      this.sessions.set(sessionId, { page, lastActive: new Date() });
    }
    return this.sessions.get(sessionId)!.page;
  }
  
  cleanup(): void {
    // Close sessions older than 30 minutes
  }
}
```

### Priority 2: Error Boundaries for Context Providers

**Problem**: If BrowserFS fails, entire app breaks with no feedback.

**Solution**:
```typescript
// Wrap OSProvider in ErrorBoundary
// Show fallback UI if context initialization fails
```

### Priority 3: Proper Loading States

**Problem**: Apps render before `fs` is ready.

**Solution**:
```typescript
// In FileSystemProvider, expose `isReady: boolean`
// Telegraph checks `if (!isReady) return <LoadingSpinner />`
```

---

## 📋 EXECUTION CHECKLIST FOR NEXT AGENT

### Backend Improvements
- [ ] Add SessionManager class to `/src/lib/agent/SessionManager.ts`
- [ ] Refactor `agent.ts` to use SessionManager instead of singleton
- [ ] Add rate limiting middleware to API routes
- [ ] Implement proper error logging (structured JSON logs)
- [ ] Add request timeout (30s max)

### Context System Fixes
- [ ] Add `isReady` boolean to FileSystemProvider
- [ ] Implement proper cleanup in ProcessProvider
- [ ] Add ErrorBoundary around OSProvider
- [ ] Fix session persistence (stackOrder, foregroundId)
- [ ] Remove stub methods or implement them properly

### Testing Requirements
- [ ] Test filesystem with 100+ files
- [ ] Test concurrent API requests (10+ simultaneous)
- [ ] Test browser session cleanup after 30min
- [ ] Test error recovery (network failure, API quota)

---

## 🚀 DEPLOYMENT NOTES

### Environment Variables Required
```env
# Optional - for non-BYOK mode
GOOGLE_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Playwright
PLAYWRIGHT_BROWSERS_PATH=0  # Use bundled browsers
```

### Build Command
```bash
npm run build
```

### Known Build Issues
- None currently

### Performance Targets
- First contentful paint: < 1.5s
- Time to interactive: < 3s
- API response time: < 500ms (chat), < 5s (browser automation)

---

## 🐛 DEBUGGING GUIDE

### Common Issues

**Issue**: Telegraph shows "FileSystem not ready"
```typescript
// Check: Is BrowserFS initialized?
// Fix: Add loading state, wait for fs in useEffect
```

**Issue**: Windows don't close properly
```typescript
// Check: Process cleanup logic in closeProcess()  
// Fix: Ensure all event listeners removed
```

**Issue**: API returns 500 with no details
```typescript
// Check: Server console logs
// Fix: Enable structured error logging
```

### Debug Tools
```typescript
// In browser console:
window.__WESTERN_OS__ = {
  fs: getBrowserFS(),
  processes: getProcesses(),
  session: getSession()
};
```

---

## 📚 ADDITIONAL RESOURCES

- BrowserFS Docs: https://github.com/jvilk/BrowserFS
- Playwright API: https://playwright.dev/docs/api/class-playwright
- Vercel AI SDK: https://sdk.vercel.ai/docs

---

**END OF BACKEND ARCHITECTURE GUIDE**
