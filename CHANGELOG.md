# Changelog

All notable changes to WesternOS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-21

### Added - Western Theme Transformation

#### Core Components
- **Complete Western theme rebrand** from generic tech names to frontier terminology
  - `books` → `docs` (File Manager with Saddlebags)
  - `seeker` → `wildwest` (Browser with leather toolbar)
  - `scribe` → `ledger` (Text Editor with Marshal's Log)
  - `nexus` → `telegraph` (Terminal with Western commands)

#### Visual Design
- **Western color palette** throughout the interface
  - Saddle brown (#8b4513) for primary elements
  - Old lace (#f4e4bc) for text and backgrounds
  - Goldenrod (#daa520) for accents
  - Dark brown (#2c1810) for deep backgrounds
- **Textured backgrounds** using transparent textures
  - Cardboard pattern for Docs
  - Aged paper for Wild West browser
  - Notebook texture for Ledger
- **Western-themed icons** replacing generic emojis
  - 💼 Briefcase for Docs
  - 🌵 Cactus for Wild West
  - 📓 Notebook for Ledger
  - 📠 Telegraph for Terminal
- **Desktop icons** with frontier theme
  - ⭐ Sheriff
  - 🍺 Saloon
  - 🐎 Stables

#### Agent Integration
- **Agent Station** left panel for external agent integration
- `agent-workbench-hook` div for injecting agent UIs
- Placeholder UI showing "Waiting for AgenticSeek..."
- Western-themed styling for agent panel

#### Browser Features
- **Default URL** set to `https://choppd.beauty`
- **Secure iframe** with sandbox attributes:
  - `allow-scripts` - Required for modern websites
  - `allow-same-origin` - Required for choppd.beauty functionality
  - `allow-forms` - Required for interactive sites
- **Western-styled controls**
  - Leather-textured toolbar
  - Round navigation buttons
  - "Ride to URL..." placeholder text

#### Terminal Enhancements
- **Western commands** replacing generic ones
  - `yeehaw` - Celebration command
  - `time` instead of `date`
  - "Signals" instead of "commands"
  - "Wipe slate" instead of "clear"
- **Gold color scheme** (#daa520) for terminal text
- **Border styling** with saddle brown (#8b4513)

#### Documentation
- **SECURITY.md** - Comprehensive security documentation
  - XSS prevention strategies
  - Memory leak prevention
  - Iframe security model
  - CSP recommendations
  - Security checklist
- **AGENT_INTEGRATION.md** - Complete integration guide
  - DOM injection examples
  - Playwright integration code
  - React Portal examples
  - Web Components approach
  - Styling guidelines
  - API reference
  - Full AgenticSeek integration example
- **README.md** - Complete rewrite with WesternOS branding
  - Feature overview
  - Quick start guide
  - Usage instructions
  - Development guide
  - Security notes

#### Layout Changes
- **Split-screen layout** with left Agent Station panel
- **Responsive design** maintaining Western aesthetic
- **Menu bar** rebranded as "WesternOS" with cowboy emoji
- **Dock styling** with Western-themed backgrounds and borders

### Changed

#### Component Naming
- All component names updated to Western theme
- All window types updated in TypeScript interfaces
- All function names and variables updated for consistency

#### Styling
- Window backgrounds changed from dark glass to old lace
- Window borders changed to saddle brown
- Button colors updated to Western palette
- Font families changed to serif for Western feel
- Text colors updated to complement brown/gold theme

#### User Interface
- Menu bar items reduced and renamed
- Desktop icon labels with Western names
- Dock icons enlarged and given Western styling
- Hover effects updated with Western colors

### Security

#### Implemented
- ✅ Iframe sandboxing for browser isolation
- ✅ React automatic XSS prevention
- ✅ Memory leak prevention with proper cleanup
- ✅ No direct DOM manipulation
- ✅ TypeScript for type safety

#### Recommended (Not Yet Implemented)
- ⚠️ CSP headers (requires server configuration)
- ⚠️ URL whitelist for browser
- ⚠️ Input sanitization for URL bar
- ⚠️ HTTPS enforcement (deployment-specific)

### Technical Details

#### Dependencies
- No new dependencies added
- Existing dependencies:
  - `react` 19.2.3
  - `react-dom` 19.2.3
  - `react-draggable` 4.5.0
  - `astro` 5.16.4

#### File Changes
- Modified: `src/components/AgentOSDesktop.tsx` (310 → 342 lines)
- Created: `SECURITY.md`
- Created: `AGENT_INTEGRATION.md`
- Modified: `README.md` (complete rewrite)
- Created: `CHANGELOG.md` (this file)

#### Browser Compatibility
- Tested on Chrome/Edge (Chromium-based)
- Should work on Firefox and Safari
- Requires modern browser with ES6+ support

### Known Issues

1. **Iframe Security Limitations**
   - Sites loaded in Wild West browser can execute JavaScript
   - No URL whitelist currently implemented
   - User can navigate to any site (potential security risk)

2. **Memory Leak Potential**
   - While cleanup is implemented, long-running sessions should be monitored
   - No automated memory leak testing yet

3. **Responsive Design**
   - Optimized for desktop screens
   - Mobile experience not yet optimized

### Future Enhancements

- [ ] URL whitelist for Wild West browser
- [ ] CSP header configuration
- [ ] Automated security testing
- [ ] Memory leak regression tests
- [ ] Mobile responsive design
- [ ] Persistent storage for Ledger content
- [ ] File system simulation for Docs
- [ ] More Telegraph commands
- [ ] Agent API formalization
- [ ] Example agent implementations

---

## [0.1.0] - Previous Version

### Initial Features
- Basic macOS-like interface
- Generic application names (Books, Seeker, Scribe, Nexus)
- Dark theme with blue accents
- Basic window management
- Simple browser component

---

**Note:** This changelog documents the major transformation from a generic OS to WesternOS. Previous version history is not available as this represents a complete rebrand.
