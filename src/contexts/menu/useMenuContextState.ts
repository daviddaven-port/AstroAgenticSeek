import { useCallback, useState } from "react";

const useMenuContextState = () => {
  const [menu, setMenu] = useState<any>(Object.create(null));

  const contextMenu = useCallback((items: any) => {
    // Basic implementation for context menu state
    setMenu(items);
  }, []);

  return {
    contextMenu,
    menu,
  };
};

export default useMenuContextState;
