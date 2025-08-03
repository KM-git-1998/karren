// components/ChatInterface.jsx - クリーンコード版

import React from 'react';
import ChatHeader from './ChatHeader';
import { HeaderInputPanel } from './HeaderInputPanel';
import { FloatingSendButton } from './FloatingSendButton';
import { ChatBottomButton } from './ChatBottomButton';
import { ChatMessageList } from './ChatMessageList';
import { useChatInterface } from '../hooks/useChatInterface';
import { CSS_CLASSES } from '../constants/constants';
import '../styles/ChatInterface.css';

/**
 * メインチャットインターフェースコンポーネント
 * 全ての機能を統合し、クリーンなアーキテクチャで実装
 */
export default function ChatInterface() {
  const {
    // 状態
    loading,
    isInputPanelOpen,
    message,
    messages,
    
    // 状態更新
    setMessage,
    
    // イベントハンドラー
    handleOpenInputPanel,
    handleCloseInputPanel,
    handleChatAreaClick,
    handleSubmit,
    handleFloatingSendClick,
  } = useChatInterface();

  // メイン領域のクラス名を動的に決定
  const mainClassName = isInputPanelOpen 
    ? `${CSS_CLASSES.CHAT_MAIN} with-input-panel`
    : CSS_CLASSES.CHAT_MAIN;

  return (
    <div className={CSS_CLASSES.CHAT_CONTAINER}>
      {/* ヘッダー */}
      <ChatHeader />

      {/* ヘッダー下入力パネル */}
      <HeaderInputPanel
        isOpen={isInputPanelOpen}
        onClose={handleCloseInputPanel}
        onSubmit={handleSubmit}
        loading={loading}
        message={message}
        setMessage={setMessage}
      />

      {/* 浮遊送信ボタン（画面中央左側） */}
      <FloatingSendButton
        isVisible={isInputPanelOpen}
        onClick={handleFloatingSendClick}
        loading={loading}
        disabled={!message.trim()}
      />

      {/* メッセージ履歴（クリックで入力欄を閉じる） */}
      <main className={mainClassName}>
        <ChatMessageList 
          messages={messages} 
          onChatAreaClick={handleChatAreaClick}
        />
      </main>

      {/* 下部入力ボタン（ダミー要素法対応） */}
      <ChatBottomButton 
        onClick={handleOpenInputPanel}
        loading={loading}
      />
    </div>
  );
}