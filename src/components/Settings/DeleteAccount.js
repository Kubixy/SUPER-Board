import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import {
  reauthenticate,
  googleLogin,
  deleteUserDataStorage,
  deleteUserDataFirestore,
} from "../../utils/Api";

export default function DeleteAccount(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("");
    setContentModal(
      <AccountDeletion user={user} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <Button inverted onClick={onEdit}>
      Delete account
    </Button>
  );
}

function AccountDeletion(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState({ userPass: "" });
  const [isLoading, setIsLoading] = useState(false);

  const userDataDeletionCall = () => {
    deleteUserDataStorage(["files", "images", "avatar"], user.uid);
    deleteUserDataFirestore(user.uid, "boards", ["data"]);
    user.delete();
  };

  const onSubmit = () => {
    reauthenticate(formData.userPass)
      .then(() => {
        userDataDeletionCall();
        toast.success("Account successfully deleted");
      })
      .catch(() => {
        toast.warning("Incorrect password");
      });
  };

  switch (user.providerData[0].providerId) {
    case "password":
      return (
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Input
              placeholder="Please, reintroduce your password"
              onChange={(e) => setFormData({ userPass: e.target.value })}
            />
          </Form.Field>
          <Button type="submit" loading={isLoading}>
            Delete account
          </Button>
        </Form>
      );

    case "google.com":
      return (
        <div className="googleOption__deletion">
          <h1>Confirm your decision</h1>
          <div>
            <Button
              size="large"
              negative
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                googleLogin()
                  .then(() => {
                    userDataDeletionCall();
                    setIsLoading(false);
                    toast.success("Account successfully deleted");
                  })
                  .catch(() => toast.warning("Something went wrong"));
              }}
            >
              Delete
            </Button>
            <Button size="large" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      );

    default:
      return <h1>Please, reload your browser</h1>;
  }
}
