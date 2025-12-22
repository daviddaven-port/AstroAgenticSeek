import React from "react";
import { FileSystemProvider } from "./fileSystem";
import { MenuProvider } from "./menu";
import { ProcessProvider } from "./process";
import { SessionProvider } from "./session";
import { ViewportProvider } from "./viewport";

const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FileSystemProvider>
    <SessionProvider>
      <ViewportProvider>
        <ProcessProvider>
          <MenuProvider>{children}</MenuProvider>
        </ProcessProvider>
      </ViewportProvider>
    </SessionProvider>
  </FileSystemProvider>
);

export default OSProvider;
