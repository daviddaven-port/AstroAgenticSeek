import { useEffect, useState, useCallback } from "react";
import {
  type SessionContextState,
  type SessionData,
  type WindowStates,
} from "./types";
import {
  DEFAULT_THEME,
  DEFAULT_WALLPAPER,
  DEFAULT_WALLPAPER_FIT,
  SESSION_FILE,
} from "../../utils/constants";
import { useFileSystem } from "../fileSystem";

const useSessionContextState = (): SessionContextState => {
  const { exists, readFile, writeFile } = useFileSystem();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [windowStates, setWindowStates] = useState<WindowStates>({});
  const [themeName, setThemeName] = useState(DEFAULT_THEME);
  const [wallpaperImage, setWallpaperImage] = useState(DEFAULT_WALLPAPER);
  const [wallpaperFit, setWallpaperFit] = useState<WallpaperFit>(DEFAULT_WALLPAPER_FIT as WallpaperFit);
  const [stackOrder, setStackOrder] = useState<string[]>([]);
  const [foregroundId, setForegroundId] = useState("");

  const prependToStack = useCallback((id: string) => {
    setStackOrder((currentStackOrder) => [
      id,
      ...currentStackOrder.filter((stackId) => stackId !== id),
    ]);
  }, []);

  const removeFromStack = useCallback((id: string) => {
    setStackOrder((currentStackOrder) =>
      currentStackOrder.filter((stackId) => stackId !== id)
    );
  }, []);

  useEffect(() => {
    if (!sessionLoaded && exists) {
      exists(SESSION_FILE).then((hasSession) => {
        if (hasSession) {
          readFile(SESSION_FILE).then((data) => {
            try {
              const session = JSON.parse(data.toString()) as SessionData;
              if (session.windowStates) setWindowStates(session.windowStates);
              if (session.themeName) setThemeName(session.themeName);
              if (session.wallpaperImage) setWallpaperImage(session.wallpaperImage);
              setSessionLoaded(true);
            } catch {
              setSessionLoaded(true);
            }
          });
        } else {
          setSessionLoaded(true);
        }
      });
    }
  }, [exists, readFile, sessionLoaded]);

  useEffect(() => {
    if (sessionLoaded && writeFile) {
      writeFile(
        SESSION_FILE,
        JSON.stringify({
          windowStates,
          themeName,
          wallpaperImage,
          wallpaperFit,
        }),
        true
      );
    }
  }, [sessionLoaded, windowStates, themeName, wallpaperImage, wallpaperFit, writeFile]);

  return {
    foregroundId,
    prependToStack,
    removeFromStack,
    sessionLoaded,
    setForegroundId,
    setThemeName,
    setWallpaper: (image, fit) => {
      setWallpaperImage(image);
      if (fit) setWallpaperFit(fit);
    },
    setWindowStates,
    stackOrder,
    themeName,
    wallpaperFit: wallpaperFit as WallpaperFit,
    wallpaperImage: wallpaperImage as string,
    // Add missing pieces with defaults for now
    aiEnabled: false,
    clockSource: "local",
    cursor: undefined,
    iconPositions: {},
    recentFiles: [],
    runHistory: [],
    sortOrders: {},
    views: {},
    setAiEnabled: () => {},
    setClockSource: () => {},
    setCursor: () => {},
    setHaltSession: () => {},
    setIconPositions: () => {},
    setRunHistory: () => {},
    setSortOrder: () => {},
    setViews: () => {},
    updateRecentFiles: () => {},
  };
};

export default useSessionContextState;
