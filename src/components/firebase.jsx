import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpzcvbwSn-Vh06TcloDYudIpAAWDAKxAg",
    authDomain: "projectdatabase-faf32.firebaseapp.com",
    projectId: "projectdatabase-faf32",
    storageBucket: "projectdatabase-faf32.appspot.com",
    messagingSenderId: "594056253793",
    appId: "1:594056253793:web:586da7a116ca0e72287520",
    measurementId: "G-QRZFCF1R46"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics(); // Only include this if you need analytics

// Export the database and analytics for use in other parts of your application
export { db, analytics };
