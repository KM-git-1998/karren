// ファイル: ChatInput.jsx
import React, { useState } from 'react';
import '../styles/ChatInput.css';

export default function ChatInput({ onClose }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: 0.8,
        }),
      });

      const data = await res.json();
      console.log('🤖 GPTの応答:', data.choices?.[0]?.message?.content);
    } catch (err) {
      console.error('エラー:', err);
    }

    setMessage('');
    setLoading(false);
    onClose();
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        className="chat-input-textarea"
        placeholder="メッセージを入力..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? '送信中...' : '送信'}
      </button>
    </form>
  );
}