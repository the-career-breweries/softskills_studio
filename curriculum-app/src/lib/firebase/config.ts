import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZxrZEJ2svwvh2SnFF2Yx9HE7uzivMeP8",
  authDomain: "workshops-tcb.firebaseapp.com",
  projectId: "workshops-tcb",
  storageBucket: "workshops-tcb.firebasestorage.app",
  messagingSenderId: "354496435448",
  appId: "1:354496435448:web:16961060e8e39f40d0170d",
  measurementId: "G-B25YJZ33KQ"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
