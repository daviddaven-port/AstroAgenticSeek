import { Rnd } from "react-rnd";
import React, { memo, useCallback, useMemo, useRef } from "react";
import { useProcesses } from "../../../../contexts/process";
import { useSession } from "../../../../contexts/session";
import { DEFAULT_WINDOW_SIZE } from "../../../../utils/constants";

type RndWindowProps = {
  id: string;
  zIndex: number;
  children: React.ReactNode;
};

const RndWindow: React.FC<RndWindowProps> = ({ children, id, zIndex }) => {
  const {
    linkElement = () => {},
    processes = {},
  } = useProcesses() || {};
  const process = processes[id];
  const { maximized, minimized, defaultSize } = process || {};
  const { windowStates = {}, setWindowStates = () => {} } = useSession() || {};
  const { position, size } = windowStates[id] || {};

  const rndStyle = useMemo<React.CSSProperties>(
    () => ({
      display: minimized ? "none" : "block",
      zIndex,
    }),
    [minimized, zIndex]
  );

  const onDragStop = useCallback((_e: any, d: any) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position: { x: d.x, y: d.y },
      }
    }));
  }, [id, setWindowStates]);

  const onResizeStop = useCallback((_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        size: { width: ref.offsetWidth, height: ref.offsetHeight },
        position,
      }
    }));
  }, [id, setWindowStates]);

  const windowSize = maximized ? { width: '100%', height: 'calc(100% - 30px)' } : (size || defaultSize || DEFAULT_WINDOW_SIZE);
  const windowPosition = maximized ? { x: 0, y: 0 } : (position || { x: 50, y: 50 });

  return (
    <Rnd
      style={rndStyle}
      size={windowSize}
      position={windowPosition}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      disableDragging={maximized}
      enableResizing={!maximized}
      bounds="parent"
      dragHandleClassName="header" // Placeholder for titlebar drag
    >
      {children}
    </Rnd>
  );
};

export default memo(RndWindow);
