import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../../components/UIComponents/SideBar";
import NavBar from "../../components/UIComponents/NavBar";
import VideoPlayer from "../../components/Tools/VideoPlayer/VideoPlayer";
import ShowText from "../../components/Tools/ShowText";
import MakeQuiz from "../../components/Tools/Quiz/MakeQuiz";
import ShowImage from "../../components/Tools/ShowImage/ShowImage";
import FileUploader from "../../components/Tools/FileUploader/FileUploader";
import {
  addBoard,
  userIdFinder,
  deleteFile,
  setVisitors,
  getVisitors,
} from "../../utils/Api";

import "./BoardMaker.scss";

export default function BoardMaker(props) {
  const [allowEdit, setAllowEdit] = useState(false);
  const [visitorState, setVisitorState] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(true);

  const { useUserTools } = props;
  const {
    userId,
    boardFound,
    idBoard,
    setIdBoard,
    data,
    deleteElementCallback,
    render,
    user,
    dispatch,
  } = useUserTools();

  const userLoader = useCallback(async () => {
    await userIdFinder(boardFound === null ? userId : boardFound).then(
      (response) => {
        if (response.id) {
          setIdBoard(response.id);
          setAllowEdit(userId === response.user);
          //setVisitors(idBoard, user);
          //getVisitors(idBoard).then((result) => {
          //  setVisitorState(result);
          //});
        } else {
          addBoard(userId);
          userLoader();
        }
      }
    );
  }, [boardFound, userId, setIdBoard, idBoard, user]);

  useEffect(() => {
    userLoader();
    render();
  }, []);

  useEffect(() => {
    dispatch({ type: "reset" });
    // eslint-disable-next-line
    data.map((x) => {
      if (x.type === "image") {
        dispatch({ type: "increImg" });
      } else if (x.type === "file") {
        dispatch({ type: "increFil" });
      }
    });
  }, [data, dispatch]);

  return (
    <>
      {/* <NavBar
        allowEdit={allowEdit}
        visitorState={visitorState}
        setToggleStatus={setToggleStatus}
        toggleStatus={toggleStatus}
      /> */}
      <div className="background" />
      <div className="panel">
        <SideBar />

        <div className="panel__input">
          {deleteElementCallback()}
          {/* eslint-disable-next-line*/}
          {data.map((x) => {
            if (x.type)
              switch (x.type) {
                case "video":
                  return (
                    <VideoPlayer
                      url={x.content}
                      index={x.mainindex}
                      position={x.position}
                      allowEdit={allowEdit}
                    />
                  );

                case "text":
                  return (
                    <ShowText
                      body={x.body}
                      index={x.mainindex}
                      position={x.position}
                      allowEdit={allowEdit}
                    />
                  );

                case "quiz":
                  return (
                    <MakeQuiz
                      title={x.title}
                      questions={x.questions}
                      index={x.mainindex}
                      position={x.position}
                      allowEdit={allowEdit}
                    />
                  );

                case "image":
                  return (
                    <ShowImage
                      index={x.mainindex}
                      position={x.position}
                      allowEdit={allowEdit}
                    />
                  );

                case "file":
                  return (
                    <FileUploader
                      title={x.title}
                      index={x.mainindex}
                      position={x.position}
                      allowEdit={allowEdit}
                    />
                  );

                default:
              }
          })}
        </div>
      </div>
    </>
  );
}
