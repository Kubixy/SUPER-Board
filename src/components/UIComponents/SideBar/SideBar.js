import React, { useState } from "react";
import { Menu, Popup, Icon, Label } from "semantic-ui-react";
import Text from "../SideBar_Options/Text";
import Image from "../SideBar_Options/Image";
import File from "../SideBar_Options/File";
import Video from "../SideBar_Options/Video";
import Quiz from "../SideBar_Options/Quiz";
import DrawAndResize from "../DrawAndResize";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./SideBar.scss";

export default function SideBar(props) {
  const { data, idBoard, setIsBuilding } = useUserTools();
  const [userSelection, setUserSelection] = useState("");

  return (
    <DrawAndResize index={0}>
      <div className="Sidebar" id="item0">
        <div className="Sidebar__topbar">
          <div className="Sidebar__topbar--left">
            <Popup
              content="Board ID"
              position="bottom center"
              trigger={
                <h3>
                  <Icon name="id badge outline" size="large" />
                  <p>{idBoard}</p>
                </h3>
              }
            />
          </div>

          <Popup
            content="You can create up to 20 items"
            position="bottom center"
            trigger={
              <Label
                basic
                size="medium"
                as="a"
                circular
                style={
                  data.length < 21
                    ? null
                    : { "background-color": "red", color: "white" }
                }
              >
                <p>{data.length}</p>
              </Label>
            }
          />

          <div className="Sidebar__topbar--right">
            <Icon
              name="arrow alternate circle left"
              size="large"
              onClick={() => {
                setIsBuilding(false);
              }}
            />
            <Icon name="close" size="large" />
          </div>
        </div>

        <Menu fluid vertical className="Sidebar__menu">
          <Menu.Item
            name="text"
            id={userSelection !== "text" ? "effects" : ""}
            onClick={(e, { name }) => {
              setUserSelection(name);
            }}
          >
            {userSelection === "text" ? <Text /> : "Text"}
          </Menu.Item>
          <Menu.Item
            name="image"
            id={userSelection !== "image" ? "effects" : ""}
            onClick={(e, { name }) => {
              setUserSelection(name);
            }}
          >
            {userSelection === "image" ? <Image /> : "Image"}
          </Menu.Item>
          <Menu.Item
            name="file"
            id={userSelection !== "file" ? "effects" : ""}
            onClick={(e, { name }) => {
              setUserSelection(name);
            }}
          >
            {userSelection === "file" ? <File /> : "File"}
          </Menu.Item>
          <Menu.Item
            name="video"
            id={userSelection !== "video" ? "effects" : ""}
            onClick={(e, { name }) => {
              setUserSelection(name);
            }}
          >
            {userSelection === "video" ? <Video /> : "Video"}
          </Menu.Item>
          <Menu.Item
            name="quiz"
            id={userSelection !== "quiz" ? "effects" : ""}
            onClick={(e, { name }) => {
              setUserSelection(name);
            }}
          >
            {userSelection === "quiz" ? "Quiz" : "Quiz"}
          </Menu.Item>
        </Menu>
      </div>
    </DrawAndResize>
  );
}
