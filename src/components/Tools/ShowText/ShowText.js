import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
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
          <div className="ShowText__topbar">
            <Icon name="setting" size="large" />
            <Button
              className="close-button"
              icon="close"
              onClick={() => {
                setDeleteIndex(index);
              }}
            />
          </div>
        )}
        <Container>
          <p>{body}</p>
        </Container>
      </div>
      <div className="left-custom-border"></div>
      <div className="left-bottom-border"></div>
    </DrawAndResize>
  );
}
