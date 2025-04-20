// firestorage.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCSJHZqPSsaswjczptvKcJzgfsIgNbZqyg",
  authDomain: "aceleratec-41568.firebaseapp.com",
  projectId: "aceleratec-41568",
  storageBucket: "aceleratec-41568.firebasestorage.app",
  messagingSenderId: "568282188545",
  appId: "1:568282188545:web:a5278f52a2201317242900",
  measurementId: "G-484WC39M5F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };