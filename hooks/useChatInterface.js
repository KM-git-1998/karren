// hooks/useChatInterface.js - チャットインターフェースロジック

import { useState, useCallback } from 'react';
import { MESSAGE_SENDER, DEMO_RESPONSES, TIMING } from '../constants/constants';

/**
 * チャットインターフェースの状態管理とロジック
 */
export function useChatInterface() {
  const [loading, setLoading] = useState(false);
  const [isInputPanelOpen, setIsInputPanelOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: '🐙 タコの心臓は3つもあるって知ってた？', sender: MESSAGE_SENDER.AI, timestamp: '09:50' },
    { id: 2, text: '🍯 ハチミツは腐らない唯一の食べ物です', sender: MESSAGE_SENDER.AI, timestamp: '09:51' },
    { id: 3, text: '🦒 キリンの舌の長さは約50cm！', sender: MESSAGE_SENDER.AI, timestamp: '09:52' },
    { id: 4, text: '🌙 月は毎年3.8cmずつ地球から遠ざかっています', sender: MESSAGE_SENDER.AI, timestamp: '09:53' },
    { id: 5, text: '🐧 ペンギンは実は膝を持っている（見えないだけ）', sender: MESSAGE_SENDER.AI, timestamp: '09:54' },
    { id: 6, text: '🦘 カンガルーは後ろ向きに歩けません', sender: MESSAGE_SENDER.AI, timestamp: '09:55' },
    { id: 7, text: '🍌 バナナは実は果物ではなく「ベリー」の一種', sender: MESSAGE_SENDER.AI, timestamp: '09:56' },
    { id: 8, text: '🐨 コアラの指紋は人間とほぼ同じ', sender: MESSAGE_SENDER.AI, timestamp: '09:57' },
    { id: 9, text: '🌍 地球上の生物の99%は既に絶滅している', sender: MESSAGE_SENDER.AI, timestamp: '09:58' },
    { id: 10, text: '🧠 人間の脳は体重の2%しかないのに、全エネルギーの20%を消費', sender: MESSAGE_SENDER.AI, timestamp: '09:59' },
    { id: 11, text: '🦋 蝶の羽は実は透明。色は光の反射による錯覚', sender: MESSAGE_SENDER.AI, timestamp: '10:00' },
    { id: 12, text: '🐢 カメは甲羅から出られません（甲羅は肋骨の一部）', sender: MESSAGE_SENDER.AI, timestamp: '10:01' },
    { id: 13, text: '⚡ 雷は太陽の表面温度の5倍も熱い', sender: MESSAGE_SENDER.AI, timestamp: '10:02' },
    { id: 14, text: '🐘 ゾウは人間を「可愛い」と思っている（脳の反応が同じ）', sender: MESSAGE_SENDER.AI, timestamp: '10:03' },
    { id: 15, text: '🌊 海の水の99%は生物が住めない環境', sender: MESSAGE_SENDER.AI, timestamp: '10:04' },
    { id: 16, text: '🦆 アヒルのクワクワという声は実はエコーしない', sender: MESSAGE_SENDER.AI, timestamp: '10:05' },
    { id: 17, text: '💎 ダイヤモンドより硬い物質が実は存在する', sender: MESSAGE_SENDER.AI, timestamp: '10:06' },
    { id: 18, text: '🐙 タコは8本の腕にそれぞれ独立した「脳」がある', sender: MESSAGE_SENDER.AI, timestamp: '10:07' },
    { id: 19, text: '🌌 宇宙は無音。音を伝える空気がないため', sender: MESSAGE_SENDER.AI, timestamp: '10:08' },
    { id: 20, text: '🦜 オウムは数を数えることができる', sender: MESSAGE_SENDER.AI, timestamp: '10:09' },
    { id: 21, text: '📍 クリーンコード実装完了！', sender: MESSAGE_SENDER.AI, timestamp: '10:10' },
    { id: 22, text: '保守性と可読性を大幅に向上', sender: MESSAGE_SENDER.AI, timestamp: '10:11' },
    { id: 23, text: 'コンポーネント分割と定数管理で整理', sender: MESSAGE_SENDER.AI, timestamp: '10:12' },
    { id: 24, text: '機能はそのままに、より良いコード構造！', sender: MESSAGE_SENDER.AI, timestamp: '10:13' }
  ]);

  // 入力パネルの開閉
  const handleOpenInputPanel = useCallback(() => {
    console.log('📍 ヘッダー下入力欄を表示');
    setIsInputPanelOpen(true);
  }, []);

  const handleCloseInputPanel = useCallback(() => {
    console.log('📍 ヘッダー下入力欄を閉じる（内容は保持）');
    setIsInputPanelOpen(false);
  }, []);

  // チャットエリアクリック処理
  const handleChatAreaClick = useCallback(() => {
    if (isInputPanelOpen) {
      handleCloseInputPanel();
    }
  }, [isInputPanelOpen, handleCloseInputPanel]);

  // メッセージ送信処理
  const handleSubmit = useCallback(async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: MESSAGE_SENDER.USER,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    // ダミーレスポンス（実際のAPI呼び出しに置き換え可能）
    setTimeout(() => {
      const randomResponse = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: MESSAGE_SENDER.AI,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  // 浮遊送信ボタンクリック処理
  const handleFloatingSendClick = useCallback(() => {
    if (message.trim() && !loading) {
      handleSubmit(message);
      setMessage('');
      handleCloseInputPanel();
    }
  }, [message, loading, handleSubmit, handleCloseInputPanel]);

  return {
    // 状態
    loading,
    isInputPanelOpen,
    message,
    messages,
    
    // 状態更新関数
    setMessage,
    
    // イベントハンドラー
    handleOpenInputPanel,
    handleCloseInputPanel,
    handleChatAreaClick,
    handleSubmit,
    handleFloatingSendClick,
  };
}