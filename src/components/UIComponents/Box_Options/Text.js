import React, { useState } from "react";
import { Input, Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function Text(props) {
  const { setData, data, setNewData, userInput } = props;

  const [userInputHeader, setUserInputHeader] = useState(null);
  const [userInputBody, setUserInputBody] = useState(null);

  const onClickText = () => {
    if (
      document.getElementById("header").value &&
      document.getElementById("body").value
    ) {
      setData(
        data.concat({
          type: userInput,
          header: userInputHeader,
          body: userInputBody,
        })
      );
      document.getElementById("header").value = "";
      document.getElementById("body").value = "";
      toast.success("Text added");
      setNewData(false);
    } else {
      toast.warning("Please, fill all the fields");
    }
  };

  return (
    <div className="options-text">
      <Input
        id="header"
        type="text"
        onChange={(e) => setUserInputHeader(e.target.value)}
        placeholder="Header"
        maxLength="40"
      ></Input>
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
