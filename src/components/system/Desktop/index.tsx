import React, { memo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useProcesses } from "../../../contexts/process";
import { useSession } from "../../../contexts/session";
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
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

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
      bottom: -25px;
      font-size: 10px;
      color: #fff;
      opacity: 0;
      transition: opacity 0.2s;
      background: rgba(0,0,0,0.8);
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    &:hover::after {
      opacity: 1;
    }
  }
`;

const Desktop: React.FC = () => {
  const { processes = {}, open } = useProcesses();
  const { wallpaperImage } = useSession() || {};

  const apps = [
    { id: 'Telegraph', icon: '📠', title: 'Telegraph' },
    { id: 'Docs', icon: '💼', title: 'Docs' },
    { id: 'Ledger', icon: '📓', title: 'Ledger' },
  ];

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
