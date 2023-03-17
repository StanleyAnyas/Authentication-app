import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAk0EATsYdG5Lx828ErqkVf4PZpp0szuUg",
    authDomain: "authentication-1132c.firebaseapp.com",
    projectId: "authentication-1132c",
    storageBucket: "authentication-1132c.appspot.com",
    messagingSenderId: "549984925854",
    appId: "1:549984925854:web:20f0d9def3608056d1a38f",
    measurementId: "G-ZJQ1TQQF8V"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);