import React, { useState } from "react";
import { Input, Button, Icon, Popup } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../../context/UserToolsProvider";

export default function Video() {
  const { generateItemID, data, writeNewData, render } = useUserTools();
  const [userInputVideo, setInputVideo] = useState(null);

  const onClickVideo = () => {
    if (userInputVideo) {
      if (userInputVideo.includes("youtube.com/watch?v=")) {
        data.push({
          mainindex: generateItemID(data),
          type: "quiz",
          content: userInputVideo,
          position: {
            x: 500,
            y: 500,
          },
        });

        writeNewData();
        render();
      } else {
        toast.error("That's not a Youtube video");
      }
      document.getElementById("inputVideo").value = "";
    }
  };

  return (
    <div className="options-video">
      <Popup
        content="Only Youtube videos are allowed"
        position="right center"
        pinned
        trigger={
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="youtube" size="big" link circular />
          </a>
        }
      ></Popup>
      <Input
        type="text"
        id="inputVideo"
        placeholder="Introduce the URL here"
        maxLength="100"
        onChange={(e) => setInputVideo(e.target.value)}
      />
      <Button onClick={onClickVideo}>Add video</Button>
    </div>
  );
}
