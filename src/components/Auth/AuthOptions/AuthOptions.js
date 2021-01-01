import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

export default function AuthOptions(props) {
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <h2>The easiest way to share your ideas!</h2>
      <Button className="register" onClick={() => setSelectedForm("register")}>
        Register
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Sign in
      </Button>
    </div>
  );
}
