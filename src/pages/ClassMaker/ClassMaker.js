import React, { useState, useEffect } from "react";
import Box from "../../components/UIComponents/Box";
import NavBar from "../../components/UIComponents/NavBar";
import VideoPlayer from "../../components/Tools/VideoPlayer";
import ShowText from "../../components/Tools/ShowText";
import MakeQuiz from "../../components/Tools/Quiz/MakeQuiz";
import ShowImage from "../../components/Tools/ShowImage";
import FileUploader from "../../components/Tools/FileUploader";
import ErrorMessage from "../../components/Tools/ErrorMessage";
import { addBoard, userIdFinder, deleteFile } from "../../utils/Api";

import "./ClassMaker.scss";

export default function ClassMaker(props) {
  const [imageIndex, setimageIndex] = useState(1);
  const [fileIndex, setFileIndex] = useState(1);
  const [imgArrayToDelete, setImgArrayToDelete] = useState([]);
  const [fileArrayToDelete, setFileArrayToDelete] = useState([]);
  const [allowEdit, setAllowEdit] = useState(false);

  const { useUserTools } = props;
  const {
    userId,
    classFound,
    classON,
    managementON,
    setIdClass,
    data,
    deleteElementCallback,
    render,
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

  const userLoader = () => {
    userIdFinder(classFound === null ? userId : classFound).then(
      (response) => {
        if (managementON) {
          if (response.status) {
            setIdClass(response.id);
          } else {
            addBoard(userId);
            userLoader();
          }
        } else {
          setIdClass(response.id);
          setAllowEdit(userId === classFound);
        }
      }
    );
  };

  useEffect(() => {
    userLoader();
    render();
  }, []);

  return (
    <>
      {(!managementON || classON) && <NavBar allowEdit={allowEdit} />}
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
