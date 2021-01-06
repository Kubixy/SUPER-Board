import React from "react";
import ReactPlayer from "react-player";
import { Button } from "semantic-ui-react";
import { useUserTools } from "../../context/UserToolsProvider";
import Draggable from "react-draggable";

export default function VideoPlayer(props) {
  const { url, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  return (
    <Draggable handle="#handler">
      <div className="video">
        {managementON && (
          <Button
            id="handler"
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
              setNewData(false);
            }}
          />
        )}
        <ReactPlayer controls url={url} width="720px" height="400px" />
      </div>
    </Draggable>
  );
}
