import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw8HI_RdUrMQCrfFitVU1842hzn4XhxU4",
  authDomain: "my-amazo-clone.firebaseapp.com",
  projectId: "my-amazo-clone",
  storageBucket: "my-amazo-clone.appspot.com",
  messagingSenderId: "722757216903",
  appId: "1:722757216903:web:f3d3c8511a7d6271332622",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbase = app.firestore();
