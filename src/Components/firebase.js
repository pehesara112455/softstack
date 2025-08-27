import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;