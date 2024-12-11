import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Usando Firestore
import { getAuth } from "firebase/auth"; // Autenticación

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

// Inicializar Firebase solo si no ha sido inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializar Firestore
const db = getFirestore(app); // Para Firestore

// Inicializar autenticación
const auth = getAuth(app);

// Exportar lo que necesites
export { app, db, auth }; // Exportando Firestore y Auth
