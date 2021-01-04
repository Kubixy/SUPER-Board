import React, { useState, useEffect, useCallback } from "react";
import Box from "../../components/UIComponents/Box";
import NavBar from "../../components/UIComponents/NavBar";
import VideoPlayer from "../../components/Tools/VideoPlayer";
import ShowText from "../../components/Tools/ShowText";
import MakeQuiz from "../../components/Tools/Quiz/MakeQuiz";
import ShowImage from "../../components/Tools/ShowImage";
import FileUploader from "../../components/Tools/FileUploader";
import ErrorMessage from "../../components/Tools/ErrorMessage";
import {
  addBoard,
  userIdFinder,
  deleteFile,
  setVisitors,
  getVisitors,
} from "../../utils/Api";

import "./BoardMaker.scss";

export default function BoardMaker(props) {
  const [imageIndex, setimageIndex] = useState(1);
  const [fileIndex, setFileIndex] = useState(1);
  const [imgArrayToDelete, setImgArrayToDelete] = useState([]);
  const [fileArrayToDelete, setFileArrayToDelete] = useState([]);
  const [allowEdit, setAllowEdit] = useState(false);
  const [visitorState, setVisitorState] = useState([]);

  const { useUserTools } = props;
  const {
    userId,
    boardFound,
    boardON,
    managementON,
    idBoard,
    setIdBoard,
    data,
    deleteElementCallback,
    render,
    user,
  } = useUserTools();

  const onDelete = async () => {
    if (imgArrayToDelete.length > 0) {
      for (let i = 0; i < imgArrayToDelete.length; i++) {
        await deleteFile(userId, imgArrayToDelete[i], "images");
      }
    }

    if (fileArrayToDelete.length > 0) {
      for (let i = 0; i < fileArrayToDelete.length; i++) {
        await deleteFile(userId, fileArrayToDelete[i], "files");
      }
    }

    setImgArrayToDelete([]);
    setFileArrayToDelete([]);
  };

  const userLoader = useCallback(() => {
    userIdFinder(boardFound === null ? userId : boardFound).then((response) => {
      if (managementON) {
        if (response.status) {
          setIdBoard(response.id);
        } else {
          addBoard(userId);
          userLoader();
        }
      } else {
        setIdBoard(response.id);
        setAllowEdit(userId === boardFound);
        setVisitors(idBoard, user);
        getVisitors(idBoard).then((result) => {
          setVisitorState(result);
        });
      }
    });
  }, [boardFound, managementON, userId, setIdBoard, idBoard, user]);

  useEffect(() => {
    userLoader();
    render();
  }, [userLoader, render]);

  return (
    <>
      {(!managementON || boardON) && (
        <NavBar allowEdit={allowEdit} visitorState={visitorState} />
      )}
      <div className="background" />
      <div className="panel">
        <div className="panel__all" />
        {managementON && (
          <Box
            setimageIndex={setimageIndex}
            imageIndex={imageIndex}
            setFileIndex={setFileIndex}
            fileIndex={fileIndex}
            imgArrayToDelete={imgArrayToDelete}
            fileArrayToDelete={fileArrayToDelete}
            onDelete={onDelete}
          />
        )}
        <div className="panel__input">
          {deleteElementCallback()}
          {/* eslint-disable-next-line*/}
          {data.map((x, index) => {
            if (x.type)
              switch (x.type) {
                case "video":
                  return <VideoPlayer url={x.content} index={index} />;

                case "text":
                  return (
                    <ShowText header={x.header} body={x.body} index={index} />
                  );

                case "quiz":
                  return <MakeQuiz questions={x.questions} index={index} />;

                case "image":
                  return (
                    <ShowImage
                      indexImg={x.index}
                      setimageIndex={setimageIndex}
                      subtitle={x.subtitle}
                      index={index}
                      setImgArrayToDelete={setImgArrayToDelete}
                      imgArrayToDelete={imgArrayToDelete}
                    />
                  );

                case "file":
                  return (
                    <FileUploader
                      fileIndex={x.index}
                      setFileIndex={setFileIndex}
                      title={x.title}
                      index={index}
                      fileArrayToDelete={fileArrayToDelete}
                      setFileArrayToDelete={setFileArrayToDelete}
                    />
                  );

                default:
                  return <ErrorMessage index={index} />;
              }
          })}
        </div>
      </div>
    </>
  );
}
