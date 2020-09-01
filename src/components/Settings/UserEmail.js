import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import { alertErrors } from "../../utils/AlertErrors";
import firebase from "../../utils/Firebase";
import "firebase/auth";
import { validateEmail } from "../../utils/Validations";

export default function UserEmail(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Update email");
    setContentModal(
      <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <div className="user-email">
      <Icon name="mail" size="large" />
      <h3>{user.email}</h3>
      <Icon name="edit outline" onClick={onEdit} size="large" />
    </div>
  );
}

function ChangeEmailForm(props) {
  const { email, setShowModal } = props;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.email) {
      toast.warning("You've introduced the same email");
    } else if (!validateEmail(formData.email)) {
      toast.warning("The format of the email is not correct");
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateEmail(formData.email)
            .then(() => {
              toast.success("Email updated");
              setIsLoading(false);
              setShowModal(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              });
            })
            .catch((err) => {
              alertErrors(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          alertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update email
      </Button>
    </Form>
  );
}
