import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0EQY0cv8Ao4vFqmmwGu0SqQcuQo2aXlQ",
  authDomain: "clone-7fb26.firebaseapp.com",
  projectId: "clone-7fb26",
  storageBucket: "clone-7fb26.appspot.com",
  messagingSenderId: "259984260657",
  appId: "1:259984260657:web:54bba877ec1b6857581f10",
  measurementId: "G-BZCE8BRG93"
};
 firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();

  const auth = firebase.auth();
  // const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, db };