import React, { useState } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../../../utils/Firebase";
import "firebase/auth";

export default function UserName(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Update name");
    setContentModal(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="user-name">
      <Icon name="user" size="large" />
      <h3>{user.displayName}</h3>
      <Icon name="edit outline" onClick={onEdit} size="large" />
    </div>
  );
}

function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal } = props;
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          toast.success("Name updated");
          setIsLoading(false);
          setShowModal(false);
        })
        .catch(() => {
          toast.error("There was an error updating your name");
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update name
      </Button>
    </Form>
  );
}
