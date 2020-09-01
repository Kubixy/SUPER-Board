import React, { useState } from "react";
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import Logged from "./pages/Logged/MainUI";
import ClassMaker from "./pages/ClassMaker";

function App(props) {
  const { useUserTools } = props;
  const { setUser, user, isBuilding, guestSession } = useUserTools();
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
      {!user && !guestSession ? (
        <Auth />
      ) : !isBuilding ? (
        <Logged useUserTools={useUserTools} />
      ) : (
        <ClassMaker useUserTools={useUserTools} />
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
