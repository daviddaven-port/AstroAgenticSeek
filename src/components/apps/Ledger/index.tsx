import React, { useEffect, useRef } from "react";
import loader from "@monaco-editor/loader";
import styled from "styled-components";
import { useFileSystem } from "../../../contexts/fileSystem";
import { type ProcessComponentProps } from "../../../contexts/process/types";

const StyledLedger = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;

  .editor-container {
    flex: 1;
    overflow: hidden;
  }
`;

const Ledger: React.FC<ProcessComponentProps> = ({ id }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
  const { readFile, writeFile } = useFileSystem() || {};

  useEffect(() => {
    loader.init().then((monaco) => {
      if (editorRef.current) {
        monacoRef.current = monaco.editor.create(editorRef.current, {
          value: "// Welcome to WesternOS Ledger 📓\n// Write your thoughts or scripts here...\n",
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Courier New', Courier, monospace",
        });
      }
    });

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, []);

  return (
    <StyledLedger>
      <div className="editor-container" ref={editorRef} />
    </StyledLedger>
  );
};

export default Ledger;
