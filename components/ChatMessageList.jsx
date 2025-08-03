// components/ChatMessageList.jsx - メッセージリストコンポーネント

import React, { useEffect, useRef } from 'react';
import { CSS_CLASSES, SENDER_LABELS, MESSAGE_SENDER } from '../constants/constants';

/**
 * 個別メッセージバブルコンポーネント
 */
function MessageBubble({ message }) {
  const { id, text, sender, timestamp } = message;
  
  const bubbleClass = sender === MESSAGE_SENDER.USER 
    ? `${CSS_CLASSES.CHAT_BUBBLE} ${CSS_CLASSES.USER_BUBBLE}`
    : `${CSS_CLASSES.CHAT_BUBBLE} ${CSS_CLASSES.AI_BUBBLE}`;

  return (
    <div key={id} className={bubbleClass}>
      <div className={CSS_CLASSES.SENDER_LABEL}>
        {SENDER_LABELS[sender]} {timestamp && ` - ${timestamp}`}
      </div>
      <div className={CSS_CLASSES.MESSAGE_TEXT}>{text}</div>
    </div>
  );
}

/**
 * メッセージリストコンポーネント
 * クリックで入力欄を閉じる機能付き
 */
export function ChatMessageList({ messages = [], onChatAreaClick }) {
  const messagesEndRef = useRef(null);

  // 新しいメッセージが追加されたら最下部にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={CSS_CLASSES.MESSAGE_LIST} onClick={onChatAreaClick}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}