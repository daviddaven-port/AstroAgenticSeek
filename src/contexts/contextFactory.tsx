import { createContext, memo, useContext } from "react";

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: React.ReactNode
): {
  Provider: React.FC<{ children: React.ReactNode }>;
  useContext: () => T;
} => {
  const Context = createContext(Object.create(null) as T);

  const Provider: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
    <Context.Provider value={useContextState()}>
      {children}
      {ContextComponent}
    </Context.Provider>
  ));

  return {
    Provider,
    useContext: () => useContext(Context),
  };
};

export default contextFactory;
