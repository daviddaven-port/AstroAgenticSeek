import { useCallback } from "react";
import { useProcesses } from "../../../../contexts/process";

const useWindowActions = (id: string) => {
  const { close = () => {}, maximize = () => {}, minimize = () => {} } = useProcesses() || {};

  const onClose = useCallback(() => close(id), [close, id]);
  const onMaximize = useCallback(() => maximize(id), [maximize, id]);
  const onMinimize = useCallback(() => minimize(id), [minimize, id]);

  return { onClose, onMaximize, onMinimize };
};

export default useWindowActions;
