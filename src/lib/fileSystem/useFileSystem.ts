import { useEffect, useState } from 'react';
import * as BrowserFS from 'browserfs';
import getFSConfig from './FileSystemConfig';

/**
 * Hook to initialize and access the WesternOS File System
 */
export const useFileSystem = () => {
  const [fs, setFs] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent double initialization in dev mode
    if (ready) return;

    BrowserFS.configure(getFSConfig(), (err) => {
      if (err) {
        console.error('WesternOS: FileSystem initialization failed:', err);
        setError(err.message);
        return;
      }
      
      const bfs = BrowserFS.BFSRequire('fs');
      setFs(bfs);
      setReady(true);
      console.log('WesternOS: FileSystem ready 🤠');
    });
  }, [ready]);

  return { fs, ready, error };
};
