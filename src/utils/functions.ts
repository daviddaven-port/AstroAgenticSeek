import { basename, dirname, extname, join } from "path";
import { type DragPosition } from "contexts/session/types";
import { type Size } from "contexts/process/types";
import { type Processes, type RelativePosition } from "contexts/process/types";
import {
  type IconPosition,
  type IconPositions,
  type SortOrders,
} from "contexts/session/types";
import {
  DEFAULT_LOCALE,
  DESKTOP_PATH,
  ICON_CACHE,
  ICON_PATH,
  ICON_RES_MAP,
  MAX_ICON_SIZE,
  MAX_RES_ICON_OVERRIDE,
  MILLISECONDS_IN_SECOND,
  ONE_TIME_PASSIVE_EVENT,
  PREVENT_SCROLL,
  SHORTCUT_EXTENSION,
  SUPPORTED_ICON_SIZES,
  TASKBAR_HEIGHT,
  TIMESTAMP_DATE_FORMAT,
  USER_ICON_PATH,
} from "utils/constants";

export const bufferToBlob = (buffer: Buffer, type?: string): Blob =>
  new Blob([buffer as BlobPart], type ? { type } : undefined);

export const bufferToUrl = (buffer: Buffer, mimeType?: string): string =>
  mimeType === "image/svg+xml"
    ? `data:${mimeType};base64,${window.btoa(buffer.toString())}`
    : URL.createObjectURL(bufferToBlob(buffer, mimeType));

export const getDpi = (): number => {
  return Math.min(Math.ceil(window.devicePixelRatio), 3);
};

export const getExtension = (url: string): string => {
  let ext = extname(url);

  if (!ext) {
    const baseName = basename(url);

    if (baseName.startsWith(".")) ext = baseName;
  }

  return ext.toLowerCase();
};

export const sendMouseClick = (target: HTMLElement, count = 1): void => {
  if (count === 0) return;

  target.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  sendMouseClick(target, count - 1);
};

export const haltEvent = (
  event:
    | Event
    | React.DragEvent
    | React.FocusEvent
    | React.KeyboardEvent
    | React.MouseEvent
): void => {
  try {
    if (event?.cancelable) {
      event.preventDefault();
      event.stopPropagation();
    }
  } catch {
    // Ignore failured to halt event
  }
};

export const jsonFetch = async <T extends Record<string, unknown>>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  const json = (await response.json()) as T;

  return json || {};
};

export const pxToNum = (value: number | string = 0): number =>
  typeof value === "number" ? value : Number.parseFloat(value);

export const viewHeight = (): number => window.innerHeight;
export const viewWidth = (): number => window.innerWidth;

export const clsx = (classes: Record<string, boolean>): string =>
  Object.entries(classes)
    .filter(([, isActive]) => isActive)
    .map(([className]) => className)
    .join(" ");

export const label = (value: string): React.HTMLAttributes<HTMLElement> => ({
  "aria-label": value,
  title: value,
});

export const getMimeType = (url: string, ext?: string): string => {
  switch (ext ? ext.toLowerCase() : getExtension(url)) {
    case ".ani":
    case ".cur":
    case ".ico":
      return "image/vnd.microsoft.icon";
    case ".flac":
      return "audio/x-flac";
    case ".cache":
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".json":
      return "application/json";
    case ".html":
    case ".htm":
    case ".whtml":
      return "text/html";
    case ".m3u":
    case ".m3u8":
      return "application/x-mpegURL";
    case ".m4a":
      return "audio/m4a";
    case ".m4v":
    case ".mkv":
    case ".mov":
    case ".mp4":
      return "video/mp4";
    case ".mp3":
      return "audio/mpeg";
    case ".oga":
      return "audio/ogg";
    case ".ogg":
    case ".ogm":
    case ".ogv":
      return "video/ogg";
    case ".pdf":
      return "application/pdf";
    case ".png":
      return "image/png";
    case ".svg":
      return "image/svg+xml";
    case ".md":
    case ".txt":
      return "text/plain";
    case ".wav":
      return "audio/wav";
    case ".webm":
      return "video/webm";
    case ".webp":
      return "image/webp";
    case ".xml":
      return "application/xml";
    case ".jsdos":
    case ".pk3":
    case ".wsz":
    case ".zip":
      return "application/zip";
    default:
      return "";
  }
};

export const preloadLibs = (libs: string[] = []): void => {
  libs.forEach((lib) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = lib;
    
    switch (getExtension(lib)) {
      case ".css":
        link.as = "style";
        break;
      case ".js":
        link.as = "script";
        break;
      default:
        link.as = "fetch";
        break;
    }
    document.head.append(link);
  });
};
