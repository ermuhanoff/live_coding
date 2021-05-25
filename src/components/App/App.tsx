import React, { useEffect, useRef, useState } from "react";
import LayoutComponent from "../LayoutComponent/LayoutComponent";
import "./App.css";
import "antd/dist/antd.css";
import AppContext, { AppContextType, Context } from "./AppContext";
import EventEmitter from "events";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { openNotification } from "../Notification/Notification";
import { Typography } from "antd";

const { Text } = Typography;


export type ViewType = "streamer" | "viewer";

// export const VIEW_TYPE: ViewType =
//   (localStorage.getItem("view_type") as ViewType) || "streamer";
export const VIEW_TYPE: ViewType = window.confirm("You are a streamer?")
? "streamer"
: "viewer";

Context.username = VIEW_TYPE;

export const Emitter = new EventEmitter();



export let socketRef: React.MutableRefObject<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>;

function App() {
  const [contextState, setContextState] = useState<AppContextType>(Context);
  socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      reconnection: false,
      transports: ["websocket"],
      query: {
        roomId: "testing",
      },
    });

    socketRef.current.on("connect", () => {
      console.log("connected");
    });
    socketRef.current.on("disconnect", (reason) => {
      console.log("disconnected by ", reason);
    });
    socketRef.current.on("connect_error", (err) => {
      openNotification({
        message: <Text type="danger">{"Socket connection error\n"}</Text>,
        description: err.message,
        type: "error",
      });
    });

    socketRef.current?.on("chat_message", (data) => {
      Emitter.emit("chat_message", data);
    });

    if (VIEW_TYPE === "viewer") {
      socketRef.current?.on("editor_data_broadcast", (data) => {
        Emitter.emit("editor_data_broadcast", data);
      });
    } else {
      
    }

    Emitter.on("new_chat_message", (data) => {
      socketRef.current?.emit("new_chat_message", data);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

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
