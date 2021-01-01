import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Button, Icon, Popup } from "semantic-ui-react";
import { uploadFile } from "../../../utils/Api";

export default function File(props) {
  const {
    setData,
    uid, //user.uid
    fileIndex,
    data,
    setFileIndex,
    userInput,
    setNewData,
  } = props;

  const [file, setFile] = useState(null);
  const [input, setInput] = useState("");

  const onClickFile = async () => {
    if (file[0].type.includes("pdf")) {
      if (file[0].size / 1024 <= 5000) {
        await uploadFile(file[0], uid, fileIndex, "files");
        setData(
          data.concat({ type: userInput, title: input, index: fileIndex })
        );
        setFileIndex(fileIndex + 1);
        setNewData(false);
        document.getElementById("fileInput").value = "";
        document.getElementById("inputFileName").value = "";
        toast.success("PDF added");
      } else {
        toast.warning("That file is too heavy (5MB limit)");
      }
    } else {
      toast.warning("That's not a PDF file");
    }
  };

  return (
    <div className="options-file">
      <Input
        id="fileInput"
        type="file"
        onChange={(e) => setFile(e.target.files)}
        icon="pdf file outline"
      />{" "}
      <div className="options-file__count">
        <h3>3/3</h3>
        <Popup
          content="Limit of 3 files"
          on="click"
          position="right center"
          pinned
          trigger={<Icon name="question circle" size="large" />}
        />
      </div>
      <Input
        id="inputFileName"
        placeholder="Pick a name for your file (optional)"
        maxLength="100"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></Input>
      <Button onClick={onClickFile}>Add file</Button>
    </div>
  );
}
