import React, { useState, useEffect } from "react";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./DrawAndResize.scss";

export default function DrawAndResize(props) {
  const { children, index, position } = props;
  const { updatePositionRecord } = useUserTools();
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState([0, 0]);
  const [isDown, setIsDown] = useState(false);

  const container = document.getElementById("movingContainer" + index);
  const item = document.getElementById("item" + index);
  const panel = document.getElementsByClassName("panel__input")[0];
  const windowResolution = {
    width: window.innerWidth,
    heigth: window.innerHeight,
  };

  const mousedown = (e) => {
    setIsDown(true);
    if (offset)
      setOffset([
        container.offsetLeft - e.clientX,
        container.offsetTop - e.clientY,
      ]);
  };

  const mouseup = () => {
    setIsDown(false);
  };

  const mousemove = (e) => {
    if (isDown) {
      setItemPosition({
        x: e.clientX + offset[0],
        y: e.clientY + offset[1],
      });
      container.style.left = fixLimits(e.clientX + offset[0], "x") + "px";
      container.style.top = fixLimits(e.clientY + offset[1], "y") + "px";
    }
  };

  const fixLimits = (value, axis) => {
    if (axis === "y" && value + item.clientHeight > panel.clientHeight)
      return panel.clientHeight - item.clientHeight;
    else if (axis === "x" && value + item.clientWidth > panel.clientWidth)
      return panel.clientWidth - item.clientWidth;

    return value > 0 ? value : 0;
  };

  useEffect(() => {
    if (container && position) {
      container.style.left = position.x + "px";
      container.style.top = position.y + "px";
      setItemPosition({
        x: position.x,
        y: position.y,
      });
    }
  }, [position, index, container]);

  useEffect(() => {
    function handleWindowResize() {
      if (container) {
        container.style.left =
          fixLimits(
            itemPosition.x - (windowResolution.width - window.innerWidth),
            "x"
          ) + "px";
        container.style.top =
          fixLimits(
            itemPosition.y - (windowResolution.heigth - window.innerHeight),
            "y"
          ) + "px";
      }
    }
    window.addEventListener("resize", handleWindowResize);
  });

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
