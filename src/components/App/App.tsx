import React, { useState } from "react";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import "./App.css";
import "antd/dist/antd.css";
import AppContext, { AppContextType, Context } from "./AppContext";

function App() {
  const [contextState, setContextState] = useState<AppContextType>(Context);

  return (
    <div className="App">
      <AppContext.Provider
        value={{ context: contextState, setContext: setContextState }}
      >
        <LayoutComponent />
      </AppContext.Provider>
    </div>
  );
}

export default App;
