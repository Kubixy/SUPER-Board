import React, { useState } from "react";
import { Header, Icon, Input, Button } from "semantic-ui-react";
import { LFBoard, getPublicStatus } from "../../../utils/Api";
import { useUserTools } from "../../../context/UserToolsProvider";
import { toast } from "react-toastify";
import { setVisitors } from "../../../utils/Api";

import "./LFBoard.scss";

export default function (props) {
  const { setSelectedOpt, setIsBuilding } = props;
  const { setIdBoard, setBoardFound, user } = useUserTools();
  const [input, setInput] = useState(null);
  const [error, setError] = useState(false);

  const onClick = () => {
    if (input) {
      LFBoard(input).then((response) => {
        if (response !== undefined) {
          getPublicStatus(input).then((isPublic) => {
            if (isPublic) {
              setBoardFound(response);
              setIdBoard(input);
              setIsBuilding(true);
              setVisitors(input, user);
            } else {
              toast.warning("This board is not public");
            }
          });
        } else {
          setError(true);
          toast.warning("Board not found");
        }
      });
    }
  };

  return (
    <div className="LFBoard">
      <Header as="h2">
        <Icon name="search" />
        <Header.Content>Search a board by ID</Header.Content>
      </Header>
      <div className="input">
        <Input
          onKeyPress={(e) => {
            if (e.key === "Enter") onClick();
          }}
          onChange={(e) => setInput(e.target.value)}
          error={error}
        />
        <Icon
          name="arrow alternate circle right"
          size="big"
          onClick={() => onClick()}
        />
      </div>
      <Button onClick={() => setSelectedOpt(null)}>
        <h3>Return</h3>
        <Icon name="angle double right" size="large" color="red" />
      </Button>
    </div>
  );
}
