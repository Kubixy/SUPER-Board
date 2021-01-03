import firebaseApp from "./Firebase";
import * as firebase from "firebase";
const db = firebase.firestore(firebaseApp);

export const reauthenticate = (password) => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credentials);
};

/*
Loads the user data on Firebase when the user presses the save button
ClassMaker > Box
*/
export function writeUserData(userId, data) {
  return db.collection("boards").doc(userId).set({ data });
}

/*
Loads the user data on Classmaker
If there is none, it returns a null value
*/
export async function readUserData(userId) {
  let output = null;

  await db
    .collection("boards")
    .doc(userId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("Error loading the doc (readUserData)");
      } else {
        output = doc.data().data;
      }
    })
    .catch((err) => {
      console.log("Error (readUserData) --> ", err);
    });

  return output;
}

/*
This function checks if the user has a board.
If the user has one, it returns its id in ClassMaker.
If the user doesn't have one, Classmaker will recieve a null value
and will call add board to create one.
*/
export async function userIdFinder(uid) {
  let output = { status: false, id: null };

  await db
    .collection("sessions")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().user !== undefined && uid === doc.data().user) {
          output.status = true;
          output.id = doc.id;
        }
      });
    })
    .catch((err) => {
      console.log("Error (userIdFinder) --> ", err);
    });

  return output;
}

/*
Looks for a session with the id introduced 
and returns the owner of the session
*/
export async function LFBoard(idBoard) {
  let output;

  await db
    .collection("sessions")
    .doc(idBoard)
    .get()
    .then(function (querySnapshot) {
      output = querySnapshot.data().user;
    })
    .catch((err) => {
      console.log("Error (LFAula) --> ", err);
    });

  return output;
}

/*
Adds a session to a new user
--> CHECK DUPLICATES
*/
export function addBoard(uid) {
  return db
    .collection("sessions")
    .doc(Math.floor(Math.random() * (100000 - 1000)).toString())
    .set({ user: uid, activeUsers: 0 });
}

export function uploadFile(file, uid, index, folder) {
  firebase.storage().ref().child(`${folder}/${uid}/${index}`).put(file);
}

export function deleteFile(uid, index, folder) {
  firebase
    .storage()
    .ref()
    .child(`${folder}/${uid}/${index}`)
    .delete()
    .then(() => {
      console.log("Success!");
    })
    .catch(() => {
      console.log("Something went wrong :(");
    });
}

export function googleLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    //.then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    //var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    // ...
    //})
    .catch((error) => {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
    });
}
