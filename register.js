import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

const form = document.querySelector("#signup-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered successfully:", user.uid);
            alert("Signup successful! Redirecting to login page...");
            window.location = 'login.html'
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
});
