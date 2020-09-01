import React, { useState } from "react";
import UploadAvatar from "../../Settings/UpdateAvatar";
import UserName from "../../Settings/UserName";
import UserEmail from "../../Settings/UserEmail";
import UserPassword from "../../Settings/UserPassword";
import BasicModal from "../../../components/Modal/BasicModal";
import { Button, Icon } from "semantic-ui-react";

import "./Profile.scss";

export default function Profile(props) {
  const { user, setSelectedOpt } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className="settings">
      <div className="top">
        <h1>User panel</h1>
        <UploadAvatar user={user} />
      </div>

      <div className="data">
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
        />

        <UserEmail
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
        />

        <UserPassword
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
        />
      </div>

      <Button className="goBack" onClick={() => setSelectedOpt(null)}>
        <h3>Return</h3>{" "}
        <Icon name="angle double right" size="large" color="red" />
      </Button>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}
