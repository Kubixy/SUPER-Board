import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../../context/UserToolsProvider";

export default function Text() {
  const { generateItemID, data, writeNewData, render } = useUserTools();
  const [userInputBody, setUserInputBody] = useState(null);
  const [loading, setLoading] = useState(false);

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

      writeNewData(setLoading);
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
