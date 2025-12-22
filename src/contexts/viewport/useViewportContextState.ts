import { useCallback, useState } from "react";

const useViewportContextState = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((prev) => !prev);
  }, []);

  return {
    fullscreen,
    toggleFullscreen,
  };
};

export default useViewportContextState;
