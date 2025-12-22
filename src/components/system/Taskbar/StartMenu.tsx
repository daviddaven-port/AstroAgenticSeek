import React, { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useProcesses } from "../../../contexts/process";

const StyledStartMenu = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 300px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px 8px 0 0;
  padding: 16px;
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.8);
  z-index: 1000;
  color: #fff;

  .header {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.accent};
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 12px;
  }

  .app-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .app-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: rgba(192, 57, 43, 0.2);
    }

    .icon {
      font-size: 20px;
    }

    .title {
      font-size: 14px;
    }
  }

  .footer {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;
  }
`;

type StartMenuProps = {
  onClose: () => void;
};

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { open = () => {} } = useProcesses() || {};

  const apps = [
    { id: 'Browser', icon: '🌐', title: 'Wild West Browser' },
    { id: 'Telegraph', icon: '📠', title: 'Telegraph' },
    { id: 'Docs', icon: '💼', title: 'Docs' },
    { id: 'Ledger', icon: '📓', title: 'Ledger' },
    { id: 'AIChat', icon: '🤖', title: 'AI Chat' },
  ];

  const handleOpen = (id: string) => {
    open(id, {});
    onClose();
  };

  return (
    <StyledStartMenu
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="header">
        <span>🌵</span> WESTERN OS v2.0
      </div>
      <div className="app-list">
        {apps.map(app => (
          <div key={app.id} className="app-item" onClick={() => handleOpen(app.id)}>
            <span className="icon">{app.icon}</span>
            <span className="title">{app.title}</span>
          </div>
        ))}
      </div>
      <div className="footer">
        Ride hard, code fast. 🐎
      </div>
    </StyledStartMenu>
  );
};

export default memo(StartMenu);
