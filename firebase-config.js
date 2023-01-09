// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1tdUqSUvpQnCc4O_KYMVQAwhHWQ4OJ4Y",
    authDomain: "cs4261todoapp.firebaseapp.com",
    databaseURL: "https://cs4261todoapp-default-rtdb.firebaseio.com",
    projectId: "cs4261todoapp",
    storageBucket: "cs4261todoapp.appspot.com",
    messagingSenderId: "256519611208",
    appId: "1:256519611208:web:bd33243dc45ea0390e897d",
    measurementId: "G-856C7CPVSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };