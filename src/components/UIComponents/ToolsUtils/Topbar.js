import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import { deleteFile } from "../../../utils/Api";

import "./Topbar.scss";

export default function Topbar(props) {
  const {
    index,
    tool,
    allowMovement,
    setAllowMovement,
    setBackgroundColor,
    defaultcolor,
    img,
    setImg,
    videoWidth,
    setVideoWidth,
  } = props;
  const { setDeleteIndex, dispatch, user, updateRecord } = useUserTools();

  const colors = [
    defaultcolor,
    "#afbcff",
    "#ff3030",
    "#33dc00",
    "#8d8d8d",
    "#d8c412",
  ];

  const onClickDelete = () => {
    switch (tool) {
      case "text":
      case "video":
      case "quiz":
        setDeleteIndex(index);
        break;
      case "file":
        deleteFile(user.uid, index, "files");
        setDeleteIndex(index);
        dispatch({ type: "decreFil" });
        break;
      case "image":
        deleteFile(user.uid, index, "images");
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
      <Popup
        trigger={<Icon name="setting" size="large" />}
        on="click"
        pinned
        basic
        content={
          tool !== "video" && tool !== "image" ? (
            colors.map((x) => {
              return (
                <Icon
                  onClick={() => {
                    setBackgroundColor(x);
                    updateRecord(index, { color: x }, "color");
                  }}
                  key={x}
                  name="circle outline"
                  size="large"
                  style={{ "background-color": x }}
                />
              );
            })
          ) : (
            <>
              <Icon
                name="add circle"
                size="large"
                color="green"
                onClick={() => {
                  if (tool === "image") {
                    setImg({
                      width: img.width + img.width * 0.1,
                      height: img.height + img.height * 0.1,
                    });
                    updateRecord(
                      index,
                      { width: img.width, height: img.height },
                      "resolution"
                    );
                  } else if (tool === "video") {
                    setVideoWidth(
                      videoWidth < 50 ? videoWidth + 5 : videoWidth
                    );
                    updateRecord(index, { width: videoWidth }, "width");
                  }
                }}
              />
              <Icon
                name="minus circle"
                size="large"
                color="red"
                onClick={() => {
                  if (tool === "image") {
                    setImg({
                      width:
                        img.width > 160 && img.height > 160
                          ? img.width - img.width * 0.1
                          : img.width,
                      height:
                        img.height > 160 && img.width > 160
                          ? img.height - img.height * 0.1
                          : img.height,
                    });
                    updateRecord(
                      index,
                      { width: img.width, height: img.height },
                      "resolution"
                    );
                  } else if (tool === "video") {
                    setVideoWidth(
                      videoWidth > 10 ? videoWidth - 5 : videoWidth
                    );
                    updateRecord(index, { width: videoWidth }, "width");
                  }
                }}
              />
            </>
          )
        }
      />
      <Button
        className="close-button"
        icon="close"
        onClick={() => {
          onClickDelete();
        }}
      />
    </div>
  );
}
