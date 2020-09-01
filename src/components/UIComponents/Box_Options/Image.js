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
    await uploadFile(file[0], uid, imageIndex, "images");
    setData(
      data.concat({ type: userInput, index: imageIndex, subtitle: subtitle })
    );
    setimageIndex(imageIndex + 1);
    setNewData(false);
    toast.success("Image added");
  };

  return (
    <div className="options-image">
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files)}
        icon="file image"
      />
      <Input
        placeholder="Write a subtitle (optional)"
        fluid
        maxLength="100"
        onChange={(event, { value }) => {
          setSubtitle(value);
        }}
      />
      <Button onClick={onClickImage}>Add image</Button>
    </div>
  );
}
