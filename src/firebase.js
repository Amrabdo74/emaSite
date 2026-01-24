import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcUir4R5KRy78C0w8Bf0Ys1j_rDXX51wo",
  authDomain: "eam-co.firebaseapp.com",
  projectId: "eam-co",
  storageBucket: "eam-co.firebasestorage.app",
  messagingSenderId: "171541948598",
  appId: "1:171541948598:web:6239348f04b33484ab1e17",
  measurementId: "G-S02R69ETGX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };
