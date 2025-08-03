// utils/keyboardUtils.js - キーボード制御ユーティリティ

import { DUMMY_INPUT_STYLE, TIMING, DEVICE, CSS_CLASSES } from '../constants/constants';

/**
 * ダミー要素を作成してキーボード表示権限を取得
 */
export function createDummyInput() {
  const dummyInput = document.createElement('input');
  dummyInput.setAttribute('type', 'text');
  dummyInput.readOnly = true;
  
  // スタイル適用
  Object.assign(dummyInput.style, DUMMY_INPUT_STYLE);
  
  return dummyInput;
}

/**
 * ダミー要素法による確実なキーボード表示
 * @param {Function} onKeyboardReady - キーボード表示準備完了時のコールバック
 */
export function triggerKeyboardWithDummyElement(onKeyboardReady) {
  console.log('🎯 ダミー要素法で確実キーボード表示開始');
  
  // 1. ユーザーアクション内で即座にダミー要素作成
  const dummyInput = createDummyInput();
  
  // 2. ダミー要素をDOMに追加してフォーカス
  document.body.appendChild(dummyInput);
  dummyInput.focus(); // キーボード表示権限取得
  console.log('⚡ ダミー要素にフォーカス - キーボード権限取得');
  
  // 3. 入力パネル表示
  onKeyboardReady();
  
  // 4. DOM更新後に本来のテキストエリアにフォーカス移動
  setTimeout(() => {
    const textarea = document.querySelector(`.${CSS_CLASSES.INPUT_TEXTAREA}`);
    if (textarea) {
      textarea.focus();
      console.log('🎯 本来のテキストエリアにフォーカス移動');
      
      // iOS用の追加処理
      if (DEVICE.isIOS()) {
        textarea.click();
        console.log('📱 iOS用クリックトリガー');
      }
    }
    
    // 5. ダミー要素削除
    dummyInput.remove();
    console.log('🗑️ ダミー要素削除完了');
  }, TIMING.DUMMY_ELEMENT_CLEANUP);
}

/**
 * テキストエリアに確実にフォーカスを当てる
 * @param {HTMLElement} textarea - フォーカス対象のテキストエリア
 */
export function focusTextarea(textarea) {
  if (!textarea) return;
  
  setTimeout(() => {
    textarea.focus();
    
    // iOS用の追加処理
    if (DEVICE.isIOS()) {
      textarea.click();
    }
  }, TIMING.FOCUS_DELAY);
}

/**
 * キーボード表示時のレイアウト調整（iOS Safari対応）
 * @param {boolean} isVisible - キーボードの表示状態
 */
export function adjustLayoutForKeyboard(isVisible) {
  if (!DEVICE.isIOS()) return;
  
  const header = document.querySelector('.chat-header');
  const footer = document.querySelector('.chat-footer');
  const main = document.querySelector('.chat-main');
  
  if (isVisible) {
    const visualHeight = window.visualViewport?.height || window.innerHeight;
    
    // ヘッダーを absolute に変更
    if (header) {
      header.style.position = 'absolute';
      header.style.top = '0px';
    }
    
    // フッターをキーボード上に配置
    if (footer) {
      footer.style.position = 'absolute';
      footer.style.top = `${visualHeight - 105}px`;
      footer.style.bottom = 'auto';
    }
    
    // メインエリアのサイズ調整
    if (main) {
      main.style.height = `${visualHeight - 155}px`;
      // 最下部にスクロール
      setTimeout(() => main.scrollTop = main.scrollHeight, TIMING.AUTO_SCROLL_DELAY);
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
      setTimeout(() => main.scrollTop = main.scrollHeight, TIMING.AUTO_SCROLL_DELAY);
    }
  }
}

/**
 * スクロール制御の設定
 */
export function setupScrollControl() {
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
}

/**
 * Visual Viewport API のセットアップ（iOS Safari対応）
 * @param {Function} callback - ビューポート変更時のコールバック
 */
export function setupVisualViewport(callback) {
  if (!DEVICE.isIOS() || !window.visualViewport) return null;
  
  window.visualViewport.addEventListener('resize', callback);
  
  return () => {
    window.visualViewport.removeEventListener('resize', callback);
  };
}

/**
 * 入力完了の検知
 * @param {string} message - 入力メッセージ
 * @param {boolean} loading - ローディング状態
 * @param {boolean} isComposing - 日本語入力中かどうか
 * @param {Function} onSubmit - 送信コールバック
 */
export function handleInputCompletion(message, loading, isComposing, onSubmit) {
  console.log('🔍 handleBlur 呼ばれました - 入力内容を保存して閉じる');
  
  setTimeout(() => {
    console.log('🔍 入力内容保存のみ（送信なし）');
    // 入力内容は保持したまま閉じる（送信はしない）
    // iOS での自動送信は削除
  }, TIMING.BLUR_DELAY);
}