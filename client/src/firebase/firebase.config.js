// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATSe2w2hWiYHSIipohQBSpO32YPN9a-Ww",
  authDomain: "mern-book-inventory-a17fa.firebaseapp.com",
  projectId: "mern-book-inventory-a17fa",
  storageBucket: "mern-book-inventory-a17fa.appspot.com",
  messagingSenderId: "826537347186",
  appId: "1:826537347186:web:ea4a59899153e99aab9aeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
