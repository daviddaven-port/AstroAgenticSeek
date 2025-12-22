import React, { useState, memo } from "react";
import styled from "styled-components";
import { IFRAME_CONFIG } from "../../../utils/constants";

const StyledBrowser = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;

  .address-bar {
    padding: 6px 12px;
    background: #f1f3f4;
    display: flex;
    gap: 8px;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .nav-buttons {
      display: flex;
      gap: 4px;
      
      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        &:hover { opacity: 0.7; }
      }
    }

    input {
      flex: 1;
      padding: 4px 12px;
      border-radius: 16px;
      border: 1px solid #ddd;
      font-size: 13px;
      outline: none;
      
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  iframe {
    flex: 1;
    border: none;
    background: #fff;
  }
`;

const Browser: React.FC = () => {
  const [url, setUrl] = useState("https://www.google.com/search?igu=1");
  const [input, setInput] = useState(url);

  const navigate = () => {
    let target = input;
    if (!target.startsWith("http")) target = "https://" + target;
    setUrl(target);
  };

  return (
    <StyledBrowser>
      <div className="address-bar">
        <div className="nav-buttons">
          <button title="Back">⬅️</button>
          <button title="Forward">➡️</button>
          <button title="Reload" onClick={() => { const tmp = url; setUrl(''); setTimeout(() => setUrl(tmp), 10); }}>🔄</button>
        </div>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate()}
          placeholder="Enter address or search trail..."
        />
      </div>
      {url && (
        <iframe 
          src={url} 
          title="Wild West Browser"
          {...IFRAME_CONFIG}
        />
      )}
    </StyledBrowser>
  );
};

export default memo(Browser);
