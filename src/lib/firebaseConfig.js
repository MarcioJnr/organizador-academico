import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA59XrWACJWhUosAKj1N6N9KyJzjY-7Nxs",
  authDomain: "organizador-academico.firebaseapp.com",
  projectId: "organizador-academico",
  storageBucket: "organizador-academico.firebasestorage.app",
  messagingSenderId: "798173485441",
  appId: "1:798173485441:web:17db606cc2fb9a08417080",
  //measurementId: "G-JKZFK10NJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(app);
//export const storage = getStorage(app);
