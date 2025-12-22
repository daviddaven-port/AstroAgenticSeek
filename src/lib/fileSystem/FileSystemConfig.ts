import { type FileSystemConfiguration } from "browserfs";

/**
 * FileSystem Configuration for WesternOS
 * 
 * We use an OverlayFS pattern:
 * - Readable: HTTPRequest (serves static files from /fs)
 * - Writable: IndexedDB (stores user files locally in browser)
 */
export const getFSConfig = (): FileSystemConfiguration => ({
  fs: "MountableFileSystem",
  options: {
    "/": {
      fs: "OverlayFS",
      options: {
        readable: {
          fs: "HTTPRequest",
          options: { 
            index: "/fs-index.json", // Index of files available via HTTP
            baseUrl: "/fs"           // Path to actual file assets
          }
        },
        writable: {
          fs: "IndexedDB",
          options: { 
            storeName: "westernos-fs-v1" 
          }
        }
      }
    }
  }
});

export default getFSConfig;
