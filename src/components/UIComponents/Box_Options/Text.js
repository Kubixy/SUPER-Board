import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function Text(props) {
  const { setData, data, setNewData, userInput } = props;
  const { generateItemID } = useUserTools();
  const [userInputBody, setUserInputBody] = useState(null);

  const onClickText = () => {
    if (document.getElementById("body").value) {
      data.push({
        mainindex: generateItemID(data),
        type: userInput,
        body: userInputBody,
      });
      setData(data);
      document.getElementById("body").value = "";
      toast.success("Text added");
      setNewData(false);
    } else {
      toast.warning("Please, fill all the fields");
    }
  };

  return (
    <div className="options-text">
      <Form.TextArea
        id="body"
        onChange={(e) => setUserInputBody(e.target.value)}
        placeholder="Write here"
        maxLength="600"
      />
      <Button onClick={onClickText}>Add text</Button>
    </div>
  );
}
