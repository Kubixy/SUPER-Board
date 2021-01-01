import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Label, Popup, Message } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import { writeUserData } from "../../../utils/Api";
import File from "../Box_Options/File";
import Text from "../Box_Options/Text";
import Video from "../Box_Options/Video";
import Image from "../Box_Options/Image";
import Quiz from "../Box_Options/Quiz";
import AskForSave from "../../Modal/Functions/AskForSave";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./Box.scss";

export default function Box(props) {
  const {
    imageIndex,
    setimageIndex,
    fileIndex,
    setFileIndex,
    onDelete,
  } = props;

  const {
    user,
    newData,
    setNewData,
    data,
    setData,
    idClass,
    classON,
    setIsBuilding,
    dispatch,
  } = useUserTools();

  const [userInput, setUserInput] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [saveChangesModal, setSaveChangesModal] = useState(false);

  useEffect(() => {
    dispatch({ type: "reset" });
    data.map((x) => {
      if (x.type == "image") {
        dispatch({ type: "increImg" });
      } else if (x.type == "file") {
        dispatch({ type: "increFil" });
      }
    });
  }, [data]);

  const selector = () => {
    if (data.length - 1 < 20) {
      switch (userInput) {
        case "video":
          return (
            <Video
              setData={setData}
              data={data}
              userInput={userInput}
              setNewData={setNewData}
            />
          );

        case "text":
          return (
            <Text
              setData={setData}
              data={data}
              setNewData={setNewData}
              userInput={userInput}
            />
          );

        case "quiz":
          return (
            <Quiz
              setData={setData}
              data={data}
              setNewData={setNewData}
              userInput={userInput}
            />
          );

        case "image":
          return (
            <Image
              setData={setData}
              data={data}
              uid={user.uid}
              imageIndex={imageIndex}
              setimageIndex={setimageIndex}
              userInput={userInput}
              setNewData={setNewData}
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
              setNewData={setNewData}
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
        <p>In order to add new items, you must delete some before</p>
      </Message>
    );
  };

  const options = [
    { key: "text", text: "Text", value: "text" },
    { key: "video", text: "Video", value: "video" },
    { key: "quiz", text: "Quiz", value: "quiz" },
    { key: "image", text: "Image", value: "image" },
    { key: "file", text: "PDF", value: "file" },
  ];

  return (
    <div className={toggleStatus ? "panel__box" : "panel__closed"}>
      {toggleStatus ? (
        <>
          <div className="top-bar">
            <h3>
              <Icon name="id badge outline" size="large" />
              {idClass}
            </h3>
            <div className="top-icons">
              <Popup
                content="You can create up to 20 items"
                position="bottom center"
                trigger={
                  <Label basic size="medium" as="a">
                    <p>{data.length - 1}</p>
                  </Label>
                }
              />

              <Icon
                name="arrow alternate circle left"
                className={classON ? "no-arrow" : null}
                size="large"
                onClick={() => {
                  if (!newData) setSaveChangesModal(true);
                  else setIsBuilding(false);
                }}
              />
              <Icon
                name="save"
                size="large"
                onClick={() => {
                  writeUserData(user.uid, data);
                  onDelete();
                  setNewData(true);
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

          {
            <BasicModal
              show={saveChangesModal}
              setShow={setSaveChangesModal}
              title="Warning"
            >
              {<AskForSave setShowModal={setSaveChangesModal} />}
            </BasicModal>
          }
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
