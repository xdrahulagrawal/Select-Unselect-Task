import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTNfcz68zDkwAQwGBU6fhaFTQQOTa16cU",
    authDomain: "sndkcorp-auth.firebaseapp.com",
    projectId: "sndkcorp-auth",
    storageBucket: "sndkcorp-auth.appspot.com",
    messagingSenderId: "674934579045",
    appId: "1:674934579045:web:620be83f11febb1b884b8c",
    measurementId: "G-4TRZN7J0H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };