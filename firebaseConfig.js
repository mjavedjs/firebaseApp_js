import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

 
const firebaseConfig = {
  apiKey: "AIzaSyAHW7ArBCO1fkbFUlUQWXGN2zgMgXvQMaQ",
  authDomain: "fir-app-e239d.firebaseapp.com",
  databaseURL: "https://fir-app-e239d-default-rtdb.firebaseio.com",
  projectId: "fir-app-e239d",
  storageBucket: "fir-app-e239d.firebasestorage.app",
  messagingSenderId: "697660143807",
  appId: "1:697660143807:web:22d2231937288e933e2e0a"
};

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db  = getFirestore(app);
