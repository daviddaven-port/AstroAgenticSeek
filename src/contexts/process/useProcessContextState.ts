import { useCallback, useState, useEffect } from "react";
import { useSession } from "../session";
import {
  closeProcess,
  maximizeProcess,
  minimizeProcess,
  openProcess,
  setProcessArgument,
  setProcessElement,
} from "./functions";
import {
  type ProcessArguments,
  type ProcessElements,
  type Processes,
} from "./types";

const useProcessContextState = () => {
  const [processes, setProcesses] = useState<Processes>(Object.create(null));
  const { openedProcesses, setOpenedProcesses, sessionLoaded } = useSession() || {};

  // Initialize from session
  useEffect(() => {
    if (sessionLoaded && openedProcesses && Object.keys(processes).length === 0) {
      Object.entries(openedProcesses).forEach(([id, info]: [string, any]) => {
          setProcesses((currentProcesses) => openProcess(info.processId, info.args, info.icon)(currentProcesses));
      });
    }
  }, [sessionLoaded, openedProcesses]);

  const close = useCallback(
    (id: string, closing?: boolean) => {
      setProcesses(closeProcess(id, closing));
      if (!closing && setOpenedProcesses) {
        setOpenedProcesses((prev) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [setOpenedProcesses]
  );

  const maximize = useCallback(
    (id: string) => setProcesses(maximizeProcess(id)),
    []
  );

  const minimize = useCallback(
    (id: string) => setProcesses(minimizeProcess(id)),
    []
  );

  const open = useCallback(
    (id: string, args: ProcessArguments, icon?: string) => {
      setProcesses((current) => {
          const next = openProcess(id, args, icon)(current);
          // Find the new PID created (could be id or id__1 etc)
          const newPid = Object.keys(next).find(pid => !current[pid]);
          if (newPid && setOpenedProcesses) {
              setOpenedProcesses(prev => ({
                  ...prev,
                  [newPid]: { processId: id, args, icon }
              }));
          }
          return next;
      });
    },
    [setOpenedProcesses]
  );

  const argument = useCallback(
    (
      id: string,
      name: keyof ProcessArguments,
      value: ProcessArguments[keyof ProcessArguments]
    ) => {
        setProcesses(setProcessArgument(id, name, value));
        if (setOpenedProcesses) {
            setOpenedProcesses(prev => {
                if (!prev[id]) return prev;
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        args: {
                            ...prev[id].args,
                            [name]: value
                        }
                    }
                };
            });
        }
    },
    [setOpenedProcesses]
  );

  const linkElement = useCallback(
    (id: string, name: keyof ProcessElements, element: HTMLElement) =>
      setProcesses(setProcessElement(id, name, element)),
    []
  );

  return {
    argument,
    close,
    linkElement,
    maximize,
    minimize,
    open,
    processes,
  };
};

export default useProcessContextState;
