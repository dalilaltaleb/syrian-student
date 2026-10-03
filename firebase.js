import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAMriY0ObEZXwYAV7AIIUgmEixYpsXoRH8",
  authDomain: "syrian-student-guide.firebaseapp.com",
  projectId: "syrian-student-guide",
  storageBucket: "syrian-student-guide.firebasestorage.app",
  messagingSenderId: "182771148937",
  appId: "1:182771148937:web:7af8e40016b4bd6351be58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);