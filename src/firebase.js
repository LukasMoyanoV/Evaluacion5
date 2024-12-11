
import { initializeApp } from "firebase/app";



import { getDatabase } from "firebase/database"; // Si usas Realtime Database
import { getFirestore } from "firebase/firestore"; // Si usas Firestore
import { getAuth } from "firebase/auth"; // Si necesitas autenticación
import { getAnalytics } from "firebase/analytics"; // Si necesitas Analytics



// Tu configuración de Firebase (usa los valores de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyCAqB8o1h2Iu98Jzm7UV5zKAK4qo7HGt2Y",
  authDomain: "sistema-de-biblioteca-26021.firebaseapp.com",
  projectId: "sistema-de-biblioteca-26021",
  storageBucket: "sistema-de-biblioteca-26021.firebasestorage.app",
  messagingSenderId: "132167485900",
  appId: "1:132167485900:web:14261bc33d5b4b3795b569",
  measurementId: "G-KVK04LPQYR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Si necesitas usar Analytics (opcional)
const analytics = getAnalytics(app);

// Inicializar la base de datos (elige Realtime Database o Firestore)
const database = getDatabase(app); // Para Realtime Database
// const db = getFirestore(app); // Para Firestore

// Inicializar autenticación (si la necesitas)
const auth = getAuth(app);

// Exportar lo que necesites
export { app, database, auth, analytics };
