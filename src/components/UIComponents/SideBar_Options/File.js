import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Button, Icon, Popup } from "semantic-ui-react";
import { useUserTools } from "../../../context/UserToolsProvider";
import { uploadFile } from "../../../utils/Api";

export default function File(props) {
  const {
    state,
    dispatch,
    generateItemID,
    userId,
    data,
    writeNewData,
    loading,
  } = useUserTools();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const onClickFile = async () => {
    if (file) {
      if (state.files < 3) {
        if (file.length === 1 && file[0].type.includes("pdf")) {
          if (file[0].size / 1024 <= 5120) {
            let index = generateItemID(data);
            uploadFile(file[0], userId, index, "files");
            data.push({
              mainindex: index,
              type: "file",
              title: input ? input : fileName,
              color: "#97a8ff",
              position: {
                x: -1,
                y: -1,
              },
            });

            await writeNewData();
            document.getElementById("fileInput").value = "";
            setFileName("No file selected");
            dispatch({ type: "increFil" });
          } else {
            toast.warning("That file is too heavy (5MB limit)");
            document.getElementById("fileInput").value = "";
          }
        } else {
          toast.warning("That's not a PDF file");
        }
      } else {
        toast.warning("You've reached the limit of files allowed");
      }
    } else {
      toast.warning("No PDF selected");
    }
    document.getElementById("inputFileName").value = "";
  };

  return (
    <div className="options-file">
      <Input
        id="fileInput"
        type="file"
        onChange={(e) => {
          setFile(e.target.files);
          setFileName(e.target.files[0].name);
        }}
        icon="pdf file outline"
      />
      <div className="options-file__count">
        <h3>{state.files}/3</h3>
        <Popup
          content="Limit of 3 files (5MB max each)"
          on="click"
          position="right center"
          pinned
          trigger={<Icon name="question circle" size="large" />}
        />
      </div>
      <Input
        id="inputFileName"
        placeholder="Pick a name for your file"
        maxLength="25"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></Input>
      <Button loading={loading} onClick={onClickFile}>
        Add file
      </Button>
      <span>{fileName}</span>
    </div>
  );
}
