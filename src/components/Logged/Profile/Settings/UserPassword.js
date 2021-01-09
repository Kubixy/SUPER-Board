import React, { useState } from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../../../utils/Api";
import { alertErrors } from "../../../../utils/AlertErrors";
import firebase from "../../../../utils/Firebase";
import "firebase/auth";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Update password");
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="user-password">
      <Icon name="lock" size="large" />
      <h3>************</h3>
      <Icon name="edit outline" onClick={onEdit} size="large" />
    </div>
  );
}

function ChangePasswordForm(props) {
  const { setShowModal } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const eyePass = (e) => {
    return e ? "text" : "password";
  };

  const eyeStatus = (e) => {
    return e ? "eye slash outline" : "eye";
  };

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("The password field can not be empty.");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("The new password must be different.");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("The new passwords do not match.");
    } else if (formData.newPassword.length < 6) {
      toast.warning("The password must have at least 6 characters.");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Password updated");
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
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
          placeholder="Current password"
          type={eyePass(showPassword)}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={eyeStatus(showPassword)}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="New password"
          type={eyePass(showPassword)}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={eyeStatus(showPassword)}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Type the new password again"
          type={eyePass(showPassword)}
          onChange={(e) =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={eyeStatus(showPassword)}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update password
      </Button>
    </Form>
  );
}
