import React, { useState } from "react";
import { Input, Button, Icon, Popup } from "semantic-ui-react";
import { toast } from "react-toastify";
import { uploadFile } from "../../../../utils/Api";
import { useUserTools } from "../../../../context/UserToolsProvider";

export default function Image(props) {
  const { imageIndex, setimageIndex, writeNewData } = props;
  const {
    state,
    dispatch,
    generateItemID,
    userId,
    data,
    render,
  } = useUserTools();
  const [file, setFile] = useState(null);

  const onClickImage = () => {
    if (file) {
      if (file[0].type.includes("image")) {
        if (state.images < 3) {
          if (file[0].size / 1024 <= 5120) {
            uploadFile(file[0], userId, imageIndex, "images");
            data.push({
              mainindex: generateItemID(data),
              type: "image",
              index: imageIndex,
              position: {
                x: 500,
                y: 500,
              },
            });

            writeNewData();
            render();
            setimageIndex(imageIndex + 1);
            dispatch({ type: "increImg" });
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

      <Button onClick={onClickImage}>Add image</Button>
    </div>
  );
}
