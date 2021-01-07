import React from "react";
import { Button } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize";

export default function ErrorMessage(props) {
  const { index } = props;
  const { managementON, setDeleteIndex } = useUserTools();

  return (
    <DrawAndResize index={index}>
      <div className="error-message" id={"item" + index}>
        {managementON && (
          <Button
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
            }}
          />
        )}
        <h1>There was an error loading the element</h1>
      </div>
    </DrawAndResize>
  );
}
