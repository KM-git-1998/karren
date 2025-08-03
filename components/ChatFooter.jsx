import React, { useRef, useState, useEffect } from 'react';
import '../styles/ChatFooter.css';

export default function ChatFooter({ 
  message = '', 
  setMessage = () => {}, 
  loading = false, 
  onSubmit = () => {} 
}) {
  const textareaRef = useRef(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  // 設定値
  const FOOTER_HEIGHT = 105;
  const TOTAL_UI_HEIGHT = 155;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // ページ固定とスクロール制御
  useEffect(() => {
    // ページを上に固定
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    
    // チャット欄のスクロール制御
    const chatMain = document.querySelector('.chat-main');
    if (chatMain) {
      chatMain.style.overscrollBehavior = 'contain';
      chatMain.style.webkitOverflowScrolling = 'touch';
    }
    
    // ページスクロール完全禁止
    const preventScroll = () => window.scrollTo(0, 0);
    document.addEventListener('scroll', preventScroll);
    
    return () => {
      document.removeEventListener('scroll', preventScroll);
    };
  }, []);

  // iOS Safari キーボード対応
  useEffect(() => {
    if (!isIOS) return;

    const updateLayout = () => {
      const header = document.querySelector('.chat-header');
      const footer = document.querySelector('.chat-footer');
      const main = document.querySelector('.chat-main');
      
      if (isKeyboardVisible) {
        const visualHeight = window.visualViewport?.height || window.innerHeight;
        
        // ヘッダーを absolute に変更
        if (header) {
          header.style.position = 'absolute';
          header.style.top = '0px';
        }
        
        // フッターをキーボード上に配置
        if (footer) {
          footer.style.position = 'absolute';
          footer.style.top = `${visualHeight - FOOTER_HEIGHT}px`;
          footer.style.bottom = 'auto';
        }
        
        // メインエリアのサイズ調整
        if (main) {
          main.style.height = `${visualHeight - TOTAL_UI_HEIGHT}px`;
          // 最下部にスクロール
          setTimeout(() => main.scrollTop = main.scrollHeight, 100);
        }
      } else {
        // 通常時の fixed レイアウトに戻す
        if (header) {
          header.style.position = 'fixed';
          header.style.top = '0';
        }
        if (footer) {
          footer.style.position = 'fixed';
          footer.style.top = 'auto';
          footer.style.bottom = '0';
        }
        if (main) {
          main.style.position = 'fixed';
          main.style.height = 'auto';
          setTimeout(() => main.scrollTop = main.scrollHeight, 100);
        }
      }
    };

    // Visual Viewport イベント
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateLayout);
    }
    
    updateLayout();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateLayout);
      }
    };
  }, [isKeyboardVisible]);

  // イベントハンドラー
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading && !isComposing) {
      onSubmit(message);
    }
  };

  const handleKeyDown = (e) => {
    if (isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey && !isIOS) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFocus = () => {
    setIsKeyboardVisible(true);
    textareaRef.current?.classList.add('expanded');
  };

  const handleBlur = () => {
    setIsKeyboardVisible(false);
    textareaRef.current?.classList.remove('expanded');
    
    // iOS での自動送信
    if (message.trim() && !loading && !isComposing) {
      setTimeout(() => onSubmit(message), 100);
    }
  };

  return (
    <footer className="chat-footer">
      <form className="chat-footer-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className={`chat-footer-textarea ${isKeyboardVisible ? 'expanded' : ''}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setTimeout(() => setIsComposing(false), 50)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={loading}
          rows={1}
          // placeholder="タップして入力"
        />
      </form>
    </footer>
  );
}