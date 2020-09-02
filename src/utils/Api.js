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

//guarda los datos del usuarios cuando se pulsa el botón de guardado
//en Box (componente de ClassMaker)
export function writeUserData(userId, data) {
  db.collection("aulas").doc(userId).set({ data });
}

export async function getId(sessionId) {
  let output = null;

  await db
    .collection("sesiones")
    .doc(sessionId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("Error al cargar el documento (readUserData)");
      } else {
        output = doc.data().activeUsers;
      }
    })
    .catch((err) => {
      console.log("Error (readUserData) --> ", err);
    });

  return output;
}

//carga los datos del aula virtual en ClassMaker para renderizarlos
//y en caso de que no encuentre nada o encuentre un error devuelve un valor nulo;
export async function readUserData(userId) {
  let output = null;

  await db
    .collection("aulas")
    .doc(userId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("Error al cargar el documento (readUserData)");
      } else {
        output = doc.data().data;
      }
    })
    .catch((err) => {
      console.log("Error (readUserData) --> ", err);
    });

  return output;
}

//compruebo si el usario tiene un aula
//si lo obtengo, devuelvo su id en ClassMaker
//en el caso de que no esté. lo creo en ClassMaker con la función addAula
export async function userIdFinder(uid, classON) {
  //status permite comprobar en ClassMaker si es necsario crear un id
  //id se refiere al id del aula, este valor sólo se utiliza si status es true
  let output = { status: false, id: null };

  await db
    .collection("sesiones")
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

//Busca en sesiones el id de la clase y devuelve su ID
//este ID es del usuario que cuenta con un documento en aulas
export async function LFAula(idClass) {
  let output;

  await db
    .collection("sesiones")
    .doc(idClass)
    .get()
    .then(function (querySnapshot) {
      output = querySnapshot.data().user;
    })
    .catch((err) => {
      console.log("Error (LFAula) --> ", err);
    });

  return output;
}

//Añade una sesión a un usuario
//Falta una función que compruebe que el id generado no haya sido ya creado
export function addAula(uid) {
  return db
    .collection("sesiones")
    .doc(Math.floor(Math.random() * (100000 - 1000)).toString())
    .set({ user: uid, activeUsers: 0 });
}

export function uploadFile(file, uid, index, folder) {
  const ref = firebase.storage().ref().child(`${folder}/${uid}/${index}`);
  return ref.put(file);
}

export function deleteFile(uid, index, folder) {
  const ref = firebase.storage().ref().child(`${folder}/${uid}/${index}`);
  return ref.delete();
}
