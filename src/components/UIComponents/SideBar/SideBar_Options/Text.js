import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../../context/UserToolsProvider";

export default function Text() {
  const { generateItemID, data, writeNewData } = useUserTools();
  const [userInputBody, setUserInputBody] = useState(null);

  const onClickText = () => {
    if (document.getElementById("body").value) {
      data.push({
        mainindex: generateItemID(data),
        type: "text",
        body: userInputBody,
        position: {
          x: 500,
          y: 500,
        },
      });

      writeNewData();
      document.getElementById("body").value = "";
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
