import React from "react";
import { Button } from "semantic-ui-react";
import { writeUserData } from "../../../utils/Api";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function AskForSave(props) {
  const { setShowModal } = props;
  const { data, userId, setIsBuilding, setNewData } = useUserTools();

  return (
    <div className="AskForSave">
      <h2>
        You have unsaved changes. Are you sure you want to leave without saving
        them?
      </h2>
      <Button
        onClick={() => {
          writeUserData(userId, data);
          setIsBuilding(false);
          setShowModal(false);
          setNewData(true);
        }}
      >
        Save changes
      </Button>
      <Button
        onClick={() => {
          setIsBuilding(false);
          setShowModal(false);
          setNewData(true);
        }}
      >
        Leave without saving
      </Button>
    </div>
  );
}
