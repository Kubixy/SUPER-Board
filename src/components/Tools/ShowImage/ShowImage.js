import React, { useState, useEffect } from "react";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import { useUserTools } from "../../../context/UserToolsProvider";
import MoveElements from "../../UIComponents/MoveElements";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

import "./ShowImage.scss";

export default function ShowImage(props) {
  const { index, position, allowEdit, resolution } = props;
  const { userId, boardFound } = useUserTools();
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState({
    width: resolution.width,
    height: resolution.height,
  });
  const [imgResize, setImgResize] = useState(null);
  const [allowMovement, setAllowMovement] = useState(false);

  useEffect(() => {
    firebase
      .storage()
      .ref()
      .child(`images/${boardFound === null ? userId : boardFound}/${index}`)
      .getDownloadURL()
      .then((response) => {
        setUrl(response);
      });
  });

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
          width={img.width}
          height={img.height}
          alt=""
        />
      </div>
    </MoveElements>
  );
}
