import React, { useState, useEffect } from "react";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./DrawAndResize.scss";

export default function DrawAndResize(props) {
  const { children, index } = props;
  const { updatePositionRecord, positionRecord } = useUserTools();
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState([0, 0]);
  const [isDown, setIsDown] = useState(false);

  const mousedown = (e) => {
    let divOverlay = document.getElementById("movingContainer" + index);
    setIsDown(true);
    setOffset([
      divOverlay.offsetLeft - e.clientX,
      divOverlay.offsetTop - e.clientY,
    ]);
  };

  const mouseup = () => {
    setIsDown(false);
  };

  const mousemove = (e) => {
    let divOverlay = document.getElementById("movingContainer" + index);
    if (isDown) {
      setItemPosition({
        x: e.clientX + offset[0],
        y: e.clientY + offset[1],
      });
      divOverlay.style.left = fixLimits(e.clientX + offset[0], "x") + "px";
      divOverlay.style.top = fixLimits(e.clientY + offset[1], "y") + "px";
    }
  };

  const fixLimits = (value, axis) => {
    let panelHeight = document.getElementsByClassName("panel__input")[0]
      .clientHeight;
    let panelWidth = document.getElementsByClassName("panel__input")[0]
      .clientWidth;
    let itemHeight = document.getElementById("item" + index).clientHeight;
    let itemWidth = document.getElementById("item" + index).clientWidth;

    if (axis === "y" && value + itemHeight > panelHeight)
      return panelHeight - itemHeight;
    else if (axis === "x" && value + itemWidth > panelWidth)
      return panelWidth - itemWidth;

    return value > 0 ? value : 0;
  };

  useEffect(() => {
    if (positionRecord && positionRecord.length > 0) {
      for (let i = 0; i < positionRecord.length; i++) {
        if (positionRecord[i].index === index) {
          document.getElementById("movingContainer" + index).style.left =
            positionRecord[i].position.x + "px";
          document.getElementById("movingContainer" + index).style.top =
            positionRecord[i].position.y + "px";
          break;
        }
      }
    }
  }, [positionRecord, index]);

  return (
    <div
      className="movingContainerClass"
      id={"movingContainer" + index}
      onMouseDown={(e) => {
        mousedown(e);
      }}
      onMouseUp={() => {
        updatePositionRecord(index, { x: itemPosition.x, y: itemPosition.y });
        mouseup();
      }}
      onMouseMove={(e) => {
        mousemove(e);
      }}
    >
      {children}
    </div>
  );
}
