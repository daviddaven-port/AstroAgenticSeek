# EXECUTION PLAYBOOK - WesternOS Development

> **🎯 DESIGNED FOR MAXIMUM CLARITY**  
> This guide assumes ZERO prior knowledge. Follow steps EXACTLY as written.  
> Each command is COPY-PASTE ready. No improvisation needed.

---

## 📋 TABLE OF CONTENTS

1. [Before You Start](#before-you-start)
2. [Daily Development Workflow](#daily-development-workflow)
3. [Making Changes](#making-changes)
4. [Testing Your Changes](#testing-your-changes)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 BEFORE YOU START

### Step 1: Pull Latest Code

**WHY**: Ensures you have the latest commits from GitHub.

**COMMAND**:
```bash
cd c:\Users\daven\.gemini\antigravity\playground\dynamic-astro
git pull origin DynamicAstro
```

**EXPECTED OUTPUT**:
```
Already up to date.
```
OR
```
Updating abc123..def456
Fast-forward
 [files changed]
```

**IF ERROR** "Your local changes would be overwritten":
```bash
git stash
git pull origin DynamicAstro
git stash pop
```

---

### Step 2: Check Dev Server Status

**WHY**: You need the dev server running to see your changes.

**COMMAND**:
```bash
npm run dev
```

**EXPECTED OUTPUT**:
```
🚀 astro v5.16.4 started in XXms

➜ Local: http://localhost:4321/
```

**KEEP THIS TERMINAL OPEN**. Open a NEW terminal for other commands.

**TEST IT WORKS**:
1. Open browser
2. Go to `http://localhost:4321`
3. You should see: "CHOPPD - VIM Command training center"
4. Click "INITIALIZE TERMINAL"

---

## 💼 DAILY DEVELOPMENT WORKFLOW

### GOLDEN RULE
```
PULL → CHANGE → TEST → COMMIT → PUSH
```

### Step-by-Step

#### 1. PULL (Get latest code)
```bash
git pull origin DynamicAstro
```

#### 2. CHANGE (Make your edits)
- See [Making Changes](#making-changes) section below

#### 3. TEST (Verify it works)
- See [Testing Your Changes](#testing-your-changes)

#### 4. COMMIT (Save your work locally)
```bash
git add .
git commit -m "Brief description of what you changed"
```

**Example**:
```bash
git commit -m "Fix Telegraph terminal not showing files"
```

#### 5. PUSH (Upload to GitHub)
```bash
git push origin HEAD
```

**EXPECTED OUTPUT**:
```
remote: Resolving deltas: 100%
To https://github.com/daviddaven-port/AstroAgenticSeek.git
   abc123..def456  HEAD -> DynamicAstro
```

---

## 🛠️ MAKING CHANGES

### RULE 1: Read Before Editing

**ALWAYS do this BEFORE changing code**:

```bash
# For backend/context files
# Read: c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\BACKEND_ARCHITECTURE.md

# For strategy/planning
# Read: c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\STRATEGY.md

# For general guidelines
# Read: c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\INSTRUCTIONS.md
```

---

### RULE 2: One Change at a Time

**BAD ❌**:
- Edit 5 files
- Commit once with message "various fixes"

**GOOD ✅**:
- Edit 1 file (or related files)
- Test it
- Commit with specific message
- Repeat

---

### RULE 3: File Editing Checklist

When editing a file:

**BEFORE**:
- [ ] I have read the file completely
- [ ] I understand what it does
- [ ] I know which lines to change

**DURING**:
- [ ] I am changing ONLY what is necessary
- [ ] I am following existing code style
- [ ] I am NOT deleting critical imports

**AFTER**:
- [ ] File saved
- [ ] No syntax errors (dev server didn't crash)
- [ ] Tested in browser

---

## ✅ TESTING YOUR CHANGES

### Frontend Changes (Astro/React files)

#### 1. Check Dev Server Logs

Look at the terminal where `npm run dev` is running.

**GOOD OUTPUT**:
```
11:30:45 PM [astro] update /.../file.tsx
```

**BAD OUTPUT** (means syntax error):
```
[ERROR] Failed to reload /.../file.tsx
SyntaxError: Unexpected token
```

**IF BAD**: Fix the syntax error, save again.

---

#### 2. Check Browser Console

1. Open browser: `http://localhost:4321`
2. Press `F12` (opens DevTools)
3. Click "Console" tab

**GOOD**: No red errors

**BAD**: Red error messages

**COMMON ERRORS**:

| Error | Cause | Fix |
|-------|-------|-----|
| `fs is undefined` | FileSystem not initialized | Add `if (!fs) return <div>Loading...</div>` |
| `Uncaught ReferenceError: X is not defined` | Missing import | Add `import X from '...'` |
| `Cannot read properties of undefined` | Accessing property on null object | Add null check: `obj?.property` |

---

#### 3. Manual Testing Checklist

For **Telegraph (Terminal)** changes:
- [ ] Click dock icon (📠)
- [ ] Window opens
- [ ] Type `ls` and press Enter
- [ ] Files are listed
- [ ] Type `help` - shows commands

For **Docs (File Explorer)** changes:
- [ ] Click dock icon (💼)
- [ ] Window opens
- [ ] Double-click a folder
- [ ] Folder contents appear
- [ ] Click back button (🔙)
- [ ] Returns to previous directory

For **Desktop UI** changes:
- [ ] Windows are draggable
- [ ] Windows don't overlap weirdly
- [ ] Dock icons clickable
- [ ] No visual glitches

---

### Backend Changes (API routes, contexts)

#### 1. Check Server Logs

Terminal running `npm run dev`:

**GOOD**:
```
POST /api/agent 200 in 245ms
```

**BAD**:
```
POST /api/agent 500 in 12ms
Error: [error details]
```

---

#### 2. Test API Endpoints

**Method 1: Using Browser Console**

1. Open browser console (`F12`)
2. Paste this:

```javascript
// Test agent-gemini.ts
fetch('/api/agent-gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'EXECUTE_TASK',
    goal: 'Say hello',
    apiKey: 'YOUR_GEMINI_API_KEY', // Replace with actual key
    sessionId: 'test-123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**EXPECTED**:
```json
{
  "success": true,
  "result": {
    "text": "Hello! ...",
    "sessionId": "test-123",
    "timestamp": "..."
  }
}
```

**IF ERROR**:
- Check API key is valid
- Check request body matches schema
- Read error message carefully

---

**Method 2: Manual Interaction**

If you edited **Telegraph** or **Docs** (uses FileSystem):
1. Open Telegraph
2. Type commands: `ls`, `cd home`, `mkdir test`
3. Verify they work
4. Open Docs
5. Verify you see the same files

---

## 📚 COMMON TASKS

### Task 1: Add a New Application to the Dock

**EXAMPLE**: Add a "Calendar" app

#### Step 1: Create App Component

```bash
# Create directory
mkdir c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\src\components\apps\Calendar
```

**Create file**: `c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\src\components\apps\Calendar\index.tsx`

```typescript
import React, { memo } from 'react';
import styled from 'styled-components';

const StyledCalendar = styled.div`
  padding: 20px;
  background: white;
  height: 100%;
  color: black;
`;

const Calendar: React.FC = () => {
  return (
    <StyledCalendar>
      <h1>📅 Calendar</h1>
      <p>Your frontier schedule</p>
    </StyledCalendar>
  );
};

export default memo(Calendar);
```

#### Step 2: Register in Process Directory

**Edit**: `c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\src\contexts\process\directory.ts`

**Add import at top**:
```typescript
import Calendar from "../../components/apps/Calendar";
```

**Add entry in the `directory` object** (before the closing `}`):
```typescript
  Calendar: {
    Component: Calendar,
    backgroundColor: "#ffffff",
    defaultSize: {
      height: 500,
      width: 600,
    },
    icon: "📅",
    title: "Frontier Calendar",
  },
```

#### Step 3: Add to Desktop Dock

**Edit**: `c:\Users\daven\.gemini\antigravity\playground\dynamic-astro\src\components\system\Desktop\index.tsx`

**Find the `apps` array** (around line 81-85):

**Add your app**:
```typescript
const apps = [
  { id: 'Telegraph', icon: '📠', title: 'Telegraph' },
  { id: 'Docs', icon: '💼', title: 'Docs' },
  { id: 'Ledger', icon: '📓', title: 'Ledger' },
  { id: 'Calendar', icon: '📅', title: 'Calendar' }, // NEW LINE
];
```

#### Step 4: Test

1. Save all files
2. Check dev server (no errors)
3. Refresh browser
4. Click Calendar icon (📅) in dock
5. Window should open with "Calendar" header

#### Step 5: Commit

```bash
git add .
git commit -m "Add Calendar application to dock"
git push origin HEAD
```

---

### Task 2: Fix a Context/State Bug

**EXAMPLE**: Telegraph shows "FileSystem not ready" even when it's loaded

#### Step 1: Identify the Problem

**Location**: `src/components/apps/Telegraph/index.tsx`

**Line 53**:
```typescript
const { fs } = useFileSystem() || {};
```

**Problem**: `fs` might be undefined during initial render.

#### Step 2: Add Loading State

**Find the return statement** (around line 137).

**BEFORE**:
```typescript
return (
  <StyledTelegraph>
    <div className="history">
```

**AFTER**:
```typescript
// Add this BEFORE the return
if (!fs) {
  return (
    <StyledTelegraph>
      <div style={{ padding: '20px', color: '#daa520' }}>
        ⏳ Initializing Telegraph...
      </div>
    </StyledTelegraph>
  );
}

return (
  <StyledTelegraph>
    <div className="history">
```

#### Step 3: Test

1. Save file
2. Refresh browser
3. Open Telegraph
4. Should briefly show "Initializing..." then normal interface
5. Type `ls` - should work

#### Step 4: Commit

```bash
git add src/components/apps/Telegraph/index.tsx
git commit -m "Add loading state to Telegraph (fix FileSystem not ready error)"
git push origin HEAD
```

---

### Task 3: Update Backend API Route

**EXAMPLE**: Add rate limiting to `agent-gemini.ts`

#### Step 1: Install Package

```bash
npm install express-rate-limit
```

#### Step 2: Edit API Route

**File**: `src/pages/api/agent-gemini.ts`

**Add at top** (after imports):
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});
```

**In the POST handler**, wrap logic:
```typescript
export const POST: APIRoute = async ({ request }) => {
  // Apply rate limiting (simplified, real implementation needs middleware)
  // For now, add manual check using a Map (for demonstration)
  
  try {
    const body = await request.json();
    // ... rest of code
```

#### Step 3: Test

**Test normal request**:
```javascript
fetch('/api/agent-gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'EXECUTE_TASK',
    goal: 'Test rate limit',
    apiKey: 'valid-key',
    sessionId: 'test-123'
  })
}).then(r => r.json()).then(console.log);
```

**EXPECTED**: Success response

**Test rate limit** (send 101 requests rapidly):
- Should get rate limit error after 100 requests

#### Step 4: Commit

```bash
git add src/pages/api/agent-gemini.ts package.json package-lock.json
git commit -m "Add rate limiting to agent-gemini API endpoint"
git push origin HEAD
```

---

## 🆘 TROUBLESHOOTING

### Problem: Dev Server Won't Start

**ERROR**:
```
Error: Cannot find module 'astro'
```

**FIX**:
```bash
npm install
npm run dev
```

---

### Problem: Git Push Rejected

**ERROR**:
```
! [rejected] HEAD -> DynamicAstro (non-fast-forward)
```

**FIX**:
```bash
git pull origin DynamicAstro --rebase
git push origin HEAD
```

---

### Problem: Browser Shows Blank Page

**CHECKLIST**:
1. Check dev server is running (see terminal)
2. Check browser console (F12) for errors
3. Check URL is `http://localhost:4321` (not 3000, 8080, etc.)
4. Hard refresh: `Ctrl + Shift + R`

---

### Problem: Changes Not Appearing

**FIX**:
1. Save the file (Ctrl+S)
2. Check dev server terminal - should show "update"
3. Hard refresh browser (Ctrl + Shift + R)
4. Clear browser cache (Ctrl + Shift + Delete)

---

### Problem: TypeScript Error

**ERROR**:
```
Type 'undefined' is not assignable to type 'string'
```

**FIX**: Add optional chaining or null check
```typescript
// BAD
const value = obj.property;

// GOOD
const value = obj?.property || 'default';
```

---

## 🎯 FINAL CHECKLIST BEFORE COMMITTING

- [ ] Code saved
- [ ] Dev server has no errors
- [ ] Browser console has no errors
- [ ] Manually tested the feature
- [ ] Read BACKEND_ARCHITECTURE.md if touching backend
- [ ] Commit message is clear and specific
- [ ] Pushed to GitHub

---

## 📞 GETTING HELP

**STEP 1**: Read the error message completely  
**STEP 2**: Check this playbook for similar issue  
**STEP 3**: Read `BACKEND_ARCHITECTURE.md` for backend issues  
**STEP 4**: Read `STRATEGY.md` for what to work on next  

---

**END OF EXECUTION PLAYBOOK**
