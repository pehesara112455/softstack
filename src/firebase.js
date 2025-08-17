import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these with your own Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAS7rB-LTZfu2LcDgCjPLvaVk1h269BCYE",
  authDomain: "softstack-c7861.firebaseapp.com",
  databaseURL: "https://softstack-c7861-default-rtdb.firebaseio.com",
  projectId: "softstack-c7861",
  storageBucket: "softstack-c7861.firebasestorage.app",
  messagingSenderId: "208691132488",
  appId: "1:208691132488:web:3d827e941fc87c6eeb807d",
  measurementId: "G-JN5QWBLYPX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);