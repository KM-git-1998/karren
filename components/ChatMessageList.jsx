import React, { useEffect, useRef } from 'react';

export default function ChatMessageList({ messages = [] }) {
  const messagesEndRef = useRef(null);

  // 新しいメッセージが追加されたら最下部にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyle = (sender) => {
    const baseStyle = {
      marginBottom: '1rem',
      padding: '1rem',
      borderRadius: '8px',
      wordWrap: 'break-word',
      maxWidth: '100%'
    };

    switch (sender) {
      case 'user':
        return {
          ...baseStyle,
          backgroundColor: '#007bff',
          color: 'white',
          marginLeft: '20%',
          textAlign: 'right'
        };
      case 'ai':
        return {
          ...baseStyle,
          backgroundColor: 'white',
          color: '#333',
          marginRight: '20%',
          border: '1px solid #ddd'
        };
      case 'system':
        return {
          ...baseStyle,
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          fontStyle: 'italic',
          textAlign: 'center'
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb'
        };
      default:
        return baseStyle;
    }
  };

  const getSenderLabel = (sender) => {
    switch (sender) {
      case 'user':
        return 'あなた';
      case 'ai':
        return 'AI';
      case 'system':
        return 'システム';
      case 'error':
        return 'エラー';
      default:
        return '';
    }
  };

  return (
    <div className="chat-message-list">
      {messages.map((msg) => (
        <div key={msg.id} style={getMessageStyle(msg.sender)}>
          <div style={{ fontSize: '0.8em', marginBottom: '0.5rem', opacity: 0.7 }}>
            {getSenderLabel(msg.sender)}
            {msg.timestamp && ` - ${msg.timestamp}`}
          </div>
          <div>{msg.text}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}