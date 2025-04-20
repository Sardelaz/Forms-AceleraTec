// firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyCSJHZqPSsaswjczptvKcJzgfsIgNbZqyg",
    authDomain: "aceleratec-41568.firebaseapp.com",
    projectId: "aceleratec-41568",
    storageBucket: "aceleratec-41568.firebasestorage.app",
    messagingSenderId: "568282188545",
    appId: "1:568282188545:web:a5278f52a2201317242900",
    measurementId: "G-484WC39M5F"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Disponibiliza no escopo global
window.firestore = firestore;
window.serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
