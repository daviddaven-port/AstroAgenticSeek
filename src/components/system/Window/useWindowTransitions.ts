import { useMemo } from "react";
import { type Variants } from "framer-motion";
import { useProcesses } from "../../../contexts/process";
import { TRANSITIONS_IN_SECONDS } from "../../../utils/constants";

const useWindowTransitions = (id: string) => {
  const { processes = {} } = useProcesses();
  const process = processes[id];
  const { minimized = false, maximized = false } = process || {};

  const variants: Variants = useMemo(() => ({
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    active: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: TRANSITIONS_IN_SECONDS.WINDOW,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: TRANSITIONS_IN_SECONDS.WINDOW,
        ease: "easeIn",
      },
    },
  }), []);

  return {
    variants,
    initial: "initial",
    animate: minimized ? "initial" : "active",
    exit: "exit",
  };
};

export default useWindowTransitions;
