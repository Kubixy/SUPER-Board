import React, { useState, useEffect } from "react";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import { useUserTools } from "../../../context/UserToolsProvider";
import DrawAndResize from "../../UIComponents/DrawAndResize";
import Topbar from "../../UIComponents/ToolsUtils/Topbar";

export default function ShowImage(props) {
  const { index, position, allowEdit } = props;
  const { userId, boardFound } = useUserTools();

  const [url, setUrl] = useState(null);
  const [img, setImg] = useState({ width: 1, height: 1 });

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
    let width = img.naturalWidth;
    let height = img.naturalHeight;

    //Rescale the img in case it's too big
    if ((width || height) > 3000) {
      width = width - width * 0.95;
      height = height - height * 0.95;
    } else if ((width || height) > 2000) {
      width = width - width * 0.85;
      height = height - height * 0.85;
    } else if ((width || height) > 1000) {
      width = width - width * 0.5;
      height = height - height * 0.5;
    } else if ((width || height) > 500) {
      width = width - width * 0.25;
      height = height - height * 0.25;
    }

    setImg({ width: width, height: height });
  };

  return (
    <DrawAndResize index={index} position={position}>
      <div className="image" id={"item" + index}>
        {allowEdit && <Topbar index={index} tool="image" />}
        <img
          ref={(ref) => setImg(ref)}
          onLoad={() => {
            onLoad();
          }}
          src={url}
          width={img.width !== 1 ? img.width : 1}
          height={img.height !== 1 ? img.height : 1}
          alt=""
        />
      </div>
    </DrawAndResize>
  );
}
