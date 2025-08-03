// components/ChatBottomButton.jsx - 下部入力トリガーボタン

import React from 'react';
import { CSS_CLASSES, PLACEHOLDERS } from '../constants/constants';
import { triggerKeyboardWithDummyElement } from '../utils/keyboardUtils';

/**
 * 下部に固定表示される入力トリガーボタン
 * ダミー要素法で確実なキーボード表示を実現
 */
export function ChatBottomButton({ onClick, loading }) {
  
  // ダミー要素法による確実キーボード表示
  const handleClick = () => {
    triggerKeyboardWithDummyElement(onClick);
  };

  return (
    <div className={CSS_CLASSES.BOTTOM_PANEL}>
      <button 
        className={CSS_CLASSES.INPUT_TRIGGER}
        onClick={handleClick}
        disabled={loading}
        aria-label="入力パネルを開く"
        type="button"
      >
        {loading ? PLACEHOLDERS.LOADING : PLACEHOLDERS.INPUT_TRIGGER}
      </button>
    </div>
  );
}