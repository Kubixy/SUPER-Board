import React, { useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import { writeUserData, deleteFile } from "../../../utils/Api";
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
    imgArrayToDelete,
    fileIndex,
    setFileIndex,
    fileArrayToDelete,
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
  } = useUserTools();

  const [userInput, setUserInput] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [saveChangesModal, setSaveChangesModal] = useState(false);

  const hitToggle = () => {
    setToggleStatus(!toggleStatus);
  };

  const onDelete = async () => {
    if (imgArrayToDelete.length > 0) {
      for (let i = 0; i < imgArrayToDelete.length; i++) {
        await deleteFile(user, imgArrayToDelete[i], "images");
      }
    }

    if (fileArrayToDelete.length > 0) {
      for (let i = 0; i < fileArrayToDelete.length; i++) {
        await deleteFile(user, fileArrayToDelete[i], "files");
      }
    }
  };

  const options = [
    { key: "text", text: "Text", value: "text" },
    { key: "video", text: "Video", value: "video" },
    { key: "quiz", text: "Quiz", value: "quiz" },
    { key: "image", text: "Image", value: "image" },
    { key: "file", text: "File", value: "file" },
  ];

  const selector = () => {
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
    }
  };

  return (
    <div className={toggleStatus ? "panel__box" : "panel__closed"}>
      {toggleStatus ? (
        <>
          <div className="top-bar">
            <h3 className={classON ? "no-arrow" : null}>
              <Icon name="id badge outline" size="large" />
              {idClass}
            </h3>
            <div className="top-icons">
              {!classON && (
                <>
                  <Icon
                    name="arrow alternate circle left"
                    size="large"
                    onClick={() => {
                      if (!newData) setSaveChangesModal(true);
                      else setIsBuilding(false);
                    }}
                  />
                </>
              )}
              <Icon
                name="save"
                size="large"
                onClick={() => {
                  writeUserData(user.uid, data);
                  onDelete();
                  setNewData(true);
                }}
              />
              <Icon name="close" size="large" onClick={hitToggle} />
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
        <Icon className="close-icon" name="pen square" onClick={hitToggle} />
      )}
    </div>
  );
}
