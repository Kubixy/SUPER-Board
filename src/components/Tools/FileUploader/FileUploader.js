import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import { toast } from "react-toastify";
import "firebase/storage";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize/";
import CustomBorders from "../../UIComponents/ToolsUtils/CustomBorders";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./FileUploader.scss";

export default function FileUploader(props) {
  const { fileIndex, title, index, position, allowEdit } = props;
  const { boardFound, userId } = useUserTools();

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child(`files/${boardFound === null ? userId : boardFound}/${fileIndex}`)
      .getDownloadURL()
      .then((response) => {
        setUrl(response);
      });
  });

  const [url, setUrl] = useState(null);

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
    <DrawAndResize index={index} position={position}>
      <div className="fileItem" id={"item" + index}>
        {allowEdit && <Topbar index={index} tool="file" />}
        <div className="fileItem__link" onDoubleClick={() => copyToClipboard()}>
          <Icon name="file pdf outline" size="huge" />
          <p>{title}</p>
        </div>
      </div>
      <CustomBorders />
    </DrawAndResize>
  );
}
