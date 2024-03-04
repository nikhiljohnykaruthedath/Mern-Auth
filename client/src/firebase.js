// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-auth-a43d1.firebaseapp.com",
	projectId: "mern-auth-a43d1",
	storageBucket: "mern-auth-a43d1.appspot.com",
	messagingSenderId: "225961726131",
	appId: "1:225961726131:web:5d039048a70f678e8ea0c6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
