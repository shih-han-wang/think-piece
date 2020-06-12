import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9giyGNIGJQoHHF-EH1t3zBUm41UJjXDk",
  authDomain: "practice-think-piece.firebaseapp.com",
  databaseURL: "https://practice-think-piece.firebaseio.com",
  projectId: "practice-think-piece",
  storageBucket: "practice-think-piece.appspot.com",
  messagingSenderId: "381916573194",
  appId: "1:381916573194:web:cf56bbbbd3e633840f79f3",
  measurementId: "G-SCPLWGCWGZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// For debug purpose
window.firebase = firebase;

export { auth, firestore, signInWithGoogle };
export default firebase;
