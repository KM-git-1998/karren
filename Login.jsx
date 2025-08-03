import React from 'react';
import { useAuth } from './hooks/useAuth';

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-xl mb-4">ログインしてください</h1>
        <button
          onClick={loginWithGoogle}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Googleでログイン
        </button>
      </div>
    </div>
  );
}
