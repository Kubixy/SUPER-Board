import React, { useState } from "react";
import BackgroundAuth from "../../assets/jpg/MainBackground.jpg";
import LoggedOptions from "../../components/Logged/LoggedOptions";
import LFClass from "../../components/Logged/LFClass";
import Profile from "../../components/Logged/Profile";

import "./MainUI.scss";

export default function (props) {
  const { useUserTools } = props;
  const {
    user,
    setIsBuilding,
    setManagment,
    setClassFound,
    setClassON,
  } = useUserTools();
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handlerMain = () => {
    switch (selectedOpt) {
      case "find":
        return (
          <LFClass
            setSelectedOpt={setSelectedOpt}
            setManagment={setManagment}
            setIsBuilding={setIsBuilding}
            setClassFound={setClassFound}
            setClassON={setClassON}
          />
        );
      case "profile":
        return <Profile user={user} setSelectedOpt={setSelectedOpt} />;
      default:
        return (
          <LoggedOptions
            setSelectedOpt={setSelectedOpt}
            setIsBuilding={setIsBuilding}
          />
        );
    }
  };

  return (
    <div
      className="main_panel"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="main_panel__dark" />
      <div className="main_panel__box">{handlerMain()}</div>
    </div>
  );
}
