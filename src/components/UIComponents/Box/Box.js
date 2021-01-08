import React, { useState } from "react";
import { Dropdown, Icon, Label, Popup, Message } from "semantic-ui-react";
import File from "../Box_Options/File";
import Text from "../Box_Options/Text";
import Video from "../Box_Options/Video";
import Image from "../Box_Options/Image";
import Quiz from "../Box_Options/Quiz";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./Box.scss";

export default function Box(props) {
  const { imageIndex, setimageIndex, fileIndex, setFileIndex } = props;

  const {
    user,
    data,
    setData,
    idBoard,
    boardON,
    setIsBuilding,
  } = useUserTools();

  const [userInput, setUserInput] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(true);

  const selector = () => {
    if (data.length < 20) {
      switch (userInput) {
        case "video":
          return <Video setData={setData} data={data} userInput={userInput} />;

        case "text":
          return <Text setData={setData} data={data} userInput={userInput} />;

        case "quiz":
          return <Quiz setData={setData} data={data} userInput={userInput} />;

        case "image":
          return (
            <Image
              setData={setData}
              data={data}
              uid={user.uid}
              imageIndex={imageIndex}
              setimageIndex={setimageIndex}
              userInput={userInput}
            />
          );

        case "file":
          return (
            <File
              setData={setData}
              uid={user.uid}
              fileIndex={fileIndex}
              data={data}
              setFileIndex={setFileIndex}
              userInput={userInput}
            />
          );
        default:
          return;
      }
    }

    return (
      <Message warning size="large">
        <Message.Header>
          You have reached the limit of items allowed!
        </Message.Header>
        <p>To be able to add new items, you must first delete some</p>
      </Message>
    );
  };

  const options = [
    { key: "text", text: "Text", value: "text" },
    { key: "image", text: "Image", value: "image" },
    { key: "file", text: "PDF", value: "file" },
    { key: "video", text: "Video", value: "video" },
    { key: "quiz", text: "Quiz", value: "quiz" },
  ];

  return (
    <div className={toggleStatus ? "panel__box" : "panel__closed"}>
      {toggleStatus ? (
        <>
          <div className="top-bar">
            <Popup
              content="Board ID"
              position="bottom center"
              trigger={
                <h3>
                  <Icon name="id badge outline" size="large" />
                  {idBoard}
                </h3>
              }
            />

            <div className="top-id">
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
            </div>

            <div className="top-icons">
              <Icon
                name="arrow alternate circle left"
                className={boardON ? "no-arrow" : null}
                size="large"
                onClick={() => {
                  setIsBuilding(false);
                }}
              />
              <Icon
                name="close"
                size="large"
                onClick={() => {
                  setToggleStatus(!toggleStatus);
                }}
              />
            </div>
          </div>
          <div className="selector">
            <h2>Control panel</h2>
            <Dropdown
              placeholder="Pick an option"
              fluid
              selection
              options={options}
              onChange={(event, { value }) => {
                setUserInput(value);
              }}
            />
          </div>

          {selector()}
        </>
      ) : (
        <Icon
          className="close-icon"
          name="pen square"
          onClick={() => {
            setToggleStatus(!toggleStatus);
          }}
        />
      )}
    </div>
  );
}
