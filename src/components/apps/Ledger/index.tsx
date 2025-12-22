import React, { useEffect, useRef } from "react";
import loader from "@monaco-editor/loader";
import styled from "styled-components";
import { useFileSystem } from "../../../contexts/fileSystem";
import { type ProcessComponentProps } from "../../../contexts/process/types";
import { useProcesses } from "../../../contexts/process";


const StyledLedger = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  color: #f4e4bc;

  .tabs {
    display: flex;
    background: #2c1810;
    border-bottom: 2px solid #5c4033;
    
    button {
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: #a68d71;
      cursor: pointer;
      font-family: 'Rye', cursive;
      font-size: 14px;
      
      &.active {
        color: #daa520;
        background: #3e2723;
        border-bottom: 2px solid #daa520;
      }

      &:hover:not(.active) {
        background: rgba(255,255,255,0.05);
      }
    }
  }

  .content {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .editor-container {
    height: 100%;
    width: 100%;
  }

  .dashboard {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    font-family: 'Inter', sans-serif;

    h2 {
      color: #daa520;
      margin-top: 0;
    }

    .stat-card {
      background: #3e2723;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #5c4033;
      margin-bottom: 15px;

      .label {
        color: #a68d71;
        font-size: 12px;
        text-transform: uppercase;
      }

      .value {
        font-size: 24px;
        font-weight: bold;
        color: #f4e4bc;
      }
    }
  }
`;

const Ledger: React.FC<ProcessComponentProps> = ({ id }) => {
  const [activeTab, setActiveTab] = React.useState<'journal' | 'dashboard'>('journal');
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);
  const { processes } = useProcesses();
  const { readFile, writeFile } = useFileSystem() || {};
  const { filePath } = processes[id] || {};

  useEffect(() => {
    if (activeTab === 'journal') {
      loader.init().then((monaco) => {
        if (!editorRef.current) return;

        const editor = monaco.editor.create(editorRef.current, {
          value: "// Welcome to WesternOS Ledger 📓\n// Opening trail...",
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Courier New', Courier, monospace",
        });
        monacoRef.current = editor;

        if (filePath && readFile) {
          readFile(filePath, { encoding: "utf8" }, (err, data) => {
            if (!err && typeof data === "string") {
              editor.setValue(data);
              const ext = filePath.split(".").pop();
              const langMap: Record<string, string> = {
                js: "javascript",
                ts: "typescript",
                json: "json",
                html: "html",
                css: "css",
                md: "markdown",
                txt: "plaintext",
              };
              if (ext && langMap[ext]) {
                monaco.editor.setModelLanguage(editor.getModel(), langMap[ext]);
              }
            } else {
              editor.setValue(`// ❌ Error: Could not read scroll at ${filePath}`);
            }
          });
        } else {
          editor.setValue(
            "// Welcome to WesternOS Ledger 📓\n// Write your thoughts or scripts here...\n"
          );
        }
      });
    }

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, [activeTab, filePath, readFile]);

  return (
    <StyledLedger>
      <div className="tabs">
        <button 
          className={activeTab === 'journal' ? 'active' : ''} 
          onClick={() => setActiveTab('journal')}
        >
          JOURNAL
        </button>
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          DASHBOARD
        </button>
      </div>
      <div className="content">
        {activeTab === 'journal' ? (
          <div className="editor-container" ref={editorRef} />
        ) : (
          <div className="dashboard">
            <h2>Frontier Status</h2>
            <div className="stat-card">
              <div className="label">System State</div>
              <div className="value">Operational</div>
            </div>
            <div className="stat-card">
              <div className="label">Virtual Nodes</div>
              <div className="value">Active</div>
            </div>
            <div className="stat-card">
              <div className="label">Mounted Trails</div>
              <div className="value">5 Directories</div>
            </div>
          </div>
        )}
      </div>
    </StyledLedger>
  );
};


export default Ledger;
