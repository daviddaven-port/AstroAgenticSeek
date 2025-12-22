import { useCallback, useState } from "react";
import {
  closeProcess,
  maximizeProcess,
  minimizeProcess,
  openProcess,
  setIcon,
  setProcessArgument,
  setProcessElement,
  setTitle,
  setUrl,
} from "./functions";
import {
  type ProcessArguments,
  type ProcessElements,
  type Processes,
} from "./types";

const useProcessContextState = () => {
  const [processes, setProcesses] = useState<Processes>(Object.create(null));

  const close = useCallback(
    (id: string, closing?: boolean) => setProcesses(closeProcess(id, closing)),
    []
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
    (id: string, args: ProcessArguments, icon?: string) =>
      setProcesses(openProcess(id, args, icon)),
    []
  );

  const argument = useCallback(
    (
      id: string,
      name: keyof ProcessArguments,
      value: ProcessArguments[keyof ProcessArguments]
    ) => setProcesses(setProcessArgument(id, name, value)),
    []
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
