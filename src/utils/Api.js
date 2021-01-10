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
  return db.collection("boards").doc(userId).set({ data: data });
}

/*
Loads the user data on Classmaker (render)
If there is none, it returns a null value
*/
export async function readUserData(userId) {
  let output = null;

  await db
    .collection("boards")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) output = doc.data().data;
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
  let output = { id: null, user: null };

  await db
    .collection("sessions")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.data().user !== undefined && uid === doc.data().user) {
          output.id = doc.id;
          output.user = doc.data().user;
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
      console.log("Error (LFBoard) --> ", err);
    });

  return output;
}

/*
Adds a session to a new user
*/
export function addBoard(uid) {
  let unique,
    values = [];
  let newID = Math.floor(Math.random() * (100000 - 1000)).toString();

  db.collection("sessions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        values.push(doc.id);
      });
    });

  do {
    unique = true;
    for (let i of values) {
      if (newID === i) {
        unique = false;
        newID = Math.floor(Math.random() * (100000 - 1000)).toString();
        break;
      }
    }
  } while (!unique);

  return db.collection("sessions").doc(newID).set({ user: uid, visitors: [] });
}

export const getVisitors = async (idBoard) => {
  let output;

  await db
    .collection("sessions")
    .doc(idBoard)
    .get()
    .then((querySnapshot) => {
      output = querySnapshot.data().visitors;
    });

  return output;
};

export const setVisitors = async (idBoard, user) => {
  let visitors_local,
    isRepeated = false;

  visitors_local = await getVisitors(idBoard);

  for (let i of visitors_local) {
    if (i.visitorUID === user.uid) {
      isRepeated = true;
      break;
    }
  }

  if (!isRepeated) {
    let d = new Date();

    visitors_local.push({
      visitorUID: user.uid,
      photo: user.photoURL,
      name: user.displayName,
      visitDate: d.getFullYear() + "/" + d.getMonth() + 1 + "/" + d.getDate(),
    });

    await db
      .collection("sessions")
      .doc(idBoard)
      .update({ visitors: visitors_local });
  }
};

export function uploadFile(file, uid, index, folder) {
  firebase.storage().ref().child(`${folder}/${uid}/${index}`).put(file);
}

export function deleteFile(uid, index, folder) {
  firebase
    .storage()
    .ref()
    .child(`${folder}/${uid}/${index}`)
    .delete()
    .catch((err) => {
      console.log("Error (deleteFile) --> ", err);
    });
}

export const deleteUserDataStorage = (folders, uid) => {
  for (let i = 0; i < folders.length; i++) {
    firebase
      .storage()
      .ref()
      .child(`${folders[i]}/${uid}`)
      .listAll()
      .then(({ items }) => {
        for (let j = 0; j < items.length; j++) {
          deleteFile(uid, items[j].name, folders[i]);
        }
      })
      .catch((error) => {
        console.log("Error (deleteUserData) --> ", error);
      });
  }
};

export const deleteUserDataFirestore = (uid, document, toDelete) => {
  let myCollection = db.collection(document).doc(uid);

  for (let i = 0; i < toDelete.length; i++) {
    myCollection
      .update({ [toDelete[i]]: firebase.firestore.FieldValue.delete() })
      .catch((error) => {
        console.log("Error (deleteUserDataFirestore) --> ", error);
      });
  }

  myCollection.delete().catch((error) => {
    console.log("Error (deleteUserDataFirestore) --> ", error);
  });

  userIdFinder(uid).then(({ id }) => {
    if (id) deleteUserDataFirestore(id, "sessions", ["user", "visitors"]);
  });
};

export function googleLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
  //.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  //var credential = result.credential;
  // This gives you a Google Access Token. You can use it to access the Google API.
  //var token = credential.accessToken;
  // The signed-in user info.
  //var user = result.user;
  // ...
  //})
  //.catch((err) => {
  //  console.log("Error (googleLogin) --> ", err);
  // Handle Errors here.
  //var errorCode = error.code;
  //var errorMessage = error.message;
  // The email of the user's account used.
  //var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  //var credential = error.credential;
}
