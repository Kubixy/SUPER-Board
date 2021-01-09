import React, { useState } from "react";
import { Icon, Label } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import UserListNavBar from "../../Modal/Functions/UserListNavBar";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./NavBar.scss";

export default function NavBar(props) {
  const { allowEdit, visitorState, toggleStatus, setToggleStatus } = props;
  const { endClassCallback, idBoard, render } = useUserTools();
  const [showModalUserList, setShowModalUserList] = useState(false);

  return (
    <div className="navBar">
      <div className="navBar__left">
        <Icon
          name="hand point left"
          size="big"
          circular="true"
          onClick={() => {
            endClassCallback();
          }}
        />
        <Icon
          name="refresh"
          size="big"
          circular="true"
          onClick={() => {
            render();
          }}
        />
        {allowEdit && (
          <Icon
            name="edit"
            size="big"
            circular="true"
            onClick={() => {
              setToggleStatus(!toggleStatus);
            }}
          />
        )}
      </div>
      <div className="navBar__center">
        <Label basic size="medium" as="a" circular>
          <p>{idBoard}</p>
        </Label>
      </div>
      <div className="navBar__right" onClick={() => setShowModalUserList(true)}>
        <Icon name="users" size="big" />
        <h1>{visitorState.length}</h1>
      </div>
      {
        <BasicModal
          show={showModalUserList}
          setShow={setShowModalUserList}
          title=""
        >
          {
            <UserListNavBar
              setShowModal={setShowModalUserList}
              visitorState={visitorState}
            />
          }
        </BasicModal>
      }
    </div>
  );
}
