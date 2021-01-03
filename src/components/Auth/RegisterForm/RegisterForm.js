import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../../utils/Firebase";
import { validateEmail } from "../../../utils/Validations";
import { googleLogin } from "../../../utils/Api";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    setFormError({});
    let error = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      error.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      error.password = true;
      formOk = false;
    }

    if (!formData.username) {
      error.username = true;
      formOk = false;
    }

    setFormError(error);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          changeUserName();
          sendVerificationEmail();
        })
        .catch(() => toast.error("It seems there's been an error..."))
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        toast.error("Error when assigning the user name");
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("A verification email has been sent");
      })
      .catch(() => {
        toast.error("Error sending verification email");
      });
  };

  return (
    <div className="register-form">
      <h1>Registration is free. What are you waiting for?</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && <span className="error-text">Invalid email</span>}
        </Form.Field>

        <Form.Field>
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
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              The password must contain at least 6 characters
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Name"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Please, introduce a name</span>
          )}
        </Form.Field>

        <Button type="submit" loading={isLoading}>
          <span>Next</span>
        </Button>

        <div class="google-btn" onClick={googleLogin}>
          <div class="google-icon-wrapper">
            <img
              class="google-icon"
              alt="Google icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p class="btn-text">
            <b>Sign in with Google</b>
          </p>
        </div>
      </Form>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Return</p>
        <p>
          Already registered?{" "}
          <span onClick={() => setSelectedForm("login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}
