import { useEffect, useMemo, useRef, useState } from "react";
import * as BrowserFS from "browserfs";
import { type FSModule } from "browserfs/dist/node/core/FS";
import Stats from "browserfs/dist/node/core/node_fs_stats";

export type AsyncFS = {
  exists: (path: string) => Promise<boolean>;
  lstat: (path: string) => Promise<Stats>;
  mkdir: (path: string, overwrite?: boolean) => Promise<boolean>;
  readFile: (path: string) => Promise<Buffer>;
  readdir: (path: string) => Promise<string[]>;
  rename: (oldPath: string, newPath: string) => Promise<boolean>;
  rmdir: (path: string) => Promise<boolean>;
  stat: (path: string) => Promise<Stats>;
  unlink: (path: string) => Promise<boolean>;
  writeFile: (
    path: string,
    data: Buffer | string,
    overwrite?: boolean
  ) => Promise<boolean>;
};

const useAsyncFs = (): AsyncFS & { fs?: FSModule } => {
  const [fs, setFs] = useState<FSModule>();
  const fsRef = useRef<FSModule>(undefined);

  const asyncFs: AsyncFS = useMemo(
    () => ({
      exists: (path) =>
        new Promise((resolve) => {
          fs?.exists(path, resolve);
        }),
      lstat: (path) =>
        new Promise((resolve, reject) => {
          fs?.lstat(path, (error, stats) =>
            error ? reject(error) : resolve(stats!)
          );
        }),
      mkdir: (path, overwrite = false) =>
        new Promise((resolve, reject) => {
          fs?.mkdir(path, { flag: overwrite ? "w" : "wx" }, (error) =>
            error ? reject(error) : resolve(true)
          );
        }),
      readFile: (path) =>
        new Promise((resolve, reject) => {
          fs?.readFile(path, (error, data) =>
            error ? reject(error) : resolve(data!)
          );
        }),
      readdir: (path) =>
        new Promise((resolve, reject) => {
          fs?.readdir(path, (error, data) =>
            error ? reject(error) : resolve(data!)
          );
        }),
      rename: (oldPath, newPath) =>
        new Promise((resolve, reject) => {
          fs?.rename(oldPath, newPath, (error) =>
            error ? reject(error) : resolve(true)
          );
        }),
      rmdir: (path) =>
        new Promise((resolve, reject) => {
          fs?.rmdir(path, (error) => (error ? reject(error) : resolve(true)));
        }),
      stat: (path) =>
        new Promise((resolve, reject) => {
          fs?.stat(path, (error, stats) =>
            error ? reject(error) : resolve(stats!)
          );
        }),
      unlink: (path) =>
        new Promise((resolve, reject) => {
          fs?.unlink(path, (error) => (error ? reject(error) : resolve(true)));
        }),
      writeFile: (path, data, overwrite = false) =>
        new Promise((resolve, reject) => {
          fs?.writeFile(
            path,
            data,
            { flag: overwrite ? "w" : "wx" },
            (error) => (error ? reject(error) : resolve(true))
          );
        }),
    }),
    [fs]
  );

  useEffect(() => {
    if (!fs) {
      BrowserFS.configure(
        {
          fs: "MountableFileSystem",
          options: {
            "/": {
              fs: "OverlayFS",
              options: {
                readable: {
                  fs: "HTTPRequest",
                  options: { index: "/fs-index.json", baseUrl: "/fs" },
                },
                writable: { fs: "IndexedDB", options: { storeName: "western-os-fs" } },
              },
            },
          },
        },
        () => {
          const loadedFs = BrowserFS.BFSRequire("fs");
          fsRef.current = loadedFs;
          setFs(loadedFs);
        }
      );
    }
  }, [fs]);

  return { ...asyncFs, fs };
};

export default useAsyncFs;
