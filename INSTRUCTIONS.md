# Project Instructions for AstroAgenticSeek (WesternOS / Choppd.beauty)

## **🎯 START HERE - READ THIS FIRST**

**YOU ARE WORKING ON**: WesternOS - a web-based operating system with AI agent integration for choppd.beauty

**YOUR ROLE**: Execute development tasks with precision and speed ("zippity execution")

---

## 📚 DOCUMENTATION INDEX

### → **FOR IMMEDIATE EXECUTION**: [`EXECUTION_PLAYBOOK.md`](./EXECUTION_PLAYBOOK.md)
**READ THIS IF**:
- You need to make code changes RIGHT NOW
- You need step-by-step copy-paste commands
- You are unsure how to test your changes
- You got an error and need to fix it

**CONTAINS**:
- Daily workflow (PULL → CHANGE → TEST → COMMIT → PUSH)
- Common tasks with exact commands
- Troubleshooting guide
- Testing checklists

---

### → **FOR BACKEND WORK**: [`BACKEND_ARCHITECTURE.md`](./BACKEND_ARCHITECTURE.md)
**READ THIS IF**:
- Editing files in `src/pages/api/`
- Working on contexts (`src/contexts/`)
- Dealing with FileSystem, Process, or Session logic
- Debugging state management issues

**CONTAINS**:
- Complete architecture diagram
- Context system explained
- API endpoint documentation
- Critical bugs and fixes needed
- Security considerations

---

### → **FOR PLANNING**: [`STRATEGY.md`](./STRATEGY.md)
**READ THIS IF**:
- You don't know what to work on next
- You want to understand the big picture
- You need to prioritize tasks

**CONTAINS**:
- 4-phase development roadmap
- Task breakdown by priority
- Feature requirements
- Design direction

---

### → **FOR AGENT INTEGRATION**: [`AGENT_INTEGRATION.md`](./AGENT_INTEGRATION.md)
**READ THIS IF**:
- Integrating external AI agents
- Working with the Agent Station UI
- Using Playwright/browser automation
- Building agent communication

**CONTAINS**:
- Agent Station DOM hooks
- Playwright integration examples
- Message-based communication
- Styling guidelines

---

## ⚡ QUICK START (5-MINUTE SETUP)

### 1. **Sync with GitHub** (ALWAYS DO THIS FIRST)
```bash
cd c:\Users\daven\.gemini\antigravity\playground\dynamic-astro
git pull origin DynamicAstro
```

### 2. **Start Dev Server**
```bash
npm run dev
```
**Expected**: Server starts at `http://localhost:4321`

### 3. **Verify It Works**
- Open browser → `http://localhost:4321`
- Click "INITIALIZE TERMINAL"
- See Vim terminal interface

### 4. **Make Changes** (See EXECUTION_PLAYBOOK.md)

### 5. **Commit & Push**
```bash
git add .
git commit -m "Your descriptive message"
git push origin HEAD
```

---

## 🏗️ PROJECT STRUCTURE (QUICK REFERENCE)

```
dynamic-astro/
├── src/
│   ├── pages/
│   │   ├── api/              # Backend API routes
│   │   ├── index.astro       # Vim Terminal (Landing)
│   │   └── desktop.astro     # WesternOS Desktop
│   ├── contexts/             # State management
│   │   ├── fileSystem/       # BrowserFS integration
│   │   ├── process/          # Window/app management
│   │   └── session/          # User settings/session
│   ├── components/
│   │   ├── apps/             # Applications (Telegraph, Docs, etc.)
│   │   └── system/           # Desktop UI (Window, Taskbar, Desktop)
│   ├── lib/                  # Utilities
│   └── styles/               # Themes
└── public/
    └── fs/                   # Virtual filesystem files
```

---

## 🔥 CRITICAL RULES (NEVER VIOLATE)

### **RULE 1: GitHub First**
```
ALWAYS PULL BEFORE STARTING
ALWAYS PUSH BEFORE SWITCHING TASKS
```

### **RULE 2: Test Before Committing**
```
IF dev server has errors → FIX FIRST
IF browser console has errors → FIX FIRST  
IF feature doesn't work → FIX FIRST
THEN commit
```

### **RULE 3: Read Before Editing**
```
IF touching backend → READ BACKEND_ARCHITECTURE.md
IF touching contexts → READ BACKEND_ARCHITECTURE.md (Context section)
IF touching API routes → READ BACKEND_ARCHITECTURE.md (API section)
IF unsure → READ EXECUTION_PLAYBOOK.md
```

### **RULE 4: Zippity Execution - No Over-thinking**
```
PLAN ✓
EXECUTE ✓
VERIFY ✓
COMMIT ✓
NEXT TASK ✓

DO NOT:
- Overthink edge cases
- Refactor unrelated code
- Change coding style mid-task
```

---

## 🎨 CODING STANDARDS

### Style
- **TypeScript**: Use strict types, avoid `any`
- **React**: Functional components + hooks (memo for performance)
- **Styled-Components**: Follow Western theme (see `src/styles/WestOS/theme.ts`)

### File Naming
- Components: `PascalCase` (e.g., `Telegraph`, `Desktop`)
- Utilities: `camelCase` (e.g., `useAsyncFs`)
- Types: `types.ts` in same directory

### Commits
```
GOOD: "Fix Telegraph showing 'FileSystem not ready' on load"
GOOD: "Add Calendar app to dock with basic UI"
BAD:  "various fixes"
BAD:  "updates"
```

---

## 🛡️ SECURITY REMINDERS

**WHEN WORKING ON API ROUTES**:
- ✅ Validate ALL inputs with Zod
- ✅ Sanitize user input (limit length, check format)
- ✅ Check for SSRF (validate URL protocols)
- ✅ Use user's API keys (BYOK), never hardcode
- ❌ DON'T expose API keys in logs
- ❌ DON'T allow arbitrary code execution

---

## 🆘 IF YOU'RE STUCK

**1. Read the error message completely**  
**2. Check EXECUTION_PLAYBOOK.md → Troubleshooting**  
**3. Look in BACKEND_ARCHITECTURE.md for relevant section**  
**4. Test each change individually**  

**Remember**: One change at a time. Test. Commit. Move on.

---

## 🚀 MISSION

Build the coolest, most beautiful, Wild West-themed web operating system that serves as the command center for choppd.beauty's AI services.

**Motto**: *"Zippity execution, Crystal clear commands, Frontier aesthetics."*

---

**NOW GO TO**: [`EXECUTION_PLAYBOOK.md`](./EXECUTION_PLAYBOOK.md) **AND START CODING** 🤠

