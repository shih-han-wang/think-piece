import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);

// Firestore
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Auth
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
const signOut = () => auth.signOut();

// User document
const createUserProfileDoc = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = Date.now();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return getUserDoc(user.uid);
};

const getUserDoc = async (uid) => {
  if (!uid) return null;

  try {
    const userDoc = await firestore.collection("users").doc(uid).get();
    return { uid, ...userDoc.data() };
  } catch (error) {
    console.error(error);
  }
};

// For debug purpose
window.firebase = firebase;

export { auth, createUserProfileDoc, firestore, signInWithGoogle, signOut };
export default firebase;
