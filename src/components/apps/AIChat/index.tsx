import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { useWindowAI } from "../../../hooks/useWindowAI";

const StyledAIChat = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.ui};

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;

    &.user {
      align-self: flex-end;
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }

    &.ai {
      align-self: flex-start;
      background: #333;
      color: #eee;
    }
  }

  .input-area {
    padding: 16px;
    background: #222;
    display: flex;
    gap: 8px;

    input {
      flex: 1;
      background: #111;
      border: 1px solid #444;
      border-radius: 4px;
      padding: 8px 12px;
      color: #fff;
      outline: none;

      &:focus {
        border-color: ${({ theme }) => theme.colors.secondary};
      }
    }

    button {
      background: ${({ theme }) => theme.colors.primary};
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      color: #fff;
      cursor: pointer;
      font-weight: bold;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

type Message = {
  role: "user" | "ai";
  content: string;
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Howdy partner! 🤠 I'm your WesternOS AI deputy. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    // Simple AI simulation for now
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", content: `I reckon you're asking about "${userMsg}". I'm still learnin' the ropes around here! 🐎` }]);
    }, 800);
  };

  return (
    <StyledAIChat>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Signal the deputy..."
          autoFocus 
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </StyledAIChat>
  );
};

export default memo(AIChat);
