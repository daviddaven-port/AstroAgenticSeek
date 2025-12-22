import React, { useState, useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { useWindowAI } from "../../../hooks/useWindowAI";

const StyledAIChat = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #1a130e;
  color: #f4e4bc;
  font-family: ${({ theme }) => theme.fonts.ui};

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message {
    max-width: 85%;
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);

    &.user {
      align-self: flex-end;
      background: #8b4513;
      color: #f4e4bc;
      border: 1px solid #daa520;
    }

    &.ai {
      align-self: flex-start;
      background: #2c1810;
      color: #f4e4bc;
      border: 1px solid #5c4033;
    }
  }

  .input-area {
    padding: 20px;
    background: #3e2723;
    border-top: 2px solid #5c4033;
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      background: #1a130e;
      border: 2px solid #5c4033;
      border-radius: 0;
      padding: 12px;
      color: #f4e4bc;
      outline: none;
      font-family: 'Inter', sans-serif;

      &:focus {
        border-color: #daa520;
      }
    }

    button {
      background: #8b4513;
      border: 2px solid #daa520;
      border-radius: 0;
      padding: 0 20px;
      color: #f4e4bc;
      cursor: pointer;
      font-family: 'Rye', cursive;
      font-size: 14px;
      transition: all 0.2s;

      &:hover {
        background: #a0522d;
        transform: translateY(-1px);
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
