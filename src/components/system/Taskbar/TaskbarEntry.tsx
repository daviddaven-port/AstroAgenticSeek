import React, { memo } from "react";
import styled from "styled-components";
import { useProcesses } from "../../../contexts/process";
import { useSession } from "../../../contexts/session";

type TaskbarEntryProps = {
  id: string;
  icon: string;
  title: string;
};

import { motion, AnimatePresence } from "framer-motion";

const StyledTaskbarEntry = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? "rgba(255, 255, 255, 0.15)" : "transparent")};
  border: none;
  border-bottom: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : "transparent")};
  color: #fff;
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: 100%;
  padding: 0 12px;
  transition: background-color 0.2s ease;
  max-width: 160px;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  img {
    height: 16px;
    width: 16px;
  }

  span {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const PeekContainer = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 2000;
  min-width: 120px;
  text-align: center;

  .peek-title {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #fff;
  }

  .peek-preview {
    font-size: 24px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    padding: 12px;
  }
`;

const TaskbarEntry: React.FC<TaskbarEntryProps> = ({ id, icon, title }) => {
  const { linkElement, minimize } = useProcesses() || {};
  const { foregroundId = "", setForegroundId = () => {} } = useSession() || {};
  const [isHovered, setIsHovered] = React.useState(false);
  const isActive = id === foregroundId;

  const onClick = () => {
    if (isActive) {
      minimize(id);
    } else {
      setForegroundId(id);
    }
  };

  return (
    <StyledTaskbarEntry 
      $isActive={isActive} 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title}
    >
      {icon && (
        icon.startsWith('http') || icon.startsWith('/') || icon.includes('.') ? 
        <img src={icon} alt={title} /> : 
        <span style={{ fontSize: '18px' }}>{icon}</span>
      )}
      <span>{title}</span>

      <AnimatePresence>
        {isHovered && (
          <PeekContainer
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            ref={(el) => { if (el) linkElement(id, 'peekElement', el); }}
          >
            <div className="peek-title">{title}</div>
            <div className="peek-preview">{icon || '🪟'}</div>
          </PeekContainer>
        )}
      </AnimatePresence>
    </StyledTaskbarEntry>
  );
};

export default memo(TaskbarEntry);
