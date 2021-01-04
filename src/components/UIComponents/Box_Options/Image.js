import React, { useState } from "react";
import { Input, Button, Icon, Popup } from "semantic-ui-react";
import { toast } from "react-toastify";
import { uploadFile } from "../../../utils/Api";
import { useUserTools } from "../../../context/UserToolsProvider";

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

  const { state, dispatch } = useUserTools();

  const [file, setFile] = useState(null);
  const [subtitle, setSubtitle] = useState("");

  const onClickImage = async () => {
    if (file) {
      if (file[0].type.includes("image")) {
        if (state.images < 3) {
          if (file[0].size / 1024 <= 5120) {
            await uploadFile(file[0], uid, imageIndex, "images");
            let newData = data;
            newData.push({
              type: userInput,
              index: imageIndex,
              subtitle: subtitle,
            });
            setData(newData);

            setimageIndex(imageIndex + 1);
            setNewData(false);
            dispatch({ type: "increImg" });
            setSubtitle("");
            toast.success("Image added");
          } else {
            toast.warning("That image is too heavy (5MB limit)");
          }
        } else {
          toast.warning("You've reached the limit of images allowed");
        }
      } else {
        toast.warning("That's not an image");
      }
    } else {
      toast.warning("No image selected");
    }
    document.getElementById("imageInput").value = "";
    document.getElementById("subtitleInput").value = "";
  };

  return (
    <div className="options-image">
      <Input
        id="imageInput"
        type="file"
        onChange={(e) => setFile(e.target.files)}
        icon="file image"
      />
      <div className="options-image__count">
        <h3>{state.images}/3</h3>
        <Popup
          content="Limit of 3 images (5MB max each)"
          on="click"
          position="right center"
          pinned
          trigger={<Icon name="question circle" size="large" />}
        />
      </div>
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
