// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARenGmb1Mu2sMBuHF3MD1522oVt8Bjod4",
  authDomain: "verycoolsocialmedia.firebaseapp.com",
  projectId: "verycoolsocialmedia",
  storageBucket: "verycoolsocialmedia.firebasestorage.app",
  messagingSenderId: "864842259666",
  appId: "1:864842259666:web:032cae4f86077ce987e10b",
  measurementId: "G-MKLZB4M95G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };