// src/backend/authService.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Make sure firebaseConfig.js is set up

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.email === "upehesara827@gmail.com") {
      return user;
    } else {
      throw new Error("Unauthorized access");
    }
  } catch (error) {
    throw new Error("Login failed ");
  }
};