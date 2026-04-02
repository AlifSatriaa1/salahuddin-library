import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdh86FbZV072vMUw4Ss9UR-eWmlxHqsPA",
  authDomain: "salahuddin-library.firebaseapp.com",
  databaseURL: "https://salahuddin-library-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "salahuddin-library",
  storageBucket: "salahuddin-library.firebasestorage.app",
  messagingSenderId: "611904361908",
  appId: "1:611904361908:web:0b70d5db6508433e388ee1",
  measurementId: "G-P3SMSP6K5B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
