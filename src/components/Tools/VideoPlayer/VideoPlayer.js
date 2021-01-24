import React, { useState, useEffect } from "react";
import MoveElements from "../../UIComponents/MoveElements";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import { Embed } from "semantic-ui-react";

import "./VideoPlayes.scss";

export default function VideoPlayer(props) {
  const { url, index, position, allowEdit, width } = props;
  const [allowMovement, setAllowMovement] = useState(false);
  const [videoWidth, setVideoWidth] = useState();

  const id = url.split("youtube.com/watch?v=");

  useEffect(() => {
    setVideoWidth(width);
  }, [width]);

  return (
    <MoveElements
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div className="video" id={"item" + index}>
        {allowEdit && (
          <Topbar
            videoWidth={videoWidth}
            setVideoWidth={setVideoWidth}
            index={index}
            tool="video"
            allowMovement={allowMovement}
            setAllowMovement={setAllowMovement}
          />
        )}
        <Embed
          id={id.length < 2 ? id[0] : id[1]}
          source="youtube"
          aspectRatio="16:9"
          defaultActive
          autoplay={false}
          style={{ width: videoWidth ? videoWidth + "rem" : width + "rem" }}
        />
      </div>
    </MoveElements>
  );
}
