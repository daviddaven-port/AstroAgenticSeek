import { type FSroot } from "contexts/fileSystem/useAsyncFs";

export type FileSystemContextState = {
  fs: FSModule | undefined;
  rootFs: RootFileSystem | undefined;
  exists: (path: string) => Promise<boolean>;
  lstat: (path: string) => Promise<any>;
  mkdir: (path: string, overwrite?: boolean) => Promise<boolean>;
  readFile: (path: string) => Promise<Buffer>;
  readdir: (path: string) => Promise<string[]>;
  rename: (oldPath: string, newPath: string) => Promise<boolean>;
  rmdir: (path: string) => Promise<boolean>;
  stat: (path: string) => Promise<any>;
  unlink: (path: string) => Promise<boolean>;
  writeFile: (
    path: string,
    data: Buffer | string,
    overwrite?: boolean
  ) => Promise<boolean>;
};
