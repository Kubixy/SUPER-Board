import React, { useState } from "react";
import DrawAndResize from "../../UIComponents/DrawAndResize";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./ShowText.scss";

export default function ShowText(props) {
  const { body, index, position, allowEdit } = props;
  const [allowMovement, setAllowMovement] = useState(false);

  return (
    <DrawAndResize
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div className="ShowText" id={"item" + index}>
        {allowEdit && (
          <Topbar
            index={index}
            tool="standard"
            allowMovement={allowMovement}
            setAllowMovement={setAllowMovement}
          />
        )}
        <div
          className="enableMovement"
          onMouseMove={() => {
            if (allowMovement) setAllowMovement(false);
          }}
        >
          <p>{body}</p>
        </div>
      </div>
      <CustomBorders />
    </DrawAndResize>
  );
}
