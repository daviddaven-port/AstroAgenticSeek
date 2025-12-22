import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../contexts/fileSystem';
import { useProcesses } from '../contexts/process';
import { useSession } from '../contexts/session';
import Desktop from './system/Desktop';

const StyledWorkbench = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;

const AgentStation = styled.div`
  width: 320px;
  background: linear-gradient(to bottom, #0a0a0a, #1a1a1a);
  border-right: 1px solid #c0392b; /* Western Red */
  display: flex;
  flex-direction: column;
  z-index: 1000;

  .header {
    height: 44px;
    background: linear-gradient(to right, #c0392b, #e67e22); /* Red to Orange */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 1px;
    border-bottom: 2px solid #f1c40f; /* Gold accent */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }

  .status {
    padding: 16px;
    background: rgba(192, 57, 43, 0.05);
    border-bottom: 1px solid rgba(192, 57, 43, 0.1);
    
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .label { font-size: 11px; color: #e67e22; font-weight: 600; }
    .value { font-size: 11px; color: #22c55e; font-family: monospace; }
  }

  .workbench {
    flex: 1;
    padding: 16px;
    
    .drop-zone {
      border: 2px dashed #e67e22;
      border-radius: 8px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.6);
      position: relative;
      overflow: hidden;
      text-align: center;
      box-shadow: inset 0 0 20px rgba(192, 57, 43, 0.1);
      
      .icon { font-size: 48px; margin-bottom: 12px; }
      .text { font-family: 'Courier New', monospace; font-size: 14px; color: #e67e22; font-weight: bold; }
      .subtext { font-size: 12px; margin-top: 8px; color: #f1c40f; opacity: 0.8; }
    }
  }

  .controls {
      padding: 16px;
      button {
          width: 100%;
          background: #c0392b;
          border: 1px solid #f1c40f;
          color: #fff;
          font-size: 12px;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          &:hover { background: #e67e22; transform: translateY(-1px); }
      }
  }
`;

const SetupModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  .card {
    width: 400px;
    background: #1a1a1a;
    border: 1px solid #3b82f6;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 0 50px rgba(59, 130, 246, 0.2);

    h2 { color: #3b82f6; margin-bottom: 16px; font-size: 18px; }
    p { color: #888; font-size: 13px; margin-bottom: 20px; }
    
    .field {
        margin-bottom: 16px;
        label { color: #666; font-size: 11px; display: block; margin-bottom: 4px; }
        select, input {
            width: 100%;
            background: #000;
            border: 1px solid #333;
            color: #fff;
            padding: 10px;
            border-radius: 4px;
            font-size: 14px;
            outline: none;
            &:focus { border-color: #3b82f6; }
        }
    }

    button {
      width: 100%;
      background: #2563eb;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 8px;
      &:hover { background: #1d4ed8; }
    }
  }
`;

export const SimpleDesktop: React.FC = () => {
  const { fs } = useFileSystem() || {};
  const { open = () => {} } = useProcesses() || {};
  const { sessionLoaded = false } = useSession() || {};
  
  const [showSetup, setShowSetup] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash-exp');

  useEffect(() => {
    const savedKey = localStorage.getItem('agent_apiKey');
    if (!savedKey) {
      setShowSetup(true);
    } else {
      setApiKey(savedKey);
    }
  }, []);

  const saveApiConfig = () => {
    localStorage.setItem('agent_apiKey', apiKey);
    localStorage.setItem('agent_model', selectedModel);
    setShowSetup(false);
  };

  return (
    <StyledWorkbench>
      {showSetup && (
        <SetupModal>
          <div className="card">
            <h2>🤖 AGENT STATION SETUP</h2>
            <p>Connect your neural link to enable agentic capabilities in WesternOS.</p>
            
            <div className="field">
              <label>AI PROVIDER</label>
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                <option value="gemini-2.0-flash-exp">Google Gemini 2.0 Flash</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                <option value="gpt-4o">OpenAI GPT-4o</option>
              </select>
            </div>

            <div className="field">
              <label>API KEY</label>
              <input 
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <button onClick={saveApiConfig}>INITIALIZE AGENT STATION</button>
          </div>
        </SetupModal>
      )}

      {/* Left Panel - Agent Station (Modern) */}
      <AgentStation>
        <div className="header">🤖 AGENT STATION</div>
        <div className="status">
          <div className="row">
            <span className="label">SYSTEM STATUS</span>
            <span className="value">ONLINE</span>
          </div>
          <div className="row" style={{ marginTop: '4px' }}>
            <span className="label">NEURAL LINK</span>
            <span className="value" style={{ color: apiKey ? '#22c55e' : '#ef4444' }}>
              {apiKey ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </div>
        
        <div className="workbench">
          <div className="drop-zone">
            <div className="icon">🕵️</div>
            <div className="text text-sm">Agent Workbench</div>
            <div className="subtext">
                {fs ? "Western FS Synced" : "Waiting for FS..."}
            </div>
            {/* Visual pulse for the workbench area */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              opacity: 0.5
            }} />
          </div>
        </div>

        <div className="controls">
            <button onClick={() => setShowSetup(true)}>REFRESH NEURAL KEYS</button>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span style={{ color: '#444', fontSize: '10px' }}>WESTERN OS v2.0 - PORTED ENGINE</span>
            </div>
        </div>
      </AgentStation>

      {/* Right Panel - Full Western OS Desktop */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Desktop />
      </div>
    </StyledWorkbench>
  );
};

export default memo(SimpleDesktop);
