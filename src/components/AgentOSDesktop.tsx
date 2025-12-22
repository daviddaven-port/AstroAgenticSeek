import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

// Window Types
interface WindowState {
  id: string;
  type: 'docs' | 'wildwest' | 'ledger' | 'telegraph';
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
}

// Docs (File Manager) Component - Western Style
const DocsContent: React.FC = () => (
  <div className="flex h-full bg-[#f4e4bc] text-[#5c4033] font-serif">
    <div className="w-48 bg-[#8b4513] text-[#f4e4bc] p-4 border-r border-[#5c4033]">
      <div className="mb-4">
        <div className="text-xs font-bold opacity-70 mb-2 border-b border-[#f4e4bc] pb-1">SADDLEBAGS</div>
        <div className="space-y-1">
          {['Homestead', 'Bounties', 'Saloon_Logs', 'Gold_Stash', 'Maps'].map(item => (
            <div key={item} className="px-3 py-1.5 rounded hover:bg-[#a0522d] cursor-pointer text-sm font-semibold">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-bold opacity-70 mb-2 border-b border-[#f4e4bc] pb-1">STORAGE</div>
        <div className="px-3 py-1.5 rounded hover:bg-[#a0522d] cursor-pointer text-sm">Strongbox (C:)</div>
      </div>
    </div>
    <div className="flex-1 p-6 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]">
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Sheriff', icon: '⭐' },
          { name: 'Supplies', icon: '🎒' },
          { name: 'Wanted', icon: '📜' },
          { name: 'Moonshine', icon: '🍾' },
          { name: 'Plans', icon: '🗺️' },
          { name: 'Loot', icon: '💰' },
        ].map(folder => (
          <div key={folder.name} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-[#deb887] cursor-pointer border border-transparent hover:border-[#8b4513]">
            <div className="text-4xl filter drop-shadow-lg">{folder.icon}</div>
            <span className="text-xs text-center font-bold text-[#3e2723]">{folder.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Wild West (Browser) Component
const WildWestContent: React.FC = () => {
  const [url, setUrl] = useState('https://choppd.beauty');
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="flex flex-col h-full bg-[#fdf5e6]">
      <div className="h-12 bg-[#8b4513] border-b-4 border-[#5c4033] flex items-center px-4 gap-3 shadow-md">
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[#d2691e] hover:bg-[#a0522d] flex items-center justify-center text-[#fff8dc] font-bold border-2 border-[#5c4033]">←</button>
          <button className="w-8 h-8 rounded-full bg-[#d2691e] hover:bg-[#a0522d] flex items-center justify-center text-[#fff8dc] font-bold border-2 border-[#5c4033]">→</button>
          <button className="w-8 h-8 rounded-full bg-[#d2691e] hover:bg-[#a0522d] flex items-center justify-center text-[#fff8dc] font-bold border-2 border-[#5c4033]">↻</button>
        </div>
        <div className="flex-1">
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-9 bg-[#fff8dc] rounded border-2 border-[#5c4033] px-3 text-sm font-serif text-[#3e2723] placeholder-[#8b4513] outline-none focus:ring-2 focus:ring-[#d2691e]"
            placeholder="Ride to URL..."
          />
        </div>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center flex-col relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none"></div>
        <iframe 
          src={url}
          className="w-full h-full border-none z-10"
          sandbox="allow-scripts allow-same-origin allow-forms"
          title="Wild West Browser"
        />
      </div>
    </div>
  );
};

// Ledger (Text Editor) Component
const LedgerContent: React.FC = () => {
  const [content, setContent] = useState('# Marshal\'s Log\n\nDay 1: Tracking the bug...');
  
  return (
    <div className="h-full p-4 bg-[#fdf5e6] bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] text-[#2f4f4f]">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full bg-transparent resize-none outline-none font-mono text-base border-none p-4 shadow-inner"
        placeholder="Start scribbling..."
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
};

// Telegraph (Terminal) Component
const TelegraphContent: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['WESTERN OS TELEGRAPH v1.0', 'Type "help" for signals', '']);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (cmd: string) => {
    const newHistory = [...history, `> ${cmd}`];
    
    switch(cmd.toLowerCase()) {
      case 'help':
        newHistory.push('Signals:', '  help - Show signals', '  clear - Wipe slate', '  time - Sun dial', '  yeehaw - Celebration', '');
        break;
      case 'clear':
        setHistory(['']);
        setCurrentInput('');
        return;
      case 'time':
        newHistory.push(new Date().toString(), '');
        break;
      case 'yeehaw':
        newHistory.push('🤠 🐎 YEEHAW PARTNER! 🐎 🤠', '');
        break;
      case cmd.startsWith('echo ') ? cmd : '':
        newHistory.push(cmd.substring(5), '');
        break;
      default:
        if (cmd) newHistory.push(`Unknown signal: ${cmd}`, '');
    }
    
    setHistory(newHistory);
    setCurrentInput('');
  };

  return (
    <div className="h-full bg-[#1a1a1a] p-4 font-mono text-sm overflow-auto border-4 border-[#8b4513]" onClick={() => inputRef.current?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={line.startsWith('>') ? 'text-[#daa520]' : 'text-[#cd853f]'}>{line}</div>
      ))}
      <div className="flex gap-2 items-center">
        <span className="text-[#daa520]">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeCommand(currentInput)}
          className="flex-1 bg-transparent outline-none text-[#daa520] caret-[#daa520]"
          autoFocus
        />
      </div>
    </div>
  );
};

// Main Window Component
const Window: React.FC<{ window: WindowState; onClose: () => void; onFocus: () => void }> = ({ window: win, onClose, onFocus }) => {
  const getContent = () => {
    switch(win.type) {
      case 'docs': return <DocsContent />;
      case 'wildwest': return <WildWestContent />;
      case 'ledger': return <LedgerContent />;
      case 'telegraph': return <TelegraphContent />;
    }
  };

  return (
    <Draggable handle=".window-header" defaultPosition={{ x: win.x, y: win.y }}>
      <div 
        className="absolute rounded-xl overflow-hidden shadow-2xl border border-white border-opacity-10"
        style={{
          width: win.width,
          height: win.height,
          zIndex: win.zIndex,
          background: 'rgba(253, 245, 230, 0.95)', // Old Lace
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          borderRadius: '8px',
          border: '2px solid #8b4513',
          display: win.minimized ? 'none' : 'block'
        }}
        onMouseDown={onFocus}
      >
        <div className="window-header h-10 bg-[#8b4513] border-b border-[#5c4033] flex items-center px-4 cursor-move select-none rounded-t-[6px]">
          <div className="flex gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#cd5c5c] hover:bg-red-600 border border-[#800000]" title="Close" />
            <button className="w-3 h-3 rounded-full bg-[#f4a460] hover:bg-yellow-600 border border-[#8b4513]" title="Minimize" />
            <button className="w-3 h-3 rounded-full bg-[#228b22] hover:bg-green-600 border border-[#006400]" title="Maximize" />
          </div>
          <div className="flex-1 text-center text-sm font-medium">{win.title}</div>
          <div className="w-14" />
        </div>
        <div className="window-content h-[calc(100%-40px)] text-[#3e2723]">
          {getContent()}
        </div>
      </div>
    </Draggable>
  );
};

// Main Desktop Component
export const AgentOSDesktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const createWindow = (type: WindowState['type']) => {
    const titles = {
      docs: 'Docs',
      wildwest: 'Wild West',
      ledger: 'Ledger',
      telegraph: 'Telegraph'
    };

    const newWindow: WindowState = {
      id: Date.now().toString(),
      type,
      title: titles[type],
      x: 100 + windows.length * 30,
      y: 50 + windows.length * 30,
      width: type === 'docs' ? 800 : type === 'wildwest' ? 900 : 700,
      height: type === 'wildwest' ? 600 : 500,
      zIndex: nextZIndex,
      minimized: false
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  return (

    <div className="flex w-screen h-screen overflow-hidden bg-black">
      
      {/* Left Panel - Agent Station (Modern Tech Theme) */}
      <div className="w-80 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-r border-blue-500 border-opacity-30 flex flex-col shadow-2xl z-50 relative">
        <div className="h-10 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center border-b border-blue-400">
          <span className="text-white font-bold tracking-widest text-sm">🤖 AGENT STATION</span>
        </div>
        <div id="agent-workbench-hook" className="flex-1 p-4 overflow-auto">
          {/* Hook for Agentic Seek */}
          <div className="border-2 border-dashed border-blue-500 border-opacity-30 rounded-lg h-full flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-blue-400 opacity-60">
              <div className="text-4xl mb-2">🕵️</div>
              <div className="font-mono text-sm">Agent Workbench</div>
              <div className="text-xs mt-2 opacity-70">Waiting for AgenticSeek...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Western OS */}
      <div className="flex-1 relative overflow-hidden font-sans text-white select-none"
           style={{
             background: 'url(https://images.unsplash.com/photo-1533106958148-daec8a8c1605?q=80&w=2540&auto=format&fit=crop) center/cover'
           }}>
      
      {/* Menu Bar */}
      <div className="h-8 bg-[#2c1810] border-b border-[#8b4513] flex items-center px-4 justify-between text-sm shadow-md text-[#f4e4bc] font-serif">
        <div className="flex gap-4 items-center">
          <span className="font-bold text-[#deb887]">🤠 WesternOS</span>
          <span className="hover:text-white cursor-pointer px-2 rounded hover:bg-[#8b4513]">Docs</span>
          <span className="hover:text-white cursor-pointer px-2 rounded hover:bg-[#8b4513]">Edit</span>
          <span className="hover:text-white cursor-pointer px-2 rounded hover:bg-[#8b4513]">View</span>
        </div>
        <div className="flex gap-4 items-center text-xs text-[#deb887]">
          <span>🔋</span>
          <span>📶</span>
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 left-4 flex flex-col gap-6 z-10">
        {[
          {name: 'Sheriff', icon: '⭐'},
          {name: 'Saloon', icon: '🍺'},
          {name: 'Stables', icon: '🐎'}
        ].map(item => (
          <div key={item.name} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-[#f4e4bc] hover:bg-opacity-20 cursor-pointer w-20 group transition-all">
            <div className="text-4xl filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">{item.icon}</div>
            <span className="text-xs text-center font-bold text-[#f4e4bc] bg-black bg-opacity-50 rounded px-1">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window key={win.id} window={win} onClose={() => closeWindow(win.id)} onFocus={() => focusWindow(win.id)} />
      ))}

      {/* Dock */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white bg-opacity-15 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl p-2 flex gap-2">
          {[
            { type: 'docs' as const, icon: '💼', name: 'Docs' },
            { type: 'wildwest' as const, icon: '🌵', name: 'Wild West' },
            { type: 'ledger' as const, icon: '📓', name: 'Ledger' },
            { type: 'telegraph' as const, icon: '📠', name: 'Telegraph' }
          ].map(app => (
            <div
              key={app.type}
              onClick={() => createWindow(app.type)}
              className="w-16 h-16 flex items-center justify-center text-4xl cursor-pointer hover:scale-110 hover:-translate-y-4 transition-all duration-300 relative group bg-[#8b4513] rounded-lg border-2 border-[#d2691e] shadow-lg"
              title={app.name}
            >
              <div className="drop-shadow-md transform group-hover:rotate-12 transition-transform duration-300">{app.icon}</div>
              <span className="absolute -top-10 bg-[#2c1810] text-[#f4e4bc] px-3 py-1 rounded border border-[#8b4513] text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-serif">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    
      </div> {/* End Right Panel */}
    </div>
  );
};
