// firebase.js
// 🔥 Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "aceleratec-41568.firebaseapp.com",
    projectId: "aceleratec-41568",
    storageBucket: "aceleratec-41568.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Exportando firestore para ser usado em outros arquivos
export { firestore };
  