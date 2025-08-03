// components/HeaderInputPanel.jsx - ヘッダー下入力パネル

import React, { useState, useRef, useEffect } from 'react';
import { TIMING, PLACEHOLDERS, CSS_CLASSES, TEXTAREA } from '../constants/constants';
import { focusTextarea, handleInputCompletion } from '../utils/keyboardUtils';

/**
 * ヘッダー下の入力パネルコンポーネント
 * 改行対応 + 保存機能付き
 */
export function HeaderInputPanel({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loading, 
  message, 
  setMessage 
}) {
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
      setTimeout(() => setShouldRender(false), TIMING.ANIMATION_DURATION);
    }
  }, [isOpen]);

  // 入力欄が開いたら自動フォーカス
  useEffect(() => {
    if (isVisible && textareaRef.current) {
      focusTextarea(textareaRef.current);
    }
  }, [isVisible]);

  // フォーム送信処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSubmit(message);
      setMessage('');
      onClose();
    }
  };

  // キーダウン処理（Enterキーでの送信を無効化）
  const handleKeyDown = () => {
    // Enterキーでの送信を無効化（改行を許可）
    // 送信は浮遊ボタンのみ
  };

  // フォーカス喪失時の処理（保存のみ）
  const handleBlur = () => {
    handleInputCompletion(message, loading, false, onSubmit);
    
    setTimeout(() => {
      console.log('🔍 入力内容保存のみ（送信なし）');
      onClose();
    }, TIMING.BLUR_DELAY);
  };

  // レンダリング制御
  if (!shouldRender) return null;

  return (
    <div className={isVisible ? CSS_CLASSES.INPUT_PANEL_SHOW : CSS_CLASSES.INPUT_PANEL}>
      <form className={CSS_CLASSES.INPUT_FORM} onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className={CSS_CLASSES.INPUT_TEXTAREA}
          placeholder={PLACEHOLDERS.INPUT_TEXTAREA}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={loading}
          rows={TEXTAREA.DEFAULT_ROWS}
        />
      </form>
    </div>
  );
}