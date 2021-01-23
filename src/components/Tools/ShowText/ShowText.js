import React, { useState } from "react";
import MoveElements from "../../UIComponents/MoveElements";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./ShowText.scss";

export default function ShowText(props) {
  const { body, index, position, allowEdit, color } = props;
  const [allowMovement, setAllowMovement] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState();

  return (
    <MoveElements
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div
        className="ShowText"
        id={"item" + index}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : color,
        }}
      >
        {allowEdit && (
          <Topbar
            defaultcolor="#fff"
            setBackgroundColor={setBackgroundColor}
            index={index}
            tool="text"
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
      {allowEdit && <CustomBorders />}
    </MoveElements>
  );
}
