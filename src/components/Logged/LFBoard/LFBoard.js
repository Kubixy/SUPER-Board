import React, { useState } from "react";
import { Header, Icon, Input, Button } from "semantic-ui-react";
import { LFBoard } from "../../../utils/Api";
import { toast } from "react-toastify";

import "./LFBoard.scss";

export default function (props) {
  const {
    setSelectedOpt,
    setManagment,
    setIsBuilding,
    setBoardFound,
    setBoardON,
  } = props;

  const [input, setInput] = useState(null);
  const [error, setError] = useState(false);

  const onClick = () => {
    if (input !== null) {
      LFBoard(input).then((response) => {
        if (response !== undefined) {
          setBoardFound(response);
          setManagment(false);
          setIsBuilding(true);
          setBoardON(true);
        } else {
          setError(true);
          toast.warning("Board not found");
        }
      });
    }
  };

  return (
    <div className="LFClass">
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
