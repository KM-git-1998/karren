// components/FloatingSendButton.jsx - 浮遊送信ボタン

import React from 'react';
import { CSS_CLASSES, PLACEHOLDERS } from '../constants/constants';

/**
 * 画面中央左側に表示される浮遊送信ボタン
 * 入力パネル表示時のみ表示される
 */
export function FloatingSendButton({ 
  isVisible, 
  onClick, 
  loading, 
  disabled 
}) {
  const buttonClass = isVisible 
    ? CSS_CLASSES.FLOATING_BUTTON_SHOW 
    : CSS_CLASSES.FLOATING_BUTTON;

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={loading || disabled}
      aria-label="メッセージを送信"
      type="button"
    >
      {loading ? PLACEHOLDERS.LOADING : '送信'}
    </button>
  );
}