// ChatInterface.jsx - 浮遊送信ボタン版
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import '../styles/ChatInterface.css';

// ヘッダー下入力欄（改行対応 + 保存のみ対応）
function HeaderInputPanel({ isOpen, onClose, onSubmit, loading, message, setMessage }) {
  const textareaRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // 表示・非表示アニメーション制御
  useEffect(() => {
    if (isOpen) {
      // 表示時
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10); // DOM追加後にクラス適用
    } else {
      // 非表示時
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300); // アニメーション完了後に削除
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSubmit(message);
      setMessage(''); // 送信時のみクリア
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    // Enterキーでの送信を無効化（改行を許可）
    // 送信は浮遊ボタンのみ
  };

  // キーボードの「完了」ボタンや入力欄外タップ時（保存のみ）
  const handleBlur = () => {
    console.log('🔍 handleBlur 呼ばれました - 入力内容を保存して閉じる');
    
    setTimeout(() => {
      console.log('🔍 入力内容保存のみ（送信なし）');
      // 入力内容は保持したまま閉じる（送信はしない）
      
      console.log('🔍 onClose 呼び出し');
      onClose();
    }, 150);
  };

  // 入力欄が開いたら自動フォーカス
  useEffect(() => {
    if (isVisible && textareaRef.current) {
      // より確実にフォーカス
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.click(); // iOS用
      }, 50);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`header-input-panel ${isVisible ? 'show' : ''}`}>
      <form className="header-input-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="header-input-textarea"
          placeholder="メッセージを入力...（Enterで改行）"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={loading}
          rows={2}
        />
        
        {/* 入力パネル内の送信ボタンは削除 */}
      </form>
    </div>
  );
}

// 浮遊送信ボタン（画面中央左側）
function FloatingSendButton({ isVisible, onClick, loading, disabled }) {
  return (
    <button 
      className={`floating-send-button ${isVisible ? 'show' : ''}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? '送信中...' : '送信'}
    </button>
  );
}

// 下部入力ボタン（ダミー要素法対応）
function ChatBottomButton({ onClick, loading }) {
  // ダミー要素法による確実キーボード表示
  const handleClick = () => {
    console.log('🎯 ダミー要素法で確実キーボード表示開始');
    
    // 1. ユーザーアクション内で即座にダミー要素作成
    const dummyInput = document.createElement('input');
    dummyInput.setAttribute('type', 'text');
    dummyInput.style.position = 'absolute';
    dummyInput.style.opacity = '0.001';
    dummyInput.style.height = '0';
    dummyInput.style.width = '0';
    dummyInput.style.fontSize = '16px'; // iOS ズーム防止
    dummyInput.style.left = '-9999px';
    dummyInput.readOnly = true;
    
    // 2. ダミー要素をDOMに追加してフォーカス
    document.body.appendChild(dummyInput);
    dummyInput.focus(); // キーボード表示権限取得
    console.log('⚡ ダミー要素にフォーカス - キーボード権限取得');
    
    // 3. 入力パネル表示
    onClick();
    
    // 4. DOM更新後に本来のテキストエリアにフォーカス移動
    setTimeout(() => {
      const textarea = document.querySelector('.header-input-textarea');
      if (textarea) {
        textarea.focus();
        console.log('🎯 本来のテキストエリアにフォーカス移動');
        
        // iOS用の追加処理
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
          textarea.click();
          console.log('📱 iOS用クリックトリガー');
        }
      }
      
      // 5. ダミー要素削除
      dummyInput.remove();
      console.log('🗑️ ダミー要素削除完了');
    }, 100);
  };

  return (
    <div className="chat-bottom-panel">
      <button 
        className="chat-input-trigger"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? '送信中...' : 'メッセージを入力'}
      </button>
    </div>
  );
}

// メッセージリスト（クリックで入力欄を閉じる）
function ChatMessageList({ messages = [], onChatAreaClick }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSenderLabel = (sender) => {
    switch (sender) {
      case 'user': return 'USER';
      case 'ai': return 'KARREN';
      case 'error': return 'ERROR';
      default: return '';
    }
  };

  return (
    <div className="chat-message-list" onClick={onChatAreaClick}>
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-bubble ${msg.sender}-bubble`}>
          <div className="sender-label">
            {getSenderLabel(msg.sender)} {msg.timestamp && ` - ${msg.timestamp}`}
          </div>
          <div className="message-text">{msg.text}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default function ChatInterface() {
  const [loading, setLoading] = useState(false);
  const [isInputPanelOpen, setIsInputPanelOpen] = useState(false);
  const [message, setMessage] = useState(''); // 入力内容を保持
  
  // スクロールテスト用雑学メッセージ
  const [messages, setMessages] = useState([
    { id: 1, text: '🐙 タコの心臓は3つもあるって知ってた？', sender: 'ai', timestamp: '09:50' },
    { id: 2, text: '🍯 ハチミツは腐らない唯一の食べ物です', sender: 'ai', timestamp: '09:51' },
    { id: 3, text: '🦒 キリンの舌の長さは約50cm！', sender: 'ai', timestamp: '09:52' },
    { id: 4, text: '🌙 月は毎年3.8cmずつ地球から遠ざかっています', sender: 'ai', timestamp: '09:53' },
    { id: 5, text: '🐧 ペンギンは実は膝を持っている（見えないだけ）', sender: 'ai', timestamp: '09:54' },
    { id: 6, text: '🦘 カンガルーは後ろ向きに歩けません', sender: 'ai', timestamp: '09:55' },
    { id: 7, text: '🍌 バナナは実は果物ではなく「ベリー」の一種', sender: 'ai', timestamp: '09:56' },
    { id: 8, text: '🐨 コアラの指紋は人間とほぼ同じ', sender: 'ai', timestamp: '09:57' },
    { id: 9, text: '🌍 地球上の生物の99%は既に絶滅している', sender: 'ai', timestamp: '09:58' },
    { id: 10, text: '🧠 人間の脳は体重の2%しかないのに、全エネルギーの20%を消費', sender: 'ai', timestamp: '09:59' },
    { id: 11, text: '🦋 蝶の羽は実は透明。色は光の反射による錯覚', sender: 'ai', timestamp: '10:00' },
    { id: 12, text: '🐢 カメは甲羅から出られません（甲羅は肋骨の一部）', sender: 'ai', timestamp: '10:01' },
    { id: 13, text: '⚡ 雷は太陽の表面温度の5倍も熱い', sender: 'ai', timestamp: '10:02' },
    { id: 14, text: '🐘 ゾウは人間を「可愛い」と思っている（脳の反応が同じ）', sender: 'ai', timestamp: '10:03' },
    { id: 15, text: '🌊 海の水の99%は生物が住めない環境', sender: 'ai', timestamp: '10:04' },
    { id: 16, text: '🦆 アヒルのクワクワという声は実はエコーしない', sender: 'ai', timestamp: '10:05' },
    { id: 17, text: '💎 ダイヤモンドより硬い物質が実は存在する', sender: 'ai', timestamp: '10:06' },
    { id: 18, text: '🐙 タコは8本の腕にそれぞれ独立した「脳」がある', sender: 'ai', timestamp: '10:07' },
    { id: 19, text: '🌌 宇宙は無音。音を伝える空気がないため', sender: 'ai', timestamp: '10:08' },
    { id: 20, text: '🦜 オウムは数を数えることができる', sender: 'ai', timestamp: '10:09' },
    { id: 21, text: '📍 浮遊送信ボタン実装完了！', sender: 'ai', timestamp: '10:10' },
    { id: 22, text: '画面中央左側に送信ボタンを配置', sender: 'ai', timestamp: '10:11' },
    { id: 23, text: 'キーボード表示時のみ表示される革新的UI', sender: 'ai', timestamp: '10:12' },
    { id: 24, text: '片手操作も考慮した最適な配置！', sender: 'ai', timestamp: '10:13' }
  ]);

  const handleOpenInputPanel = () => {
    console.log('📍 ヘッダー下入力欄を表示');
    setIsInputPanelOpen(true);
  };

  const handleCloseInputPanel = () => {
    console.log('📍 ヘッダー下入力欄を閉じる（内容は保持）');
    setIsInputPanelOpen(false);
    // messageは保持（クリアしない）
  };

  const handleChatAreaClick = () => {
    if (isInputPanelOpen) {
      handleCloseInputPanel();
    }
  };

  const handleSubmit = async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    // ダミーレスポンス
    setTimeout(() => {
      const responses = [
        '🎯 浮遊送信ボタンで快適な片手操作！',
        '📱 画面中央左側配置で最高のUX',
        '⚡ キーボード表示時のみ表示される賢いUI',
        '🚀 入力と送信の操作が分離されて使いやすい！',
        '💡 革新的なフローティングボタンデザイン',
        '🔥 ユーザビリティを極めたインターフェース',
        '✨ スマートで直感的な操作体験'
      ];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleFloatingSendClick = () => {
    if (message.trim() && !loading) {
      handleSubmit(message);
      setMessage(''); // 送信後にクリア
      handleCloseInputPanel(); // 入力パネルも閉じる
    }
  };

  return (
    <div className="chat-container">
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
      <main className={`chat-main ${isInputPanelOpen ? 'with-input-panel' : ''}`}>
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