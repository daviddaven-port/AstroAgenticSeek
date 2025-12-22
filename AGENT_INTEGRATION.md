# Agent Integration Guide - WesternOS

## Overview

WesternOS provides a dedicated **Agent Station** panel on the left side of the interface, designed for integration with external AI agents like AgenticSeek, Playwright automation, and other agentic tools.

## Architecture

```
┌─────────────────────────────────────────────┐
│  WesternOS                                  │
├──────────────┬──────────────────────────────┤
│              │                              │
│   Agent      │      Desktop Environment     │
│   Station    │      (Wild West Browser,     │
│   (Left)     │       Docs, Ledger, etc.)    │
│              │                              │
│  [Hook Div]  │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

## Agent Workbench Hook

### DOM Element

The agent workbench is accessible via:

```javascript
const workbench = document.getElementById('agent-workbench-hook');
```

**Properties:**
- **ID:** `agent-workbench-hook`
- **Location:** Left panel, below "AGENT STATION" header
- **Styling:** Full height, scrollable, padding: 1rem
- **Theme:** Dark background (#1a1a1a) with Western accents

### Injecting Content

#### Method 1: Direct DOM Manipulation

```javascript
const workbench = document.getElementById('agent-workbench-hook');
if (workbench) {
  workbench.innerHTML = `
    <div class="agent-interface">
      <h2>Agent Active</h2>
      <div class="status">Running task...</div>
    </div>
  `;
}
```

#### Method 2: React Portal (Recommended)

```javascript
import { createPortal } from 'react-dom';

function AgentInterface() {
  const workbenchEl = document.getElementById('agent-workbench-hook');
  
  if (!workbenchEl) return null;
  
  return createPortal(
    <div className="agent-ui">
      <h2>AgenticSeek Interface</h2>
      <TaskList />
      <BrowserPreview />
    </div>,
    workbenchEl
  );
}
```

#### Method 3: Web Components

```javascript
class AgentWorkbench extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .agent-card { 
          background: #2c1810; 
          border: 2px solid #8b4513;
          padding: 1rem;
          border-radius: 8px;
        }
      </style>
      <div class="agent-card">
        <h3>Task Queue</h3>
        <ul id="task-list"></ul>
      </div>
    `;
  }
}

customElements.define('agent-workbench', AgentWorkbench);

// Inject
const workbench = document.getElementById('agent-workbench-hook');
workbench.innerHTML = '<agent-workbench></agent-workbench>';
```

## Playwright Integration

### Example: AgenticSeek Integration

```javascript
// playwright-agent.js
import { chromium } from 'playwright';

async function injectAgent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to WesternOS
  await page.goto('http://localhost:4321/desktop');
  
  // Wait for workbench to be ready
  await page.waitForSelector('#agent-workbench-hook');
  
  // Inject agent interface
  await page.evaluate(() => {
    const workbench = document.getElementById('agent-workbench-hook');
    
    // Create agent UI
    const agentUI = document.createElement('div');
    agentUI.className = 'playwright-agent';
    agentUI.innerHTML = `
      <div style="color: #deb887; font-family: serif;">
        <h3 style="border-bottom: 2px solid #8b4513; padding-bottom: 0.5rem;">
          🤖 Playwright Agent
        </h3>
        <div id="agent-status" style="margin-top: 1rem;">
          Status: Connected
        </div>
        <div id="agent-tasks" style="margin-top: 1rem;">
          <h4>Active Tasks:</h4>
          <ul id="task-list" style="list-style: none; padding: 0;"></ul>
        </div>
      </div>
    `;
    
    workbench.innerHTML = '';
    workbench.appendChild(agentUI);
  });
  
  // Update status periodically
  setInterval(async () => {
    await page.evaluate((status) => {
      const statusEl = document.getElementById('agent-status');
      if (statusEl) {
        statusEl.textContent = `Status: ${status}`;
      }
    }, 'Running automation...');
  }, 1000);
}

injectAgent();
```

### Controlling WesternOS from Playwright

```javascript
// Open Wild West browser and navigate
await page.evaluate(() => {
  // Find the Wild West dock icon
  const dockIcons = document.querySelectorAll('.dock-icon');
  const wildWestIcon = Array.from(dockIcons).find(
    icon => icon.title === 'Wild West'
  );
  wildWestIcon?.click();
});

// Wait for browser window to open
await page.waitForSelector('.window-header:has-text("Wild West")');

// Type URL in Wild West browser
await page.evaluate((url) => {
  const urlInput = document.querySelector('input[placeholder*="Ride to URL"]');
  if (urlInput) {
    urlInput.value = url;
    urlInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}, 'https://example.com');
```

## Message-Based Communication

### PostMessage API

For secure cross-origin communication:

```javascript
// In WesternOS
window.addEventListener('message', (event) => {
  // Validate origin
  if (event.origin !== 'http://localhost:3000') return;
  
  const { type, payload } = event.data;
  
  switch (type) {
    case 'AGENT_TASK':
      handleAgentTask(payload);
      break;
    case 'AGENT_STATUS':
      updateAgentStatus(payload);
      break;
  }
});

// From external agent
window.postMessage({
  type: 'AGENT_TASK',
  payload: {
    action: 'navigate',
    url: 'https://choppd.beauty'
  }
}, '*');
```

### Custom Events

```javascript
// WesternOS dispatches custom events
const agentEvent = new CustomEvent('western-os:agent-ready', {
  detail: { workbenchId: 'agent-workbench-hook' }
});
window.dispatchEvent(agentEvent);

// Agent listens for events
window.addEventListener('western-os:agent-ready', (event) => {
  console.log('Workbench ready:', event.detail.workbenchId);
  initializeAgent();
});
```

## Styling Guidelines

### Western Theme Colors

Match the WesternOS aesthetic:

```css
.agent-interface {
  /* Backgrounds */
  --bg-dark: #1a1a1a;
  --bg-brown: #2c1810;
  --bg-leather: #8b4513;
  
  /* Text */
  --text-light: #f4e4bc;
  --text-gold: #deb887;
  --text-accent: #daa520;
  
  /* Borders */
  --border-brown: #5c4033;
  --border-leather: #8b4513;
  
  /* Fonts */
  font-family: serif;
}

.agent-card {
  background: var(--bg-brown);
  border: 2px solid var(--border-leather);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-light);
}

.agent-button {
  background: var(--bg-leather);
  color: var(--text-light);
  border: 2px solid var(--border-brown);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: serif;
  font-weight: bold;
}

.agent-button:hover {
  background: #a0522d;
}
```

## Example: Full AgenticSeek Integration

```javascript
// agenticseek-western.js

class WesternOSAgent {
  constructor() {
    this.workbench = null;
    this.taskQueue = [];
    this.status = 'idle';
  }
  
  async initialize() {
    // Wait for workbench to be available
    await this.waitForWorkbench();
    
    // Inject UI
    this.injectInterface();
    
    // Start listening for tasks
    this.startTaskListener();
    
    console.log('WesternOS Agent initialized');
  }
  
  waitForWorkbench() {
    return new Promise((resolve) => {
      const check = () => {
        this.workbench = document.getElementById('agent-workbench-hook');
        if (this.workbench) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }
  
  injectInterface() {
    this.workbench.innerHTML = `
      <div class="western-agent">
        <style>
          .western-agent {
            color: #f4e4bc;
            font-family: serif;
          }
          .agent-header {
            background: #8b4513;
            padding: 1rem;
            border-radius: 8px 8px 0 0;
            border: 2px solid #5c4033;
            border-bottom: none;
          }
          .agent-body {
            background: #2c1810;
            padding: 1rem;
            border: 2px solid #5c4033;
            border-top: none;
            border-radius: 0 0 8px 8px;
            min-height: 200px;
          }
          .task-item {
            background: #1a1a1a;
            padding: 0.75rem;
            margin: 0.5rem 0;
            border-left: 4px solid #daa520;
            border-radius: 4px;
          }
          .status-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background: #228b22;
            color: white;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
          }
        </style>
        
        <div class="agent-header">
          <h3 style="margin: 0;">🤠 AgenticSeek</h3>
          <div style="margin-top: 0.5rem; font-size: 0.875rem;">
            <span class="status-badge" id="agent-status">IDLE</span>
          </div>
        </div>
        
        <div class="agent-body">
          <h4>Task Queue</h4>
          <div id="task-queue">
            <p style="opacity: 0.5; font-style: italic;">
              No tasks in queue
            </p>
          </div>
          
          <h4 style="margin-top: 1.5rem;">Browser Preview</h4>
          <div id="browser-preview" style="
            border: 2px dashed #5c4033;
            padding: 1rem;
            border-radius: 4px;
            text-align: center;
            opacity: 0.5;
          ">
            No active browser session
          </div>
        </div>
      </div>
    `;
  }
  
  addTask(task) {
    this.taskQueue.push(task);
    this.updateTaskDisplay();
  }
  
  updateTaskDisplay() {
    const queueEl = document.getElementById('task-queue');
    if (!queueEl) return;
    
    if (this.taskQueue.length === 0) {
      queueEl.innerHTML = '<p style="opacity: 0.5; font-style: italic;">No tasks in queue</p>';
      return;
    }
    
    queueEl.innerHTML = this.taskQueue.map((task, i) => `
      <div class="task-item">
        <strong>${i + 1}.</strong> ${task.description}
        <div style="font-size: 0.75rem; opacity: 0.7; margin-top: 0.25rem;">
          ${task.status}
        </div>
      </div>
    `).join('');
  }
  
  updateStatus(status) {
    this.status = status;
    const statusEl = document.getElementById('agent-status');
    if (statusEl) {
      statusEl.textContent = status.toUpperCase();
      statusEl.style.background = 
        status === 'running' ? '#daa520' :
        status === 'error' ? '#cd5c5c' :
        '#228b22';
    }
  }
  
  startTaskListener() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'AGENT_TASK') {
        this.addTask(event.data.payload);
        this.executeTask(event.data.payload);
      }
    });
  }
  
  async executeTask(task) {
    this.updateStatus('running');
    
    // Execute task logic here
    console.log('Executing task:', task);
    
    // Simulate task completion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.updateStatus('idle');
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const agent = new WesternOSAgent();
    agent.initialize();
  });
} else {
  const agent = new WesternOSAgent();
  agent.initialize();
}
```

## API Reference

### Available DOM Elements

| Element ID | Purpose | Location |
|------------|---------|----------|
| `agent-workbench-hook` | Main agent injection point | Left panel |
| Window elements | Draggable windows | Main desktop area |
| Dock icons | Application launchers | Bottom center |

### Custom Events

| Event Name | When Fired | Data |
|------------|------------|------|
| `western-os:ready` | OS fully loaded | `{ timestamp }` |
| `western-os:window-opened` | Window created | `{ windowId, type }` |
| `western-os:window-closed` | Window closed | `{ windowId }` |

### Utility Functions

```javascript
// Get current open windows
function getOpenWindows() {
  return Array.from(document.querySelectorAll('.window-header'))
    .map(header => ({
      title: header.textContent.trim(),
      element: header.closest('.absolute')
    }));
}

// Open a specific application
function openApp(appType) {
  const dockIcons = {
    'docs': '💼',
    'wildwest': '🌵',
    'ledger': '📓',
    'telegraph': '📠'
  };
  
  const icon = Array.from(document.querySelectorAll('[title]'))
    .find(el => el.title === appType);
  
  if (icon) icon.click();
}
```

## Best Practices

1. **Always validate the workbench exists** before injecting content
2. **Use Western theme colors** to maintain visual consistency
3. **Clean up event listeners** when agent disconnects
4. **Handle errors gracefully** - the workbench may not always be available
5. **Respect user privacy** - don't capture sensitive data
6. **Log all actions** for debugging and audit trails

## Troubleshooting

### Workbench not found

```javascript
if (!document.getElementById('agent-workbench-hook')) {
  console.error('Agent workbench not available. Is WesternOS loaded?');
  // Retry or show error to user
}
```

### Styling conflicts

Use scoped styles or Shadow DOM to avoid conflicts with WesternOS styles.

### Performance issues

- Debounce frequent updates
- Use virtual scrolling for large lists
- Minimize DOM manipulations

## Support

For integration support:
- GitHub Issues: [Repository URL]
- Documentation: This file
- Examples: See `/examples` directory (coming soon)
