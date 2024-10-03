// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc, setDoc, getFirestore, getDoc, updateDoc,
  getDocs, collection, query, where, addDoc } from  "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVTaAqpM7rK6CqEs6otuB1AKInJHkr-dA",
  authDomain: "event-calendar-3423e.firebaseapp.com",
  projectId: "event-calendar-3423e",
  storageBucket: "event-calendar-3423e.appspot.com",
  messagingSenderId: "517548633911",
  appId: "1:517548633911:web:bb0d856c659fc1321ef4b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db, app, doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where, addDoc
}
