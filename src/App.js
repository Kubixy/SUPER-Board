import React, { useState } from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import Logged from "./pages/Logged/MainUI";
import BoardMaker from "./pages/BoardMaker";

function App(props) {
  const { useUserTools } = props;
  const { setUser, user, isBuilding } = useUserTools();
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : !isBuilding ? (
        <Logged useUserTools={useUserTools} />
      ) : (
        <BoardMaker useUserTools={useUserTools} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
