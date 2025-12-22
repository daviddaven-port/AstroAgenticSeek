# Project Instructions for AstroAgenticSeek (WesternOS / Choppd.beauty)

## **CRITICAL PROTOCOL FOR AI AGENTS (Target: Gemini 2.0 Flash)**

**Context**: You are working on a complex project involving "WesternOS" (a web-based OS) and "Choppd.beauty" (AI services domain). The User expects a "zippity" workflow: fast, clear, and error-free execution.

### 1. **"GitHub First" Workflow**
*   **ALWAYS** sync with GitHub before starting work.
*   **CHECK** for remote changes: `git pull origin <branch>`
*   **COMMIT & PUSH** frequently. The User wants this repo to be the source of truth.
*   **Remote URL**: The repo is `daviddaven-port/AstroAgenticSeek`. If you are authenticated, use the PAT provided in the environment (or ask if missing).

### 2. **Project Structure**
*   **Directory**: `c:\Users\daven\.gemini\antigravity\playground\dynamic-astro`
*   **Framework**: Astro (Static Site Generator + Server Side Rendering).
*   **Key Components**:
    *   `src/components/WesternOS`: The desktop environment UI (Window Manager, Taskbar, Desktop).
    *   `src/pages`: Astro routes.
    *   `public`: Static assets.

### 3. **Development Cycle**
*   **Start Server**: `npm run dev` (Check if already running on port 4321).
*   **Verify**: Open `http://localhost:4321` in the browser to test changes. **Do not assume code works without running it.**
*   **Logs**: Check the terminal output specifically for "WesternOS" or Astro errors.

### 4. **Coding Standards & "Zippity" Execution**
*   **Plan First**: Quickly outline steps in your head or a scratchpad.
*   **One-Shot Success**: Aim to fix the issue in the first attempt. Verify files exist before editing.
*   **Clear Commands**: When asking the user to run commands, generally use `SafeToAutoRun: true` for safe things like `npm install` or `git status`.
*   **No Fluff**: The user wants results. Be concise in your communication.

### 5. **Known Issues / Gotchas**
*   **Environment Variables**: Ensure API keys (Gemini, etc.) are set in `.env` if features fail.
*   **Hydration**: WesternOS is a React app inside Astro. Watch out for "hydration mismatch" errors. Ensure components are client-only if they rely on browser APIs (`client:only="react"`).

---
**Mission**: Build the coolest Web OS and AI Service platform.
**Motto**: "Zippity execution, Crystal clear commands."
