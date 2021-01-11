import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../context/UserToolsProvider";

export default function Text() {
  const { generateItemID, data, writeNewData, loading } = useUserTools();
  const [userInputBody, setUserInputBody] = useState(null);

  const onClickText = () => {
    if (document.getElementById("body").value) {
      data.push({
        mainindex: generateItemID(data),
        type: "text",
        body: userInputBody,
        position: {
          x: -1,
          y: -1,
        },
      });

      writeNewData();
      document.getElementById("body").value = "";
      setUserInputBody("");
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
      <Button loading={loading} onClick={onClickText}>
        Add text
      </Button>
    </div>
  );
}
