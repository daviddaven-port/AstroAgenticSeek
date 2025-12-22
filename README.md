# 🤠 WesternOS

**A Western-themed, browser-based operating system with integrated AI agent workbench**

WesternOS is a fully functional, secure, web-based operating system featuring a Wild West aesthetic. Built with Astro and React, it provides a complete desktop environment with file management, web browsing, text editing, and terminal access - all themed around the American frontier.

![WesternOS Screenshot](https://via.placeholder.com/800x400?text=WesternOS+Desktop)

## ✨ Features

### 🏜️ Western-Themed Desktop Environment
- **Docs** (File Manager) - Organize your saddlebags with folders like Sheriff, Supplies, Wanted, and Moonshine
- **Wild West** (Browser) - Surf the web with a leather-tooled interface, defaults to `choppd.beauty`
- **Ledger** (Text Editor) - Keep your Marshal's log with a parchment-styled editor
- **Telegraph** (Terminal) - Send signals with Western-themed commands like `yeehaw`

### 🤖 Agent Station
- Dedicated left panel for AI agent integration
- Hook point for AgenticSeek, Playwright, and other automation tools
- Message-based communication API
- See [AGENT_INTEGRATION.md](./AGENT_INTEGRATION.md) for details

### 🔒 Security-First Design
- Sandboxed iframe for browser isolation
- XSS prevention through React's automatic escaping
- Memory leak prevention with proper cleanup
- CSP-ready architecture
- See [SECURITY.md](./SECURITY.md) for full security documentation

### 🎨 Premium UI/UX
- Draggable, resizable windows
- macOS-inspired window controls (with Western colors)
- Smooth animations and transitions
- Responsive design
- Western color palette (browns, golds, parchment)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/daviddaven-port/AstroAgenticSeek.git
cd dynamic-astro

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321/desktop` to see WesternOS in action!

## 📁 Project Structure

```text
dynamic-astro/
├── src/
│   ├── components/
│   │   ├── AgentOSDesktop.tsx      # Main OS component (React)
│   │   ├── AgentOSWrapper.astro    # React wrapper
│   │   ├── NeuralAgentScreen.astro # Neural agent interface
│   │   └── mac/                    # Legacy macOS components
│   ├── pages/
│   │   ├── index.astro             # Landing page
│   │   ├── desktop.astro           # WesternOS desktop
│   │   └── api/                    # API endpoints
│   └── layouts/
│       └── Layout.astro            # Base layout
├── public/                         # Static assets
├── SECURITY.md                     # Security documentation
├── AGENT_INTEGRATION.md            # Agent integration guide
└── README.md                       # This file
```

## 🎮 Usage

### Opening Applications

Click the dock icons at the bottom of the screen:
- 💼 **Docs** - File manager
- 🌵 **Wild West** - Web browser
- 📓 **Ledger** - Text editor
- 📠 **Telegraph** - Terminal

### Window Management

- **Drag** - Click and drag the window header to move
- **Close** - Click the red button (left)
- **Minimize** - Click the yellow button (middle)
- **Maximize** - Click the green button (right)

### Telegraph Commands

```bash
help      # Show available signals
clear     # Wipe the slate clean
time      # Check the sun dial
yeehaw    # Celebration!
echo      # Echo text back
```

### Wild West Browser

1. Click the Wild West (🌵) icon in the dock
2. Enter a URL in the "Ride to URL..." bar
3. Press Enter to navigate
4. Default page: `https://choppd.beauty`

**Security Note:** The browser uses iframe sandboxing for security. See [SECURITY.md](./SECURITY.md) for details.

## 🤖 Agent Integration

WesternOS includes an **Agent Station** panel for integrating AI agents and automation tools.

### Quick Integration Example

```javascript
// Get the agent workbench
const workbench = document.getElementById('agent-workbench-hook');

// Inject your agent UI
workbench.innerHTML = `
  <div style="color: #f4e4bc; font-family: serif;">
    <h3>🤖 My Agent</h3>
    <p>Agent is running...</p>
  </div>
`;
```

For complete integration guide, see [AGENT_INTEGRATION.md](./AGENT_INTEGRATION.md).

### Playwright Example

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4321/desktop');

// Inject agent
await page.evaluate(() => {
  const workbench = document.getElementById('agent-workbench-hook');
  workbench.innerHTML = '<div>Agent Active</div>';
});
```

## 🛠️ Development

### Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm audit` | Check for security vulnerabilities |

### Tech Stack

- **Framework:** Astro 5.x
- **UI Library:** React 19.x
- **Styling:** Inline CSS with Tailwind-like utilities
- **Dragging:** react-draggable
- **Type Safety:** TypeScript
- **Build Tool:** Vite (via Astro)

### Adding New Applications

1. Create a new component in `AgentOSDesktop.tsx`:
```tsx
const MyAppContent: React.FC = () => (
  <div>My App Content</div>
);
```

2. Add to window types:
```tsx
type: 'docs' | 'wildwest' | 'ledger' | 'telegraph' | 'myapp'
```

3. Add to switch statement in `getContent()`

4. Add dock icon in the dock array

## 🔒 Security

WesternOS implements multiple security layers:

- ✅ Iframe sandboxing for browser isolation
- ✅ React automatic XSS prevention
- ✅ Memory leak prevention
- ✅ No direct DOM manipulation
- ✅ Input validation
- ✅ CSP-ready architecture

**Important:** For production deployments, configure CSP headers and enable HTTPS.

See [SECURITY.md](./SECURITY.md) for comprehensive security documentation.

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details

## 🙏 Acknowledgments

- Inspired by [daedalOS](https://github.com/DustinBrett/daedalOS) by Dustin Brett
- Built with [Astro](https://astro.build)
- UI components powered by [React](https://react.dev)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

- **Issues:** [GitHub Issues](https://github.com/daviddaven-port/AstroAgenticSeek/issues)
- **Security:** See [SECURITY.md](./SECURITY.md) for reporting vulnerabilities
- **Integration Help:** See [AGENT_INTEGRATION.md](./AGENT_INTEGRATION.md)

---

**Built with ❤️ and a touch of the Wild West** 🤠
