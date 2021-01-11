import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import { deleteFile } from "../../../utils/Api";

import "./Topbar.scss";

export default function Topbar(props) {
  const { index, tool, allowMovement, setAllowMovement } = props;
  const { setDeleteIndex, dispatch, uid } = useUserTools();

  const onClick = () => {
    switch (tool) {
      case "standard":
        setDeleteIndex(index);
        break;
      case "file":
        deleteFile(uid, index, "files");
        setDeleteIndex(index);
        dispatch({ type: "decreFil" });
        break;
      case "image":
        deleteFile(uid, index, "images");
        setDeleteIndex(index);
        dispatch({ type: "decreImg" });
        break;
      default:
    }
  };

  return (
    <div
      className="topbar"
      onMouseMove={() => {
        if (!allowMovement) setAllowMovement(true);
      }}
    >
      <Icon name="setting" size="large" />
      <Button
        className="close-button"
        icon="close"
        onClick={() => {
          onClick();
        }}
      />
    </div>
  );
}
