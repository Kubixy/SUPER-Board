import React, { useState, useMemo, useCallback, useReducer } from "react";
import { writeUserData, readUserData } from "../utils/Api";

const UserContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "increFil":
      return { files: state.files + 1, images: state.images };
    case "decreFil":
      if (state.files > 0)
        return { files: state.files - 1, images: state.images };
      break;
    case "increImg":
      return { files: state.files, images: state.images + 1 };
    case "decreImg":
      if (state.images > 0)
        return { files: state.files, images: state.images - 1 };
      break;
    case "reset":
      return { files: 0, images: 0 };
    default:
  }
}

export function UserToolsProvider(props) {
  const [idBoard, setIdBoard] = useState(null);
  const [user, setUser] = useState({});
  const [isBuilding, setIsBuilding] = useState(false);
  const [boardFound, setBoardFound] = useState(null);
  const [data, setData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, { files: 0, images: 0 });

  const render = useCallback(async () => {
    if (user)
      await readUserData(boardFound === null ? user.uid : boardFound).then(
        (response) => {
          if (response !== null) setData(response);
        }
      );
  }, [user, boardFound, setData]);

  const writeNewData = async () => {
    setLoading(true);
    await writeUserData(user.uid, data).catch((error) => {
      console.log("Error (UserToolsProvider) --> ", error);
    });
    setLoading(false);
  };

  const updateRecord = useCallback(
    (index, values, attribute) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].mainindex === index) {
          switch (attribute) {
            case "position":
              data[i].position = {
                x: values.x,
                y: values.y,
              };
              break;
            case "width":
              data[i].width = values.width;
              break;
            case "resolution":
              data[i].resolution = {
                width: values.width,
                height: values.height,
              };
              break;
            case "color":
              data[i].color = values.color;
              break;
            default:
          }
          break;
        }
      }

      setData(data);
      writeUserData(user.uid, data);
    },
    [data, user]
  );

  const generateItemID = (myData) => {
    return myData.length > 0 ? myData[myData.length - 1].mainindex + 1 : 1;
  };

  const value = useMemo(() => {
    return {
      setUser,
      isBuilding,
      setIsBuilding,
      boardFound,
      setBoardFound,
      idBoard,
      setIdBoard,
      data,
      setData,
      user,
      userId: user !== null ? user.uid : null,
      setDeleteIndex,
      render,
      state,
      dispatch,
      updateRecord,
      generateItemID,
      writeNewData,
      loading,
      deleteIndex,
    };
    // eslint-disable-next-line
  }, [
    user,
    isBuilding,
    boardFound,
    data,
    idBoard,
    render,
    state,
    updateRecord,
    loading,
    deleteIndex,
  ]);

  return <UserContext.Provider value={value} {...props} />;
}

export function useUserTools() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error();
  }
  return context;
}
