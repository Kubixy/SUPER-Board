import React from "react";
import { Button } from "semantic-ui-react";
import { writeUserData } from "../../../utils/Api";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function AskForSaveNavBar(props) {
  const { setShowModal, render } = props;
  const { data, setNewData, setManagment, classFound } = useUserTools();

  return (
    <div className="AskForSave">
      <h2>
        You have unsaved changes. Are you sure you want to leave without saving
        them?
      </h2>
      <Button
        onClick={() => {
          writeUserData(classFound, data);
          setShowModal(false);
          setManagment(false);
          setNewData(true);
        }}
      >
        Save changes
      </Button>
      <Button
        onClick={() => {
          setShowModal(false);
          setManagment(false);
          setNewData(true);
          render();
        }}
      >
        Leave without saving
      </Button>
    </div>
  );
}
