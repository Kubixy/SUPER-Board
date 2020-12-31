import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
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
    await uploadFile(file[0], uid, fileIndex, "files");
    setData(data.concat({ type: userInput, title: input, index: fileIndex }));
    setFileIndex(fileIndex + 1);
    setNewData(false);
    setFile(null);
    setInput("");
  };

  return (
    <div className="options-file">
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files)}
        icon="pdf file outline"
      />
      <Input
        placeholder="Pick a name for your file (optional)"
        maxLength="100"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></Input>
      <Button onClick={onClickFile}>Add file</Button>
    </div>
  );
}
