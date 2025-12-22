# Multi-Agent Handoff Instructions

## 🚨 CRITICAL: Read This First

This project is designed for **multi-agent collaboration**. If you're taking over from another agent, follow these instructions carefully.

---

## Project Philosophy

### ⚠️ **NO DOWNGRADING POLICY**
- **NEVER** remove features
- **NEVER** simplify functionality that works
- **ALWAYS** move forward
- **ALWAYS** add, improve, enhance

If something is broken, fix it. Don't remove it.

---

## Quick Start for New Agent

1. **Read This File First** (you're doing it!)
2. **Read [CURRENT_STATE.md](./CURRENT_STATE.md)** - What's working right now
3. **Read [PHASES.md](./PHASES.md)** - Development roadmap
4. **Check [ARCHITECTURE.md](./ARCHITECTURE.md)** - How everything fits together
5. **Review Recent Commits** - `git log --oneline -10`

---

## Current Project: WesternOS

**Repository:** `https://github.com/daviddaven-port/AstroAgenticSeek`  
**Branch:** `DynamicAstro`  
**Tech Stack:** Astro 5.x + React 19.x + TypeScript

### What Is This?
A browser-based operating system with:
- **Left Panel:** Agent Station (for AI agent integration)
- **Right Panel:** WesternOS (Western-themed desktop with apps)

### Key Features
- ✅ Dual-panel layout (Agent Station + WesternOS)
- ✅ Western theme (browns, golds, frontier aesthetic)
- ✅ Vim tutorial system (8 lessons + 6 games)
- ✅ Working applications (Docs, Wild West, Ledger, Telegraph)
- 🚧 File system implementation (IN PROGRESS)
- 📅 Enhanced apps with real functionality (PLANNED)

---

## Development Workflow

### Before You Start
```bash
# 1. Pull latest changes
git pull origin DynamicAstro

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
# Visit: http://localhost:4321
```

### Making Changes

1. **Check CURRENT_STATE.md** - Know what's working
2. **Update task.md** - Mark what you're working on
3. **Make your changes**
4. **Test thoroughly** - Don't break existing features
5. **Commit with clear message** (see format below)
6. **Update CURRENT_STATE.md** - Document what you did
7. **Push to GitHub**

### Commit Message Format
```
type: Brief description

- Detailed change 1
- Detailed change 2
- Why this change was made

[Optional: Breaking changes, migration notes]
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

**Examples:**
```bash
git commit -m "feat: Add file system with BrowserFS

- Installed browserfs package
- Created FileSystemConfig.ts
- Set up OverlayFS with IndexedDB
- Files now persist across sessions

Based on daedalOS implementation"
```

```bash
git commit -m "fix: Clarify Vim games are educational only

- Updated :play command messaging
- Added instructions to download real Vim
- Removed confusing 'play in browser' text

Resolves user confusion about game functionality"
```

### Pushing Changes
```bash
# Always push to DynamicAstro branch
git push origin DynamicAstro
```

---

## File Structure

```
dynamic-astro/
├── src/
│   ├── components/
│   │   ├── SimpleDesktop.tsx      # Main WesternOS component
│   │   ├── AgentOSDesktop.tsx     # Old desktop (being phased out)
│   │   └── DesktopOsScreen.astro  # Wrapper for React component
│   ├── pages/
│   │   ├── index.astro            # Landing page with Vim terminal
│   │   ├── desktop.astro          # WesternOS page
│   │   └── toolkit.astro          # Toolkit page
│   ├── lib/
│   │   ├── vimTutorial.ts         # Vim lessons/games engine
│   │   └── fileSystem/            # File system (TO BE CREATED)
│   └── styles/
├── public/
│   └── fs/                        # File system content (TO BE CREATED)
├── HANDOFF.md                     # This file
├── CURRENT_STATE.md               # What's working now
├── PHASES.md                      # Development roadmap
├── ARCHITECTURE.md                # System design
├── SECURITY.md                    # Security documentation
├── AGENT_INTEGRATION.md           # Agent integration guide
└── CHANGELOG.md                   # Version history
```

---

## Common Tasks

### Adding a New Feature
1. Check if it's in PHASES.md
2. Create a new branch (optional): `git checkout -b feature/your-feature`
3. Implement the feature
4. Test it works
5. Update documentation
6. Commit and push
7. Merge to DynamicAstro if using a branch

### Fixing a Bug
1. Identify the bug
2. Check CURRENT_STATE.md - is it a known issue?
3. Fix it
4. Test the fix
5. Update CURRENT_STATE.md - remove from known issues
6. Commit with `fix:` prefix

### Adding Documentation
1. Update relevant .md files
2. Keep documentation concise but complete
3. Use examples where helpful
4. Commit with `docs:` prefix

---

## Testing Checklist

Before committing major changes:

- [ ] Dev server runs without errors
- [ ] Main page loads (`http://localhost:4321`)
- [ ] WesternOS loads (`http://localhost:4321/desktop`)
- [ ] All windows open/close correctly
- [ ] No console errors
- [ ] Vim commands work (`:help`, `:vimtutor`, etc.)
- [ ] Agent Station visible on left
- [ ] WesternOS visible on right
- [ ] Documentation updated

---

## Important Files to Update

### Always Update These:
1. **CURRENT_STATE.md** - After any significant change
2. **CHANGELOG.md** - For version releases
3. **PHASES.md** - When completing tasks

### Sometimes Update These:
- **ARCHITECTURE.md** - When changing system design
- **SECURITY.md** - When adding security features
- **AGENT_INTEGRATION.md** - When changing agent hooks

---

## Current Priorities (as of Dec 22, 2025)

### Phase 1: Cleanup ✅ DONE
- [x] Remove duplicate API inputs
- [x] Clarify Vim games are educational
- [x] Clean up confusing UI elements

### Phase 2: File System 🚧 IN PROGRESS
- [ ] Install BrowserFS
- [ ] Create FileSystemConfig.ts
- [ ] Set up file structure
- [ ] Integrate with Docs app
- [ ] Integrate with Telegraph app

### Phase 3: Enhanced Apps 📅 NEXT
- [ ] Upgrade Docs to real file browser
- [ ] Add file commands to Telegraph
- [ ] Upgrade Ledger to Monaco Editor
- [ ] Add more features to Wild West

---

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Git Push Fails
```bash
# Make sure you're on the right branch
git branch

# If not on DynamicAstro:
git checkout DynamicAstro

# Pull latest changes first
git pull origin DynamicAstro

# Then push
git push origin DynamicAstro
```

### Build Errors
```bash
# Check for TypeScript errors
npm run build

# Fix any errors shown
# Then test again
npm run dev
```

---

## Communication Between Agents

### Leaving Notes for Next Agent

Add notes to **CURRENT_STATE.md** under "Notes for Next Agent":

```markdown
## Notes for Next Agent

- I was working on the file system implementation
- BrowserFS is installed but not yet configured
- See FileSystemConfig.ts (partially complete)
- Next step: Create public/filesystem.json
- Estimated time: 2-3 hours
```

### Asking Questions

If you're unsure about something:
1. Check existing documentation
2. Look at git history: `git log --all --grep="keyword"`
3. Search codebase: `grep -r "search term" src/`
4. Leave a note in CURRENT_STATE.md for clarification

---

## Resources

### External Documentation
- **Astro:** https://docs.astro.build
- **React:** https://react.dev
- **BrowserFS:** https://github.com/jvilk/BrowserFS
- **daedalOS (reference):** https://github.com/DustinBrett/daedalOS

### Project Documentation
- [SECURITY.md](./SECURITY.md) - Security best practices
- [AGENT_INTEGRATION.md](./AGENT_INTEGRATION.md) - How to integrate agents
- [PHASES.md](./PHASES.md) - Full development roadmap

---

## Final Reminders

1. **Never downgrade** - Only move forward
2. **Test before committing** - Don't break what works
3. **Document your changes** - Help the next agent
4. **Push to GitHub** - Keep the repository up to date
5. **Read CURRENT_STATE.md** - Know what's working
6. **Follow the plan** - Check PHASES.md for priorities

---

**Welcome to the team! Let's build something amazing! 🚀**
