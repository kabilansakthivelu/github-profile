import React, { useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Home from "./Components/Home/Home";
import Compare from "./Components/Compare/Compare";
import { notification } from "antd";
import "./App.less";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [spin, setSpin] = useState(false);

  const screenSize = () => {
    if (window.innerWidth < 768) {
      dispatch({
        type: "SCREEN_SIZE_MOBILE",
      });
    } else {
      dispatch({
        type: "SCREEN_SIZE_DESKTOP",
      });
    }
  };

  useEffect(() => {
    screenSize();
    window.addEventListener("resize", screenSize);
    return () => {
      window.removeEventListener("resize", screenSize);
    };
  }, []);

  const navigate = useNavigate();

  const usernameRef = useRef();
  const newUserNameRef = useRef();

  const openNotificationForMaxCount = () => {
    notification.open({
      message: "Error",
      description: "You can compare a maximum of 3 Github users",
      className: "notification",
    });
  };

  const openNotificationForError = () => {
    notification.open({
      message: "Error",
      description: "Please enter a valid username",
      className: "notification",
    });
  };

  const fetchUserData = async (username) => {
    setSpin(true);
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const data = await resp.json();
    if (!data.message && state.users.includes(null)) {
      const resp1 = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data1 = await resp1.json();
      let moreInfoObj = data1.reduce(
        (acc, item) => {
          acc.stargazers_count += item.stargazers_count;
          acc.favLanguage[item.language] = acc.favLanguage[item.language]
            ? acc.favLanguage[item.language] + 1
            : 1;
          return acc;
        },
        {
          stargazers_count: 0,
          favLanguage: {},
        }
      );
      moreInfoObj.favLanguage = Object.keys(moreInfoObj.favLanguage);
      dispatch({
        type: "ADD_USER",
        payload: {info: data, moreUserInfo : moreInfoObj },
      });
      setSpin(false);
      navigate("/compare");
    } else if (!data.message && !state.users.includes(null)) {
      openNotificationForMaxCount();
    } else {
      openNotificationForError();
      setSpin(false);
    }
  };

  return (
    <div className="App">
      <StateContext.Provider
        value={{ state, dispatch, usernameRef, newUserNameRef, fetchUserData, spin, setSpin }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </StateContext.Provider>
    </div>
  );
}

export default App;
