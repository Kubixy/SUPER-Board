import React, { useState } from "react";
import DrawAndResize from "../../UIComponents/DrawAndResize";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import { Embed } from "semantic-ui-react";

import "./VideoPlayes.scss";

export default function VideoPlayer(props) {
  const { url, index, position, allowEdit } = props;
  const [allowMovement, setAllowMovement] = useState(false);

  const id = url.split("youtube.com/watch?v=");

  return (
    <DrawAndResize
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
      noResize={false}
    >
      <div className="video" id={"item" + index}>
        {allowEdit && (
          <Topbar
            index={index}
            tool="standard"
            allowMovement={allowMovement}
            setAllowMovement={setAllowMovement}
          />
        )}
        <Embed
          id={id.length < 2 ? id[0] : id[1]}
          source="youtube"
          aspectRatio="16:9"
        />
      </div>
    </DrawAndResize>
  );
}
