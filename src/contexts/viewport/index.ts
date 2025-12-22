import contextFactory from "../contextFactory";
import useViewportContextState from "./useViewportContextState";

const { Provider, useContext } = contextFactory(useViewportContextState);

export { Provider as ViewportProvider, useContext as useViewport };
