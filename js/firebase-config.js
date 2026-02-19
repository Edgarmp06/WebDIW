import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB6_KqhskfYNmO24FSzDVeyRe33q4qKT54", 
  authDomain: "tecoche-4da0a.firebaseapp.com",
  projectId: "tecoche-4da0a",
  storageBucket: "tecoche-4da0a.appspot.com",
  messagingSenderId: "238116693475",
  appId: "1:238116693475:web:e616368613712ce66d2cd6" 
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };

