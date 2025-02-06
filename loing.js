import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User login  successfully:", user.uid);
            alert("Login successful! Redirecting to home page...");
            window.location = 'home.html'
                
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
});
