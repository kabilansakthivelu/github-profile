import React, { useEffect, useReducer, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Home from "./Components/Home/Home";
import Compare from "./Components/Compare/Compare";
import { notification } from "antd";
import "./App.less";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    console.log(username);
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const data = await resp.json();
    if (!data.message && state.users.includes(null)) {
      dispatch({
        type: "ADD_USER",
        payload: data,
      });
      navigate("/compare");
      usernameRef.current.props.value = "";
    } else if (!data.message && !state.users.includes(null)) {
      openNotificationForMaxCount();
    } else {
      openNotificationForError();
    }
  };

  const submitUser = () => {
    fetchUserData(usernameRef.current.props.value);
  };

  return (
    <div className="App">
        <StateContext.Provider value={{ state, dispatch, usernameRef, submitUser, fetchUserData }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </StateContext.Provider>
    </div>
  );
}

export default App;
