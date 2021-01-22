import React, { useState, useEffect } from "react";
import { Menu, Popup, Icon, Label, Button } from "semantic-ui-react";
import Text from "../SideBar_Options/Text";
import Image from "../SideBar_Options/Image";
import File from "../SideBar_Options/File";
import Video from "../SideBar_Options/Video";
import Quiz from "../SideBar_Options/Quiz";
import BasicModal from "../../Modal/BasicModal";
import MoveElements from "../MoveElements";
import { useUserTools } from "../../../context/UserToolsProvider";
import { getPublicStatus, setPublicStatus } from "../../../utils/Api";
import UserListNavBar from "../../Modal/Functions/UserListNavBar";

import "./SideBar.scss";
import { toast } from "react-toastify";

export default function SideBar(props) {
  const {
    data,
    idBoard,
    setIsBuilding,
    setBoardFound,
    boardFound,
    setData,
    render,
  } = useUserTools();
  const { allowEdit, setAllowEdit, visitorState, userOwnsBoard } = props;
  const [userSelection, setUserSelection] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showExtendedMenu, setShowExtendedMenu] = useState(false);
  const [boardIsPublic, setBoardIsPublic] = useState(null);
  const [showModalUserList, setShowModalUserList] = useState(false);

  useEffect(() => {
    if (idBoard)
      getPublicStatus(idBoard)
        .then((status) => setBoardIsPublic(status))
        .catch((error) => console.log("Error (SideBar) --> ", error));
  }, [idBoard]);

  return (
    <>
      <MoveElements index={0} userOwnsBoard={userOwnsBoard}>
        {userOwnsBoard && (
          <div className="Sidebar">
            {showExtendedMenu && (
              <div className="Sidebar__extendedOptions">
                <Label
                  onClick={() => {
                    setShowModalUserList(true);
                  }}
                >
                  Visits
                  <Label.Detail>{visitorState.length}</Label.Detail>
                </Label>
                <Popup
                  trigger={
                    <Icon
                      name={boardIsPublic ? "eye" : "hide"}
                      size="large"
                      onClick={() => {
                        setPublicStatus(idBoard, !boardIsPublic);
                        setBoardIsPublic(!boardIsPublic);
                        toast.success(
                          boardIsPublic
                            ? "Board set to private"
                            : "Board set to public"
                        );
                      }}
                    />
                  }
                  content={
                    boardIsPublic
                      ? "This board is public"
                      : "This board is private"
                  }
                />

                <Icon
                  name={allowEdit ? "lock open" : "lock"}
                  size="large"
                  onClick={() => {
                    setAllowEdit(!allowEdit);
                  }}
                />
              </div>
            )}
            <div className="Sidebar__main" id="item0">
              <div className="Sidebar__main__topbar">
                <div className="Sidebar__main__topbar--left">
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

                <div className="Sidebar__main__topbar--right">
                  <Icon
                    name="arrow alternate circle left"
                    size="large"
                    onClick={() => {
                      setIsBuilding(false);
                      if (boardFound) {
                        setData([]);
                        setBoardFound(null);
                      }
                    }}
                  />
                  <Icon
                    name={
                      showExtendedMenu ? "angle double down" : "angle double up"
                    }
                    size="large"
                    onClick={() => setShowExtendedMenu(!showExtendedMenu)}
                  />
                  <Icon
                    name={showMenu ? "close" : "circle notch"}
                    size="large"
                    onClick={() => setShowMenu(!showMenu)}
                  />
                </div>
              </div>

              {showMenu && (
                <Menu fluid vertical className="Sidebar__main__menu">
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
                    {userSelection === "quiz" ? (
                      <Button
                        id="quizButton"
                        onClick={() => {
                          setShowQuizModal(true);
                        }}
                      >
                        Create quiz
                      </Button>
                    ) : (
                      "Quiz"
                    )}
                  </Menu.Item>
                </Menu>
              )}
            </div>
            {
              <BasicModal
                show={showQuizModal}
                setShow={setShowQuizModal}
                title=""
              >
                {<Quiz setShowQuizModal={setShowQuizModal} />}
              </BasicModal>
            }
          </div>
        )}
        {!userOwnsBoard && (
          <div className="visitors-sidebar">
            <Icon
              name="arrow alternate circle left"
              size="huge"
              onClick={() => {
                setIsBuilding(false);
                if (boardFound) {
                  setData([]);
                  setBoardFound(null);
                }
              }}
            />
            <Icon name="sync" size="huge" onClick={() => render()} />
          </div>
        )}
        {
          <BasicModal
            show={showModalUserList}
            setShow={setShowModalUserList}
            title=""
          >
            {
              <UserListNavBar
                setShowModal={setShowModalUserList}
                visitorState={visitorState}
              />
            }
          </BasicModal>
        }
      </MoveElements>
    </>
  );
}
