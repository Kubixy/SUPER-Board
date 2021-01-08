import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useUserTools } from "../../../context/UserToolsProvider";
import { writeUserData } from "../../../utils/Api";

export default function Text(props) {
  const { setData, data, userInput } = props;
  const { generateItemID, user } = useUserTools();
  const [userInputBody, setUserInputBody] = useState(null);

  const onClickText = () => {
    if (document.getElementById("body").value) {
      data.push({
        mainindex: generateItemID(data),
        type: userInput,
        body: userInputBody,
        position: {
          x: 500,
          y: 500,
        },
      });

      setData(data);
      document.getElementById("body").value = "";
      writeUserData(user.uid, data).catch((error) => {
        console.log("Error (Text) --> ", error);
      });
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
