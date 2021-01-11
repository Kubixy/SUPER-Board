import React from "react";
import { Container } from "semantic-ui-react";
import DrawAndResize from "../../UIComponents/DrawAndResize";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./ShowText.scss";

export default function ShowText(props) {
  const { body, index, position, allowEdit } = props;

  return (
    <DrawAndResize index={index} position={position}>
      <div className="ShowText" id={"item" + index}>
        {allowEdit && <Topbar index={index} tool="standard" />}
        <Container>
          <p>{body}</p>
        </Container>
      </div>
      <CustomBorders />
    </DrawAndResize>
  );
}
