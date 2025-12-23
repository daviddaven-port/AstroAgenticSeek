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
  width: 380px;
  background: #2c1810; /* Dark Leather */
  border-right: 3px solid #5c4033; /* Ironside Brown */
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 10px 0 30px rgba(0,0,0,0.5);

  .header {
    height: 60px;
    background: #3e2723;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #daa520; /* Vintage Gold */
    font-family: 'Rye', cursive;
    font-weight: normal;
    font-size: 22px;
    letter-spacing: 2px;
    border-bottom: 3px solid #daa520;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
  }

  .status {
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid #5c4033;
    
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .label { font-size: 11px; color: #a68d71; font-family: 'Rye', cursive; text-transform: uppercase; }
    .value { font-size: 14px; color: #f4e4bc; font-family: 'Fira Code', monospace; }
  }

  .workbench {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .drop-zone {
      border: 3px solid #5c4033;
      background: #1a130e;
      border-radius: 4px;
      height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      text-align: center;
      box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
      
      .icon { font-size: 64px; margin-bottom: 16px; filter: drop-shadow(0 0 10px rgba(218, 165, 32, 0.3)); z-index: 2; }
      .text { font-family: 'Rye', cursive; font-size: 18px; color: #daa520; z-index: 2; }
      .subtext { font-size: 12px; margin-top: 10px; color: #a68d71; font-family: 'Inter', sans-serif; z-index: 2; }

      .pulse {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(218, 165, 32, 0.15) 0%, transparent 70%);
          animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    }

    .quick-tools {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        
        .tool-card {
            background: #3e2723;
            border: 1px solid #5c4033;
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: all 0.2s;
            
            &:hover {
                background: #5c4033;
                border-color: #daa520;
                transform: translateX(4px);
            }

            .tool-icon { font-size: 20px; }
            .tool-label { font-size: 11px; color: #f4e4bc; font-family: 'Rye', cursive; }
        }
    }
  }

  .controls {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      button {
          width: 100%;
          background: #8b4513; /* Saddle Brown */
          border: 2px solid #daa520;
          color: #f4e4bc;
          font-family: 'Rye', cursive;
          font-size: 14px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 0px #5c4033;
          
          &:hover { 
            background: #a0522d; 
            transform: translateY(-2px);
            box-shadow: 0 6px 0px #5c4033;
          }
          
          &:active {
            transform: translateY(2px);
            box-shadow: 0 2px 0px #5c4033;
          }

          &.secondary {
            background: #3e2723;
            border-color: #5c4033;
          }
      }
  }

  @keyframes pulse-ring {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
`;

const SetupModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);

  .card {
    width: 440px;
    background: #2c1810;
    border: 3px solid #daa520;
    border-radius: 4px;
    padding: 32px;
    box-shadow: 0 0 100px rgba(0,0,0,1);
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 4px;
        border: 1px solid rgba(218, 165, 32, 0.3);
        pointer-events: none;
    }

    h2 { 
      color: #daa520; 
      margin-bottom: 20px; 
      font-size: 24px; 
      font-family: 'Rye', cursive;
      text-align: center;
      text-shadow: 2px 2px 0px #000;
    }
    
    p { 
      color: #a68d71; 
      font-size: 14px; 
      margin-bottom: 24px; 
      text-align: center;
      line-height: 1.5;
    }
    
    .field {
        margin-bottom: 20px;
        label { color: #daa520; font-size: 11px; display: block; margin-bottom: 6px; font-family: 'Rye', cursive; letter-spacing: 1px; }
        select, input {
            width: 100%;
            background: #1a130e;
            border: 2px solid #5c4033;
            color: #f4e4bc;
            padding: 12px;
            border-radius: 0;
            font-size: 14px;
            outline: none;
            font-family: 'Fira Code', monospace;
            &:focus { border-color: #daa520; }
        }
    }

    button {
      width: 100%;
      background: #8b4513;
      color: #f4e4bc;
      border: 2px solid #daa520;
      padding: 14px;
      font-family: 'Rye', cursive;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
      transition: all 0.3s;
      
      &:hover { background: #a0522d; transform: scale(1.02); }
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
            <div className="text">Agent Workbench</div>
            <div className="subtext">
                {fs ? "Western FS Synced" : "Waiting for FS..."}
            </div>
            <div className="pulse" />
          </div>

          <div className="quick-tools">
              <div className="tool-card" onClick={() => open('Telegraph', {})}>
                  <span className="tool-icon">📟</span>
                  <span className="tool-label">CONSOLE</span>
              </div>
              <div className="tool-card" onClick={() => open('Docs', {})}>
                  <span className="tool-icon">📂</span>
                  <span className="tool-label">FILES</span>
              </div>
              <div className="tool-card" onClick={() => open('Ledger', {})}>
                  <span className="tool-icon">📔</span>
                  <span className="tool-label">LEDGER</span>
              </div>
              <div className="tool-card" onClick={() => open('AIChat', {})}>
                  <span className="tool-icon">🧠</span>
                  <span className="tool-label">NEURAL</span>
              </div>
          </div>
        </div>

        <div className="controls">
            <button onClick={() => open('Telegraph', {})}>SEND TELEGRAPH SIGNAL</button>
            <button className="secondary" onClick={() => setShowSetup(true)}>REFRESH NEURAL KEYS</button>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span style={{ color: '#5c4033', fontSize: '10px', fontFamily: 'Rye' }}>WESTERN OS v2.1 - FRONTIER ENGINE</span>
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
