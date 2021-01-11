import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import { toast } from "react-toastify";
import "firebase/storage";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize/";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./FileUploader.scss";

export default function FileUploader(props) {
  const { title, index, position, allowEdit } = props;
  const { boardFound, userId } = useUserTools();
  const [url, setUrl] = useState(null);
  const [allowMovement, setAllowMovement] = useState(false);

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child(`files/${boardFound === null ? userId : boardFound}/${index}`)
      .getDownloadURL()
      .then((response) => {
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
    <DrawAndResize
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div className="fileItem" id={"item" + index}>
        {allowEdit && (
          <Topbar
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
      <CustomBorders />
    </DrawAndResize>
  );
}
