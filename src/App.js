import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import Home from "./Components/Home/Home";
import Compare from "./Components/Compare/Compare";
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

  return (
    <div className="App">
      <Router>
        <StateContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </StateContext.Provider>
      </Router>
    </div>
  );
}

export default App;
