import React from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import LogoName from "../../../assets/png/logo-main-login.png";

import "./LoggedOptions.scss";

export default function LoggedOptions(props) {
  const { setSelectedOpt, setIsBuilding } = props;

  return (
    <div className="mainOpt">
      <img src={LogoName} alt="Board logo" />
      <div className="mainOpt__buttons">
        <Button onClick={() => setSelectedOpt("find")}>Find a board</Button>
        <Button onClick={() => setIsBuilding(true)}>Create a board</Button>
        <Button onClick={() => setSelectedOpt("profile")}>My profile</Button>
        <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
      </div>
    </div>
  );
}
