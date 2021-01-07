import React from "react";
import { Container, Button } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize";

import "./ShowText.scss";

export default function ShowText(props) {
  const { body, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  return (
    <DrawAndResize index={index}>
      <div className="ShowText" id={"item" + index}>
        {managementON && (
          <Button
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
              setNewData(false);
            }}
          />
        )}
        <Container textAlign="center">
          <h1>{body}</h1>
        </Container>
      </div>
    </DrawAndResize>
  );
}
