import React, { useState, useMemo, useCallback } from "react";
import { updateUserCounter, readUserData } from "../utils/Api";

const UserContext = React.createContext();

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
  const [guestSession, setGuestSession] = useState(false);

  const endClassCallback = useCallback(() => {
    updateUserCounter(idClass, -1, classFound);
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

  const render = () => {
    readUserData(classFound === null ? user.uid : classFound).then(
      (response) => {
        if (response !== null) {
          setData(response);
        }
      }
    );
  };

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
      guestSession,
      setGuestSession,
      render,
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
    guestSession,
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
