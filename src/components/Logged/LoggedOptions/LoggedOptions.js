import React from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./LoggedOptions.scss";

export default function LoggedOptions(props) {
  const { setSelectedOpt, setIsBuilding } = props;

  return (
    <div className="mainOpt">
      <h2>Control panel</h2>
      <Button onClick={() => setSelectedOpt("find")}>Find a board</Button>
      <Button onClick={() => setIsBuilding(true)}>Create a board</Button>
      <Button onClick={() => setSelectedOpt("profile")}>My profile</Button>
      <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
    </div>
  );
}
