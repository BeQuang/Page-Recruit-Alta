// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDToWXV8RId18Xdc54ggaqYqShd4B8WP-c",
  authDomain: "recruit-alta.firebaseapp.com",
  projectId: "recruit-alta",
  storageBucket: "recruit-alta.firebasestorage.app",
  messagingSenderId: "926480323651",
  appId: "1:926480323651:web:a6a827939a54fbb10270f6",
  measurementId: "G-WDPRKJ7NN3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
