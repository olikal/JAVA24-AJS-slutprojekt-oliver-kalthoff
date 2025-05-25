import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgj7qec4C4oU_nLwwbs3St520YNXYv83s",
  authDomain: "todo-oliver-dbaa9.firebaseapp.com",
  databaseURL: "https://todo-oliver-dbaa9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-oliver-dbaa9",
  storageBucket: "todo-oliver-dbaa9.firebasestorage.app",
  messagingSenderId: "713482443543",
  appId: "1:713482443543:web:5b005119fb8cd6d2803552"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);