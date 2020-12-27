import React from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./LoggedOptions.scss";

export default function LoggedOptions(props) {
  const { setSelectedOpt, setIsBuilding } = props;
  const { user, setGuestSession } = useUserTools();

  const LogOut = () => {
    user ? firebase.auth().signOut() : setGuestSession(false);
  };

  return (
    <div className="mainOpt">
      <h2>Control panel</h2>
      <Button onClick={() => setSelectedOpt("find")}>Find a board</Button>
      {user && (
        <>
          <Button onClick={() => setIsBuilding(true)}>Create a board</Button>
          <Button onClick={() => setSelectedOpt("profile")}>My profile</Button>
        </>
      )}
      <Button onClick={() => LogOut()}>Sign out</Button>
    </div>
  );
}
