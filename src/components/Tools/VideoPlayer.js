import React from "react";
import ReactPlayer from "react-player";
import { Button } from "semantic-ui-react";
import { useUserTools } from "../../context/UserToolsProvider";

export default function VideoPlayer(props) {
  const { url, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  return (
    <>
      <div className="video">
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
        <ReactPlayer controls url={url} width="720px" height="400px" />
      </div>
    </>
  );
}
