import React, { useState } from "react";
import { Input, Button, Popup } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function Video(props) {
  const { setData, data, userInput, setNewData } = props;
  const [userInputVideo, setInputVideo] = useState(null);

  const onClickVideo = () => {
    if (userInputVideo.includes("youtube.com/watch?v=")) {
      setData(data.concat({ type: userInput, content: userInputVideo }));
      toast.success("Video added");
      setNewData(false);
    } else {
      toast.error("That's not a Youtube video");
    }
    document.getElementById("inputVideo").value = "";
  };

  return (
    <div className="options-video">
      <Input
        type="text"
        id="inputVideo"
        placeholder="Introduce the URL here"
        maxLength="40"
        onChange={(e) => setInputVideo(e.target.value)}
      />
      <Button onClick={onClickVideo}>Add video</Button>
    </div>
  );
}
