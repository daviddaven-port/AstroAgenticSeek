import { type Position } from "react-rnd";

export type UpdateFiles = (newFile?: string, oldFile?: string) => Promise<void>;

export type WindowState = {
  position?: Position;
  size?: { height: number; width: number };
};

export type WindowStates = Record<string, WindowState>;

export type WallpaperFit = "center" | "fill" | "fit" | "stretch" | "tile";

export type IconPosition = {
  gridColumnStart: number;
  gridRowStart: number;
};

export type IconPositions = Record<string, IconPosition>;

export type SessionData = {
  aiEnabled: boolean;
  clockSource: "local" | "ntp";
  cursor: string | undefined;
  iconPositions: IconPositions;
  recentFiles: [string, string, string][];
  runHistory: string[];
  sortOrders: Record<string, [string[], any?, boolean?]>;
  themeName: string;
  views: Record<string, string>;
  wallpaperFit: WallpaperFit;
  wallpaperImage: string;
  windowStates: WindowStates;
  stackOrder: string[];
  openedProcesses: Record<string, any>;
};


export type SessionContextState = SessionData & {
  foregroundId: string;
  prependToStack: (id: string) => void;
  removeFromStack: (id: string) => void;
  sessionLoaded: boolean;
  setAiEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setClockSource: React.Dispatch<React.SetStateAction<"local" | "ntp">>;
  setCursor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setForegroundId: React.Dispatch<React.SetStateAction<string>>;
  setHaltSession: React.Dispatch<React.SetStateAction<boolean>>;
  setIconPositions: React.Dispatch<React.SetStateAction<IconPositions>>;
  setRunHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setSortOrder: (
    directory: string,
    order: string[] | ((currentSortOrder: string[]) => string[]),
    sortBy?: any,
    ascending?: boolean
  ) => void;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setViews: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setWallpaper: (image: string, fit?: WallpaperFit) => void;
  setWindowStates: React.Dispatch<React.SetStateAction<WindowStates>>;
  setOpenedProcesses: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  stackOrder: string[];

  updateRecentFiles: (url: string, pid: string, title?: string) => void;
};

export type DragPosition = {
  x: number;
  y: number;
};
