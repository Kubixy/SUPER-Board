import React from "react";
import { Button } from "semantic-ui-react";
import { useUserTools } from "../../context/UserToolsProvider";

export default function ErrorMessage(props) {
  const { index } = props;
  const { managementON, setDeleteIndex } = useUserTools();

  return (
    <div className="error-message">
      {managementON && (
        <Button
          className="close-button"
          icon="close"
          onClick={() => {
            setDeleteIndex(index);
          }}
        />
      )}
      <h1>There was an error loading the element</h1>
    </div>
  );
}
