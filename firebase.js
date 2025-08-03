// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvmKMWcKrrYeL5C0w1Nq740dJhVouL05U",
  authDomain: "gpx-viewer-20250515-bda4f.firebaseapp.com",
  projectId: "gpx-viewer-20250515-bda4f",
  storageBucket: "gpx-viewer-20250515-bda4f.firebasestorage.app",
  messagingSenderId: "655736843910",
  appId: "1:655736843910:web:72734f9c823fc1a79bab07"
};

export const app = initializeApp(firebaseConfig); // ← 追加！重要
export const auth = getAuth(app);