import React, { useState } from "react";
import {
  Checkbox,
  Popup,
  Divider,
  Input,
  Button,
  Header,
} from "semantic-ui-react";

export default function ClassLocker(props) {
  const [pinState, setPinState] = useState(false);
  const [accesState, setAccesState] = useState(false);

  //const onChange = () => {};

  return (
    <div className="classLocker">
      <div className="classLocker__passwordSettings">
        <Header as="h3" block>
          You can lock your class with a password here
        </Header>

        <div className="classLocker__passwordSettings__input">
          <Input placeholder="Type your pin" type="tel" />
          <div className="classLocker__passwordSettings__input__buttons">
            <Popup
              content="The pin will only work if you activate this option"
              trigger={
                <Checkbox
                  toggle
                  label={
                    pinState ? "Users need a pin" : "Users don't need a pin"
                  }
                  onChange={() => {
                    setPinState(!pinState);
                  }}
                />
              }
            />
            <Popup
              content="You can decide here whether only registered users can access your class or not"
              trigger={
                <Checkbox
                  toggle
                  label={
                    accesState
                      ? "Limited access"
                      : "Any user can access my class"
                  }
                  onChange={() => {
                    setAccesState(!accesState);
                  }}
                />
              }
            />
          </div>
        </div>
      </div>

      <div className="classLocker__bottom">
        <Divider />

        <div className="classLocker__preferences">
          <Button
            content="Save"
            primary
            label="Any changes not saved will be discarded"
          />
        </div>
      </div>
    </div>
  );
}
