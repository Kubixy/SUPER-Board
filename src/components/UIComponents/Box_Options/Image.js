import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { uploadFile } from "../../../utils/Api";

export default function Image(props) {
  const {
    setData,
    data,
    uid,
    imageIndex,
    setimageIndex,
    userInput,
    setNewData,
  } = props;
  const [file, setFile] = useState(null);
  const [subtitle, setSubtitle] = useState("");

  const onClickImage = async () => {
    if (file[0].type.includes("image")) {
      if (file[0].size / 1024 <= 5000) {
        await uploadFile(file[0], uid, imageIndex, "images");
        setData(
          data.concat({
            type: userInput,
            index: imageIndex,
            subtitle: subtitle,
          })
        );

        setimageIndex(imageIndex + 1);
        setNewData(false);
        document.getElementById("imageInput").value = "";
        document.getElementById("subtitleInput").value = "";
        toast.success("Image added");
      } else {
        document.getElementById("imageInput").value = "";
        document.getElementById("subtitleInput").value = "";
        toast.warning("That image is too heavy (5MB limit)");
      }
    } else {
      toast.warning("That's not an image");
    }
  };

  return (
    <div className="options-image">
      <Input
        id="imageInput"
        type="file"
        onChange={(e) => setFile(e.target.files)}
        icon="file image"
      />
      <Input
        id="subtitleInput"
        placeholder="Write a subtitle (optional)"
        maxLength="100"
        onChange={(event, { value }) => {
          setSubtitle(value);
        }}
      />
      <Button onClick={onClickImage}>Add image</Button>
    </div>
  );
}
