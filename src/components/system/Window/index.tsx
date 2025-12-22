import React, { memo } from "react";
import { motion } from "framer-motion";
import StyledWindow from "./StyledWindow";
import Titlebar from "./Titlebar";
import useFocusable from "./useFocusable";
import { useProcesses } from "../../../contexts/process";
import RndWindow from "./RndWindow";
import useWindowTransitions from "./useWindowTransitions";

type WindowProps = {
  id: string;
  children?: React.ReactNode;
};

const Window: React.FC<WindowProps> = ({ id, children }) => {
  const { linkElement = () => {}, processes = {} } = useProcesses() || {};
  const process = processes[id];
  const { backgroundBlur, backgroundColor, hideTitlebar } = process || {};
  const { zIndex, isForeground, ...focusableProps } = useFocusable(id);
  const transitions = useWindowTransitions(id);

  return (
    <RndWindow id={id} zIndex={zIndex}>
      <motion.div
        {...transitions}
        ref={(el) => { if (el) linkElement(id, 'componentWindow', el); }}
        style={{ height: '100%', width: '100%' }}
      >
        <StyledWindow
          $backgroundBlur={backgroundBlur}
          $backgroundColor={backgroundColor}
          $isForeground={isForeground}
          {...focusableProps}
        >
          {!hideTitlebar && <Titlebar id={id} />}
          <div style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
              {children}
          </div>
        </StyledWindow>
      </motion.div>
    </RndWindow>
  );
};

export default memo(Window);
