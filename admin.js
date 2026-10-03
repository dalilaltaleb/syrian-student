import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const firebaseConfig = {
     apiKey: "AIzaSyAMriY0ObEZXwYAV7AIIUgmEixYpsXoRH8",
    authDomain: "syrian-student-guide.firebaseapp.com",
    projectId: "syrian-student-guide",
    storageBucket: "syrian-student-guide.firebasestorage.app",
    messagingSenderId: "182771148937",
    appId: "1:182771148937:web:7af8e40016b4bd6351be58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");
const message = document.getElementById("login-message");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "جاري تسجيل الدخول...";

    try {

       await signInWithEmailAndPassword(auth, email, password);

message.textContent = "تم تسجيل الدخول بنجاح ✅";

setTimeout(() => {
    window.location.href = "dashboard.html";
}, 500);

    } catch (error) {

        console.error(error);

        message.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة ❌";
    }

});