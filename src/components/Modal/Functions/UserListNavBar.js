import React from "react";
import { Table } from "semantic-ui-react";
import NoAvatar from "../../../assets/png/DefaultUser.png";

export default function UserListNavBar(props) {
  const { visitorState } = props;
  let key = 0;

  return (
    <div className="UserListNavBar">
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3" textAlign="center">
              Visitors
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Visit date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Photo</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {visitorState.map((x) => {
            return (
              <Table.Row key={++key}>
                <Table.Cell collapsing textAlign="center">
                  {x.visitDate}
                </Table.Cell>
                <Table.Cell collapsing textAlign="center">
                  <img
                    src={x.photo ? x.photo : NoAvatar}
                    width="50px"
                    height="50px"
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell collapsing textAlign="center">
                  {x.name}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
