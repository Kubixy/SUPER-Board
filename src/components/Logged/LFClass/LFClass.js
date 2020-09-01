import React, { useState } from "react";
import { Header, Icon, Input, Button } from "semantic-ui-react";
import { LFAula } from "../../../utils/Api";
import { toast } from "react-toastify";

import "./LFClass.scss";

export default function (props) {
  const {
    setSelectedOpt,
    setManagment,
    setIsBuilding,
    setClassFound,
    setClassON,
  } = props;
  const [input, setInput] = useState(null);
  const [error, setError] = useState(false);

  const onClick = () => {
    if (input !== null) {
      LFAula(input).then((response) => {
        if (response !== undefined) {
          setClassFound(response);
          setManagment(false);
          setIsBuilding(true);
          setClassON(true);
        } else {
          setError(true);
          toast.warning("Classroom not found");
        }
      });
    }
  };

  return (
    <div className="LFClass">
      <Header as="h2">
        <Icon name="student" />
        <Header.Content>Search class by ID</Header.Content>
      </Header>
      <div className="input">
        <Input onChange={(e) => setInput(e.target.value)} error={error} />
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
