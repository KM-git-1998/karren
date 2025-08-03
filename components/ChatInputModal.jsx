// ChatInput.jsx - 入力完了時に自動でモーダル閉じる
import React, { useState, useEffect } from 'react';
import '../styles/ChatInputModal.css';

export default function ChatInput({ onClose, textareaRef }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // textareaRefが渡された場合、そのrefを使用
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

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

    // 入力をクリアして、モーダルを閉じる
    setMessage('');
    setLoading(false);
    
    // 送信完了後に自動でモーダルを閉じる
    onClose();
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="chat-input-textarea"
        placeholder="メッセージを入力..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !message.trim()}>
        {loading ? '送信中...' : '送信'}
      </button>
    </form>
  );
}