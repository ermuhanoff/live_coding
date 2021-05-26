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
import axios from "axios";

const { Text } = Typography;

export type ViewType = "streamer" | "viewer";

// export const VIEW_TYPE: ViewType =
//   (localStorage.getItem("view_type") as ViewType) || "streamer";
export let VIEW_TYPE: ViewType;

export const Emitter = new EventEmitter();

export let socketRef: React.MutableRefObject<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>;

let updateNum = 0;

function App() {
  const [update, setUpdate] = useState(updateNum);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contextState, setContextState] = useState<AppContextType>(Context);
  socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  function forceUpdate() {
    setUpdate(++updateNum);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewtype")
      .then((data) => {
        VIEW_TYPE = data.data;
        // Context.username = window.prompt("Enter your name: ") || "user";
        VIEW_TYPE = window.confirm("Are you streamer") ? "streamer" : "viewer";
        Context.username = VIEW_TYPE === "streamer" ? "Streamer" : "Viewer";

        setIsLoading(false);

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

        // for both
        socketRef.current?.on("chat_message", (data) => {
          Emitter.emit("chat_message", data);
        });

        socketRef.current?.on("created_notice", (data) => {
          Emitter.emit("created_notice", data);
        });

        Emitter.on("new_chat_message", (data) => {
          socketRef.current?.emit("new_chat_message", data);
        });

        Emitter.on("create_notice", (data) => {
          socketRef.current?.emit("create_notice", data);
        });

        // for viewers only
        if (VIEW_TYPE === "viewer") {
          socketRef.current?.on("editor_data_broadcast", (data) => {
            Emitter.emit("editor_data_broadcast", data);
          });

          socketRef.current?.on("output_reloaded", () => {
            Emitter.emit("output_reload");
          });

          socketRef.current?.on("closed_notice", (data) => {
            Emitter.emit("closed_notice", data);
          });
        }

        // for streamer only
        else {
          Emitter.on("output_reload", () => {
            socketRef.current?.emit("output_reload");
          });

          Emitter.on("close_notice", (data) => {
            socketRef.current?.emit("close_notice", data);
          });
        }
      })
      .catch((err) => {
        openNotification({
          message: <Text type="danger">{"Connection error\n"}</Text>,
          description: err.message,
          type: "error",
        });
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
        {isLoading ? "Loading..." : <LayoutComponent />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
