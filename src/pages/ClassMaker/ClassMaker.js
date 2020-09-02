import React, { useState, useEffect } from "react";
import Box from "../../components/UIComponents/Box";
import NavBar from "../../components/UIComponents/NavBar";
import VideoPlayer from "../../components/Tools/VideoPlayer";
import ShowText from "../../components/Tools/ShowText";
import MakeQuiz from "../../components/Tools/Quiz/MakeQuiz";
import ShowImage from "../../components/Tools/ShowImage";
import FileUploader from "../../components/Tools/FileUploader";
import ErrorMessage from "../../components/Tools/ErrorMessage";
import { addAula, userIdFinder } from "../../utils/Api";

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

  const userLoader = () => {
    userIdFinder(classFound === null ? userId : classFound, classON).then(
      (response) => {
        if (managementON) {
          if (response.status) {
            setIdClass(response.id);
          } else {
            addAula(userId);
            userLoader();
          }
        } else {
          setIdClass(response.id);
          setAllowEdit(userId === classFound ? true : false);
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
                      allowEdit={allowEdit}
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
                      userId={allowEdit ? userId : classFound}
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
