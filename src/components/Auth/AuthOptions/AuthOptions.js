import React from "react";
import { Button } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const { setSelectedForm } = props;
  const { setGuestSession } = useUserTools();

  const noAccount = () => {
    setGuestSession(true);
  };

  return (
    <div className="auth-options">
      <h2>Join now a growing community of students and teachers!</h2>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Register
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Sign in
      </Button>
      <Button className="freeLog" onClick={() => noAccount()}>
        Limited experience
      </Button>
    </div>
  );
}
