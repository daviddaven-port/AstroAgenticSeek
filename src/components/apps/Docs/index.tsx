import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { useFileSystem } from '../../../contexts/fileSystem';
import { useProcesses } from '../../../contexts/process';


const StyledDocs = styled.div`
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #3e2723;

  .toolbar {
    padding: 8px;
    background: #fdf5e6;
    border-bottom: 1px solid #8b4513;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    .path {
      color: #8b4513;
      font-weight: bold;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 16px;
    padding: 16px;
    overflow-y: auto;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: rgba(139, 69, 19, 0.1);
    }

    .icon {
      font-size: 40px;
      margin-bottom: 4px;
    }

    .name {
      font-size: 12px;
      text-align: center;
      word-break: break-all;
    }
  }
`;

const Docs: React.FC = () => {
  const { fs } = useFileSystem() || {};
  const [items, setItems] = useState<string[]>([]);
  const [path, setPath] = useState('/home/user');

  useEffect(() => {
    if (fs) {
      fs.readdir(path, (err, files) => {
        if (!err && files) setItems(files);
        else setItems([]);
      });
    }
  }, [fs, path]);

  const { open } = useProcesses();

  const navigate = (item: string) => {
    const newPath = path === '/' ? `/${item}` : `${path}/${item}`;
    fs?.stat(newPath, (err, stats) => {
      if (err) return;
      if (stats?.isDirectory()) {
        setPath(newPath);
      } else {
        open('Ledger', { filePath: newPath });
      }
    });
  };


  const goBack = () => {
      setPath(path.substring(0, path.lastIndexOf('/')) || '/');
  };

  return (
    <StyledDocs>
      <div className="toolbar">
        <button onClick={goBack} disabled={path === '/'} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '16px' }}>🔙</button>
        <span>Trail: <span className="path">{path}</span></span>
      </div>
      <div className="grid">
        {items.map(item => (
          <div key={item} className="item" onDoubleClick={() => navigate(item)}>
            <div className="icon">{item.includes('.') ? '📄' : '📁'}</div>
            <div className="name">{item}</div>
          </div>
        ))}
      </div>
    </StyledDocs>
  );
};

export default memo(Docs);
