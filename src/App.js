import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import Home from "./Components/Home/Home";
import "./App.less";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const screenSize = () => {
    if (window.innerWidth < 768) {
      dispatch({
        type: "screenSizeMobile",
      });
    } else {
      dispatch({
        type: "screenSizeDesktop",
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

  return (
    <div className="App">
      <StateContext.Provider value={{ state, dispatch }}>
        <Home />
      </StateContext.Provider>
    </div>
  );
}

export default App;
