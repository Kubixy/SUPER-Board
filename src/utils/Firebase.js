import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLP2KWBVBDM02-KUZNJt6pNcnxGVC0_ls",
  authDomain: "tfg-aules.firebaseapp.com",
  databaseURL: "https://tfg-aules.firebaseio.com",
  projectId: "tfg-aules",
  storageBucket: "tfg-aules.appspot.com",
  messagingSenderId: "1029272825203",
  appId: "1:1029272825203:web:2bde7966251f9acac66906",
  measurementId: "G-P8CZMT76TF",
};

export default firebase.initializeApp(firebaseConfig);
