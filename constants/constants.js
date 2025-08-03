// constants.js - アプリケーション定数管理

// UI レイアウト定数
export const LAYOUT = {
  HEADER_HEIGHT: 45,
  FOOTER_HEIGHT: 60,
  INPUT_PANEL_HEIGHT: 100,
  FLOATING_BUTTON_SIZE: 50,
  MAX_CONTENT_WIDTH: 600,
  TRIGGER_BUTTON_MAX_WIDTH: 400,
};

// アニメーション・タイミング定数
export const TIMING = {
  ANIMATION_DURATION: 300,
  FOCUS_DELAY: 50,
  BLUR_DELAY: 150,
  DUMMY_ELEMENT_CLEANUP: 100,
  AUTO_SCROLL_DELAY: 100,
  COMPOSITION_END_DELAY: 50,
};

// テキストエリア設定
export const TEXTAREA = {
  MIN_HEIGHT: 60,
  MAX_HEIGHT: 120,
  FONT_SIZE: 16, // iOS Safari ズーム防止
  DEFAULT_ROWS: 2,
};

// メッセージ送信者タイプ
export const MESSAGE_SENDER = {
  USER: 'user',
  AI: 'ai',
  SYSTEM: 'system',
  ERROR: 'error',
};

// 送信者ラベル
export const SENDER_LABELS = {
  [MESSAGE_SENDER.USER]: 'USER',
  [MESSAGE_SENDER.AI]: 'KARREN',
  [MESSAGE_SENDER.SYSTEM]: 'SYSTEM',
  [MESSAGE_SENDER.ERROR]: 'ERROR',
};

// デバイス判定
export const DEVICE = {
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isMobile: () => window.innerWidth <= 768,
  isLandscape: () => window.innerWidth > window.innerHeight,
};

// ダミー入力要素スタイル
export const DUMMY_INPUT_STYLE = {
  position: 'absolute',
  opacity: '0.001',
  height: '0',
  width: '0',
  fontSize: `${TEXTAREA.FONT_SIZE}px`,
  left: '-9999px',
};

// z-index レイヤー管理
export const Z_INDEX = {
  HEADER: 999,
  INPUT_PANEL: 998,
  FOOTER: 997,
  FLOATING_BUTTON: 999999,
};

// CSS クラス名
export const CSS_CLASSES = {
  // メインコンテナ
  CHAT_CONTAINER: 'chat-container',
  CHAT_MAIN: 'chat-main',
  CHAT_MAIN_WITH_INPUT: 'chat-main.with-input-panel',
  
  // 入力パネル
  INPUT_PANEL: 'header-input-panel',
  INPUT_PANEL_SHOW: 'header-input-panel show',
  INPUT_FORM: 'header-input-form',
  INPUT_TEXTAREA: 'header-input-textarea',
  
  // ボタン
  FLOATING_BUTTON: 'floating-send-button',
  FLOATING_BUTTON_SHOW: 'floating-send-button show',
  INPUT_TRIGGER: 'chat-input-trigger',
  
  // メッセージ
  MESSAGE_LIST: 'chat-message-list',
  CHAT_BUBBLE: 'chat-bubble',
  USER_BUBBLE: 'user-bubble',
  AI_BUBBLE: 'ai-bubble',
  SENDER_LABEL: 'sender-label',
  MESSAGE_TEXT: 'message-text',
  
  // パネル
  BOTTOM_PANEL: 'chat-bottom-panel',
};

// メッセージテンプレート
export const DEMO_RESPONSES = [
  '🎯 浮遊送信ボタンで快適な片手操作！',
  '📱 画面中央左側配置で最高のUX',
  '⚡ キーボード表示時のみ表示される賢いUI',
  '🚀 入力と送信の操作が分離されて使いやすい！',
  '💡 革新的なフローティングボタンデザイン',
  '🔥 ユーザビリティを極めたインターフェース',
  '✨ スマートで直感的な操作体験',
];

// プレースホルダーテキスト
export const PLACEHOLDERS = {
  INPUT_TEXTAREA: 'メッセージを入力...（Enterで改行）',
  INPUT_TRIGGER: 'メッセージを入力',
  LOADING: '送信中...',
};

// エラーメッセージ
export const ERROR_MESSAGES = {
  SEND_FAILED: 'メッセージの送信に失敗しました',
  EMPTY_MESSAGE: 'メッセージを入力してください',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
};