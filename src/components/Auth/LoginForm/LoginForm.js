import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import ButtonResetSendEmailVerifaction from "../../Modal/Functions/ButtonResetSendEmailVerifaction";
import { handlerError } from "../../../utils/HandlerError";
import firebase from "../../../utils/Firebase";
import { googleLogin } from "../../../utils/Api";
import "firebase/auth";

import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormErrror] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setFormErrror({});
    let error = {};
    let formOk = {};

    if (!validateEmail(formData.email)) {
      error.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      error.password = true;
      formOk = false;
    }

    setFormErrror(error);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setUser(response.user);
          setUserActive(response.user.emailVerified);
          if (!response.user.emailVerified) {
            toast.warning("Email verification required");
          }
        })
        .catch((err) => {
          handlerError(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login-form">
      <h1>Introduce your credentials</h1>

      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            icon="mail outline"
          />
          {formError.email && (
            <span className="error-text">
              Please, provide a valid email address
            </span>
          )}
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">Invalid password</span>
          )}
        </Form.Field>

        <Button type="submit" loading={isLoading}>
          Sign in
        </Button>

        <div className="google-btn" onClick={googleLogin}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              alt="Google icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with Google</b>
          </p>
        </div>
      </Form>

      {!userActive && (
        <ButtonResetSendEmailVerifaction
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Return</p>
        <p>
          Not registered yet?{" "}
          <span onClick={() => setSelectedForm("register")}>Register here</span>
        </p>
      </div>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}
