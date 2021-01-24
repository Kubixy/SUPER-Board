import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../context/UserToolsProvider";
import MoveElements from "../../UIComponents/MoveElements";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import { getStorageFiles } from "../../../utils/Api";

import "./FileUploader.scss";

export default function FileUploader(props) {
  const { title, index, position, allowEdit, color } = props;
  const { boardFound, userId } = useUserTools();
  const [url, setUrl] = useState(null);
  const [allowMovement, setAllowMovement] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    getStorageFiles(boardFound, userId, index, "files").then((response) => {
      setUrl(response);
    });
  });

  const copyToClipboard = () => {
    let newElement = document.createElement("input");
    newElement.value = url;
    document.body.appendChild(newElement);
    newElement.select();
    document.execCommand("copy");
    document.body.removeChild(newElement);
    toast.success("The link has been copied");
  };

  return (
    <MoveElements
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div
        className="fileItem"
        id={"item" + index}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : color,
        }}
      >
        {allowEdit && (
          <Topbar
            defaultcolor="#97a8ff"
            setBackgroundColor={setBackgroundColor}
            index={index}
            tool="file"
            setAllowMovement={setAllowMovement}
            allowMovement={allowMovement}
          />
        )}
        <div
          className="fileItem__link"
          onMouseMove={() => {
            if (allowMovement) setAllowMovement(false);
          }}
          onDoubleClick={() => copyToClipboard()}
        >
          <Icon name="file pdf outline" size="huge" />
          <p>{title}</p>
        </div>
      </div>
      {allowEdit && <CustomBorders />}
    </MoveElements>
  );
}
