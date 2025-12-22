import React, { memo } from "react";
import StyledTitlebar from "./StyledTitlebar";
import useWindowActions from "./useWindowActions";
import { useSession } from "../../../../contexts/session";
import { useProcesses } from "../../../../contexts/process";

type TitlebarProps = {
  id: string;
};

const CloseIcon = () => (
  <svg viewBox="0 0 12 12">
    <path d="M10.707,1.293a1,1,0,0,0-1.414,0L6,4.586,2.707,1.293A1,1,0,0,0,1.293,2.707L4.586,6,1.293,9.293a1,1,0,1,0,1.414,1.414L6,7.414l3.293,3.293a1,1,0,0,0,1.414-1.414L7.414,6l3.293-3.293A1,1,0,0,0,10.707,1.293Z" />
  </svg>
);

const MaximizeIcon = () => (
  <svg viewBox="0 0 12 12">
    <rect x="2" y="2" width="8" height="8" stroke="currentColor" fill="none" strokeWidth="1.2" />
  </svg>
);

const MaximizedIcon = () => (
  <svg viewBox="0 0 12 12">
    <rect x="3" y="1" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.2" />
    <path d="M2 4V10H8" stroke="currentColor" fill="none" strokeWidth="1.2" />
    <rect x="2" y="4" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="1.2" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 12 12">
    <line x1="2" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Titlebar: React.FC<TitlebarProps> = ({ id }) => {
  const { processes = {} } = useProcesses() || {};
  const process = processes[id];
  const { title, icon, maximized } = process || {};
  const { foregroundId = "" } = useSession() || {};
  const isForeground = id === foregroundId;
  const { onClose, onMaximize, onMinimize } = useWindowActions(id);

  return (
    <StyledTitlebar $foreground={isForeground}>
      <figure>
        {icon && (
          icon.startsWith('http') || icon.startsWith('/') || icon.includes('.') ? 
          <img src={icon} alt={title} /> : 
          <span style={{ fontSize: '14px', marginRight: '6px' }}>{icon}</span>
        )}
        <figcaption>{title}</figcaption>
      </figure>
      <nav>
        <button onClick={onMinimize} className="minimize" title="Minimize">
          <MinimizeIcon />
        </button>
        <button onClick={onMaximize} className="maximize" title={maximized ? "Restore" : "Maximize"}>
          {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
        </button>
        <button onClick={onClose} className="close" title="Close">
          <CloseIcon />
        </button>
      </nav>
    </StyledTitlebar>
  );
};

export default memo(Titlebar);
