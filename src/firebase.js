import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyC2DJkXr2BovUnOaXHdOVkmqHAJb2gRQ1o",
    authDomain: "animerank-a7bed.firebaseapp.com",
    projectId: "animerank-a7bed",
    storageBucket: "animerank-a7bed.appspot.com",
    messagingSenderId: "629078998635",
    appId: "1:629078998635:web:432abdf66a60b5ef203b2e",
    measurementId: "G-TDZ4NPMEPW"
});

export default app;