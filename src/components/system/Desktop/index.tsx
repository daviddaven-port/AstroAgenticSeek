import React, { memo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useProcesses } from "../../../contexts/process";
import { useSession } from "../../../contexts/session";
import { useFileSystem } from "../../../contexts/fileSystem";

import { WestOSTheme } from "../../../styles/WestOS/theme";
import Taskbar from "../Taskbar";
import Window from "../Window";
import { AnimatePresence } from "framer-motion";

const StyledDesktop = styled.main`
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.ui};
  background-image: url('https://images.unsplash.com/photo-1533106958148-daec8a8c1605?q=80&w=2540&auto=format&fit=crop');
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    mix-blend-mode: soft-light;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
    z-index: 2;
  }
`;


const Dock = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #3e2723; /* Dark Wood */
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  gap: 20px;
  border: 2px solid #daa520; /* Gold border */
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0,0,0,0.8);

  &::before {
      content: "";
      position: absolute;
      inset: 2px;
      border: 1px solid rgba(218, 165, 32, 0.4);
      pointer-events: none;
  }


  .dock-item {
    font-size: 32px;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      transform: scale(1.4) translateY(-10px);
    }

    &::after {
      content: attr(data-title);
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      color: #daa520;
      opacity: 0;
      transition: opacity 0.2s;
      background: #1a130e;
      border: 1px solid #daa520;
      padding: 3px 8px;
      border-radius: 2px;
      white-space: nowrap;
      font-family: 'Rye', cursive;
    }

    &:hover::after {
      opacity: 1;
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #1a130e;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #daa520;
  font-family: 'Rye', cursive;

  .spinner {
    font-size: 48px;
    margin-bottom: 20px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;


const Desktop: React.FC = () => {
  const { processes = {}, open } = useProcesses();
  const { wallpaperImage } = useSession() || {};
  const { isLoaded: fsLoaded } = useFileSystem() || {};

  const apps = [
    { id: 'Telegraph', icon: '📠', title: 'Telegraph' },
    { id: 'Docs', icon: '💼', title: 'Docs' },
    { id: 'Ledger', icon: '📓', title: 'Ledger' },
    { id: 'AIChat', icon: '🤖', title: 'AI Assistant' },
  ];

  if (!fsLoaded) {
    return (
      <LoadingOverlay>
        <div className="spinner">⚙️</div>
        <div>MOUNTING THE TRAIL...</div>
      </LoadingOverlay>
    );
  }

  return (
    <ThemeProvider theme={WestOSTheme}>
      <StyledDesktop>
        <AnimatePresence>
          {Object.entries(processes).map(([id, process]) => (
            <Window key={id} id={id}>
              {process.Component ? (
                <process.Component id={id} />
              ) : (
                <div style={{ padding: '20px', color: 'red' }}>Failed to load {id}</div>
              )}
            </Window>
          ))}
        </AnimatePresence>
        
        <Dock>
          {apps.map(app => (
            <div 
              key={app.id} 
              className="dock-item" 
              onClick={() => open(app.id, {})} 
              data-title={app.title}
            >
              {app.icon}
            </div>
          ))}
        </Dock>

        <Taskbar />
      </StyledDesktop>
    </ThemeProvider>
  );
};

export default memo(Desktop);
