type Size = {
    height: number;
    width: number;
};

export type RelativePosition = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
};

type BaseProcessArguments = {
  allowResizing?: boolean;
  autoSizing?: boolean;
  backgroundBlur?: string;
  backgroundColor?: string;
  dependantLibs?: string[];
  hideMaximizeButton?: boolean;
  hideMinimizeButton?: boolean;
  hidePeek?: boolean;
  hideTaskbarEntry?: boolean;
  hideTitlebar?: boolean;
  hideTitlebarIcon?: boolean;
  initialRelativePosition?: RelativePosition;
  libs?: string[];
  lockAspectRatio?: boolean;
  peekImage?: string;
  url?: string;
};

export type ProcessArguments = BaseProcessArguments;

export type ProcessElements = {
  componentWindow?: HTMLElement;
  peekElement?: HTMLElement;
  taskbarEntry?: HTMLElement;
};

export type ProcessComponentProps = {
  id: string;
};

export type Process = ProcessArguments &
  ProcessElements & {
    Component: React.ComponentType<ProcessComponentProps>;
    closing?: boolean;
    defaultSize?: Size;
    dialogProcess?: boolean;
    hasWindow?: boolean;
    icon: string;
    maximized?: boolean;
    minimized?: boolean;
    preferProcessIcon?: boolean;
    singleton?: boolean;
    title: string;
  };

export type Processes = Record<string, Process>;
