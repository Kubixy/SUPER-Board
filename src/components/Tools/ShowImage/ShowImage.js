import React, { useState, useEffect } from "react";
import { useUserTools } from "../../../context/UserToolsProvider";
import MoveElements from "../../UIComponents/MoveElements";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";
import { getStorageFiles } from "../../../utils/Api";

import "./ShowImage.scss";

export default function ShowImage(props) {
  const { index, position, allowEdit, resolution } = props;
  const { userId, boardFound } = useUserTools();
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState();
  const [imgResize, setImgResize] = useState(null);
  const [allowMovement, setAllowMovement] = useState(false);
  const [state, setstate] = useState(true); // ???

  useEffect(() => {
    getStorageFiles(boardFound, userId, index, "images")
      .then((response) => {
        setUrl(response);
      })
      .catch((error) => {
        console.log("Error (ShowImage) --> ", error);
        setstate(!state);
      });
  }, [index, boardFound, userId, state]);

  useEffect(() => {
    setImg({
      width: resolution.width,
      height: resolution.height,
    });
  }, [resolution]);

  const onLoad = () => {
    if (img.width <= 1) {
      let width = imgResize.naturalWidth;
      let height = imgResize.naturalHeight;

      if ((width || height) > 3000) {
        width = width - width * 0.95;
        height = height - height * 0.95;
      } else if ((width || height) > 2000) {
        width = width - width * 0.85;
        height = height - height * 0.85;
      } else if ((width || height) > 1000) {
        width = width - width * 0.75;
        height = height - height * 0.75;
      } else if ((width || height) > 500) {
        width = width - width * 0.25;
        height = height - height * 0.25;
      }

      setImg({ width: width, height: height });
    }
  };

  return (
    <MoveElements
      index={index}
      position={position}
      setAllowMovement={setAllowMovement}
      allowMovement={allowMovement}
    >
      <div className="image" id={"item" + index}>
        {allowEdit && (
          <Topbar
            setImg={setImg}
            img={img}
            index={index}
            tool="image"
            setAllowMovement={setAllowMovement}
            allowMovement={allowMovement}
          />
        )}
        <img
          ref={(ref) => setImgResize(ref)}
          onLoad={() => {
            onLoad();
          }}
          onMouseMove={() => {
            if (allowMovement) setAllowMovement(false);
          }}
          src={url}
          width={img ? img.width : resolution.width}
          height={img ? img.height : resolution.height}
          alt=""
        />
      </div>
    </MoveElements>
  );
}
