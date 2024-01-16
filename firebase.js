// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZEpDtcwf07OtjKQqwJSjVBjZxrB_ny4",
  authDomain: "certificadosconic-4b951.firebaseapp.com",
  projectId: "certificadosconic-4b951",
  storageBucket: "certificadosconic-4b951.appspot.com",
  messagingSenderId: "189278527265",
  appId: "1:189278527265:web:6a908977ba8513040c2860",
  measurementId: "G-JY087YX482"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };