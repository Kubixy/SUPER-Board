import React, { useState, useMemo, useCallback, useReducer } from "react";
import { readUserData } from "../utils/Api";

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
      throw new Error();
  }
}

export function UserToolsProvider(props) {
  const [idClass, setIdClass] = useState(null);
  const [user, setUser] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [managementON, setManagment] = useState(true);
  const [classFound, setClassFound] = useState(null);
  const [classON, setClassON] = useState(false);
  const [data, setData] = useState([{}]);
  const [newData, setNewData] = useState(true);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [state, dispatch] = useReducer(reducer, { files: 0, images: 0 });

  const endClassCallback = useCallback(() => {
    setIsBuilding(false);
    setManagment(true);
    setClassFound(null);
    setClassON(false);
  }, [idClass, classFound]);

  const deleteElementCallback = useCallback(() => {
    if (deleteIndex !== null) {
      data.splice(deleteIndex, 1);
      setDeleteIndex(null);
    }
  }, [deleteIndex, data]);

  const render = useCallback(() => {
    readUserData(classFound === null ? user.uid : classFound).then(
      (response) => {
        if (response !== null) {
          setData(response);
        }
      }
    );
  });

  const value = useMemo(() => {
    return {
      setUser,
      isBuilding,
      setIsBuilding,
      managementON,
      setManagment,
      classFound,
      setClassFound,
      classON,
      setClassON,
      endClassCallback,
      idClass,
      setIdClass,
      data,
      setData,
      user,
      userId: user !== null ? user.uid : null,
      newData,
      setNewData,
      setDeleteIndex,
      deleteElementCallback,
      render,
      state,
      dispatch,
    };
  }, [
    user,
    isBuilding,
    managementON,
    classFound,
    classON,
    endClassCallback,
    idClass,
    data,
    newData,
    deleteElementCallback,
    render,
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
