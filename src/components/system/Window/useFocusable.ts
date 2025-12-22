import { useCallback, useLayoutEffect, useMemo } from "react";
import { useProcesses } from "../../../contexts/process";
import { useSession } from "../../../contexts/session";

const useFocusable = (id: string) => {
  const {
    foregroundId = "",
    prependToStack = () => {},
    setForegroundId = () => {},
    stackOrder = [],
  } = useSession() || {};
  const {
    processes = {},
  } = useProcesses() || {};
  const process = processes[id];
  const {
    componentWindow,
    minimized = false,
  } = process || {};

  const zIndex = useMemo(
    () => stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1,
    [id, minimized, stackOrder]
  );

  const moveToFront = useCallback(() => {
    prependToStack(id);
    setForegroundId(id);
    if (componentWindow) componentWindow.focus();
  }, [componentWindow, id, prependToStack, setForegroundId]);

  useLayoutEffect(() => {
    if (id === foregroundId && componentWindow) {
      componentWindow.focus();
    }
  }, [foregroundId, id, componentWindow]);

  const isForeground = id === foregroundId;

  return {
    onBlurCapture: () => {}, // TODO
    onClickCapture: moveToFront,
    onFocusCapture: moveToFront,
    zIndex,
    tabIndex: -1,
    isForeground,
  };
};

export default useFocusable;
