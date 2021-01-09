import React from "react";
import { Container, Button } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize";

import "./ShowText.scss";

export default function ShowText(props) {
  const { body, index, position, allowEdit } = props;
  const { setDeleteIndex } = useUserTools();

  return (
    <DrawAndResize index={index} position={position}>
      <div className="ShowText" id={"item" + index}>
        {allowEdit && (
          <Button
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
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
