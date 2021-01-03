import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate, googleLogin } from "../../utils/Api";

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

  const onSubmit = () => {
    setIsLoading(true);
    reauthenticate(formData.userPass)
      .then(() => {
        user
          .delete()
          .then(() => {
            toast.success("Account successfully deleted");
          })
          .catch((error) => {
            toast.warning("Something went wrong");
            console.log(error);
          });
      })
      .catch(() => {
        toast.warning("Incorrect password");
      });
    setIsLoading(false);
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
              onClick={() =>
                googleLogin()
                  .then(() => {
                    user.delete();
                    toast.success("Account successfully deleted");
                  })
                  .catch(() => toast.warning("Something went wrong"))
              }
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
