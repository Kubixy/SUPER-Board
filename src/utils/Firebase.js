import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAeCRUKbSYMzwcFi1gDLD38m4F1YrfMejc",
  authDomain: "super-board-21e3d.firebaseapp.com",
  databaseURL: "https://super-board-21e3d.firebaseio.com",
  projectId: "super-board-21e3d",
  storageBucket: "super-board-21e3d.appspot.com",
  messagingSenderId: "720232599966",
  appId: "1:720232599966:web:1df79757b6133f6c49068f",
  measurementId: "G-SWCE1QT3PM",
};

export default firebase.initializeApp(firebaseConfig);
