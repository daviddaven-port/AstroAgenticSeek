import React, { useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../../contexts/fileSystem';

const StyledTelegraph = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  background: #000;
  color: ${({ theme }) => theme.colors.accent};
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  .history {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 1.4;

    div {
      margin-bottom: 2px;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }

  .input-area {
    display: flex;
    gap: 8px;
    border-top: 1px solid #333;
    padding-top: 8px;
    
    span {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      white-space: nowrap;
    }

    input {
      background: transparent;
      border: none;
      color: inherit;
      outline: none;
      flex: 1;
      font-family: inherit;
    }
  }
`;

const Telegraph: React.FC = () => {
  const { fs } = useFileSystem() || {};
  const [history, setHistory] = useState<string[]>(['📡 WESTERN OS TELEGRAPH v2.0', 'Type "help" for signals', '']);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/user');
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const execute = (cmdStr: string) => {
    if (!cmdStr.trim()) return;
    const parts = cmdStr.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const newHistory = [...history, `${cwd} $ ${cmdStr}`];

    const log = (msg: string) => {
      newHistory.push(msg);
      setHistory([...newHistory]);
    };

    switch (command) {
      case 'help':
        log('📜 Available signals: ls, cd, cat, mkdir, touch, clear, pwd');
        break;
      case 'ls':
        if (!fs) { log('FileSystem not ready'); return; }
        fs.readdir(cwd, (err, files) => {
          if (err || !files) log('❌ Error reading trail');
          else log(files.join('    '));
        });
        return;
      case 'cd':
        if (!fs) { log('FileSystem not ready'); return; }
        if (!args[0]) {
          setCwd('/home/user');
          setHistory([...newHistory]);
          return;
        }
        const target = args[0] === '..' 
          ? cwd.substring(0, cwd.lastIndexOf('/')) || '/' 
          : (args[0].startsWith('/') ? args[0] : (cwd === '/' ? `/${args[0]}` : `${cwd}/${args[0]}`));
        
        fs.stat(target, (err, stats) => {
          if (err || !stats?.isDirectory()) log('❌ No such trail');
          else setCwd(target);
        });
        return;
      case 'pwd':
        log(cwd);
        break;
      case 'cat':
        if (!fs) { log('FileSystem not ready'); return; }
        if (!args[0]) { log('Usage: cat [file]'); return; }
        fs.readFile(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`, { encoding: 'utf8' }, (err, data) => {
          if (err || typeof data !== 'string') log('❌ Could not read scroll');
          else log(data);
        });
        return;
      case 'mkdir':
        if (!fs) { log('FileSystem not ready'); return; }
        if (!args[0]) { log('Usage: mkdir [dir]'); return; }
        fs.mkdir(`${cwd}/${args[0]}`, (err) => {
          if (err) log('❌ Could not dig hole');
          else log(`✅ Created directory: ${args[0]}`);
        });
        return;
      case 'touch':
        if (!fs) { log('FileSystem not ready'); return; }
        if (!args[0]) { log('Usage: touch [file]'); return; }
        fs.writeFile(`${cwd}/${args[0]}`, '', (err) => {
          if (err) log('❌ Could not write note');
          else log(`✅ Created file: ${args[0]}`);
        });
        return;
      case 'clear':
        setHistory([]);
        return;
      default:
        log(`❓ Unknown signal: ${command}`);
    }
  };

  return (
    <StyledTelegraph>
      <div className="history">
        {history.map((line, i) => <div key={i}>{line}</div>)}
        <div ref={historyEndRef} />
      </div>
      <div className="input-area">
        <span>{cwd} $</span>
        <input 
          autoFocus 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              execute(input);
              setInput('');
            }
          }}
        />
      </div>
    </StyledTelegraph>
  );
};

export default memo(Telegraph);
