import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function Video(props) {
  const { setData, data, userInput, setNewData } = props;
  const [userInputVideo, setInputVideo] = useState(null);

  const onClickVideo = () => {
    setData(data.concat({ type: userInput, content: userInputVideo }));
    toast.success("Video added");
    document.getElementById("inputVideo").value = "";
    setNewData(false);
  };

  return (
    <div className="options-video">
      <Input
        type="text"
        id="inputVideo"
        placeholder="Introduce the URL here"
        onChange={(e) => setInputVideo(e.target.value)}
      />
      <Button onClick={onClickVideo}>Add video</Button>
    </div>
  );
}
