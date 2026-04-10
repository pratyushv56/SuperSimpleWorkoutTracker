// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnPZp7diT_rLp_ZACXrOdf15abJkRRjRA",
  authDomain: "bufflog-b07fb.firebaseapp.com",
  projectId: "bufflog-b07fb",
  storageBucket: "bufflog-b07fb.firebasestorage.app",
  messagingSenderId: "669848519407",
  appId: "1:669848519407:web:56ad8e0ee869f6ce6f511a",
  measurementId: "G-02RMNWBH4X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
