import React, { memo } from "react";
import StyledTaskbar from "./StyledTaskbar";
import { useProcesses } from "../../../contexts/process";
import TaskbarEntry from "./TaskbarEntry";
import StartMenu from "./StartMenu";
import { AnimatePresence } from "framer-motion";

const Clock = () => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ color: '#fff', fontSize: '13px', padding: '0 15px', opacity: 0.9, fontWeight: 600 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    );
};

const Taskbar: React.FC = () => {
  const { processes = {} } = useProcesses() || {};
  const [showStart, setShowStart] = React.useState(false);

  return (
    <StyledTaskbar>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative' }}>
        <button 
          onClick={() => setShowStart(!showStart)}
          style={{ 
            background: showStart ? 'rgba(192, 57, 43, 0.4)' : 'none', 
            border: 'none', 
            color: '#fff', 
            fontSize: '18px', 
            cursor: 'pointer',
            padding: '0 15px',
            height: '100%',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
            🌵
        </button>
        
        <AnimatePresence>
          {showStart && <StartMenu onClose={() => setShowStart(false)} />}
        </AnimatePresence>

        <div style={{ display: 'flex', gap: '2px', marginLeft: '5px' }}>
          {Object.entries(processes).map(([id, process]) => (
            <TaskbarEntry key={id} id={id} icon={process.icon} title={process.title} />
          ))}
        </div>
      </div>
      <Clock />
    </StyledTaskbar>
  );
};

export default memo(Taskbar);
