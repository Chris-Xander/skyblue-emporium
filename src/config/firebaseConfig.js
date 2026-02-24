// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXYBLruGm_pr_dyAZbxAo6vX_Sm6oGVpA",
  authDomain: "vienelleshop-12842.firebaseapp.com",
  projectId: "vienelleshop-12842",
  storageBucket: "vienelleshop-12842.firebasestorage.app",
  messagingSenderId: "416462965687",
  appId: "1:416462965687:web:356f2f41d440b927fa7632",
  measurementId: "G-V70LLKCK8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;