import React from "react";
import { Container, Divider, Button } from "semantic-ui-react";
import { useUserTools } from "../../context/UserToolsProvider";

export default function ShowText(props) {
  const { header, body, index } = props;
  const { setNewData, managementON, setDeleteIndex } = useUserTools();

  return (
    <>
      <div className="text">
        {managementON && (
          <Button
            className="close-button"
            icon="close"
            onClick={() => {
              setDeleteIndex(index);
              setNewData(false);
            }}
          />
        )}
        <Container textAlign="center">
          <h1>{header}</h1>
          <Divider />
          <h3>{body}</h3>
        </Container>
      </div>
    </>
  );
}
