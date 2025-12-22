import contextFactory from "../contextFactory";
import useMenuContextState from "./useMenuContextState";

const { Provider, useContext } = contextFactory(useMenuContextState);

export { Provider as MenuProvider, useContext as useMenu };
