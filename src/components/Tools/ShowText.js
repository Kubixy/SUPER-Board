import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { useUserTools } from "../../context/UserToolsProvider";
import DrawAndResize from "../UIComponents/DrawAndResize/DrawAndResize";

export default function ShowText(props) {
  const { body, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  return (
    <DrawAndResize index={index}>
      <div className="text" id={"item" + index}>
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
          <Icon name="move" size="large" />
          <h1>{body}</h1>
        </Container>
      </div>
    </DrawAndResize>
  );
}
