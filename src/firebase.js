import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBegwZQuBAn_6y4HnQq_dGmQpgoX2bbzoE",
  authDomain: "emamoh-3e849.firebaseapp.com",
  projectId: "emamoh-3e849",
  storageBucket: "emamoh-3e849.firebasestorage.app",
  messagingSenderId: "737654007481",
  appId: "1:737654007481:web:45a0ad67221d4783785d68",
  measurementId: "G-GE8E7PTB0S"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };
