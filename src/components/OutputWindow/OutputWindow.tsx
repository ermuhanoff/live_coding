import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import { Emitter } from "../App/App";
import * as Scroll from "react-scroll";
import Style from "./OutputWindow.module.css";
import AppStyle from "../App/App.module.css";
import {
  ClearOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

let stateNum = 0;
let stateOutputNum = 0;
let consoleValueString: ReactNode[] = [];
const { Text } = Typography;

const OutputWindow = () => {
  const [state, setState] = useState(0);
  const [stateOutput, setStateOutput] = useState(0);
  const [consoleValue, setConsoleValue] =
    useState<ReactNode[]>(consoleValueString);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [consoleOutputHeight, setConsoleOutputHeight] =
    useState<string>("100%");
  const [consoleOutputOverflow, setConsoleOutputOverflow] =
    useState<string>("overlay");
  const [iframeHeight, setIframeHeight] = useState<string>("80%");
  const [isCollaped, setIsCollaped] = useState<boolean>(false);
  const ref = React.createRef<HTMLIFrameElement>();

  useEffect(() => {
    function handler() {
      setState(++stateNum);
    }
    function handlerOutput() {
      setStateOutput(++stateOutputNum);
    }

    Emitter.on("output_reload", handler);

    window.addEventListener("message", function (response) {
      if (response.data && response.data.source === "iframe") {
        let el;
        if (response.data.message[0] === "error") {
          const parsed = response.data.message[1].url.split("/");
          el = (
            <div className={Style.ConsoleItem} key={consoleValueString.length}>
              <Text type={"danger"} code>
                {response.data.message[1].error.stack}
              </Text>
              <Text type={"secondary"} underline strong className={Style.fileAndLine}>
                {parsed[parsed.length - 1] +
                  ":" +
                  response.data.message[1].lineNo}
              </Text>
            </div>
          );
        } else {
          el = (
            <div className={Style.ConsoleItem} key={consoleValueString.length}>
              <Text type={"secondary"} code>
                {response.data.message
                  .slice(2)
                  .map((item: any) => JSON.stringify(item))
                  .join(" ")}
              </Text>
              <Text type={"secondary"} underline strong className={Style.fileAndLine}>
                {response.data.message[1]}
              </Text>
            </div>
          );
        }
        consoleValueString.push(el);
        setConsoleValue(consoleValueString);
        handlerOutput();

        Scroll.scroller.scrollTo("scrollPoint", {
          duration: 500,
          delay: 0,
          smooth: true,
          containerId: "scroll",
        });
      }
    });

    // ref.current?.contentDocument?.

    return () => {
      Emitter.off("output_reload", handler);
    };
  }, []);

  const clearConsole = () => {
    consoleValueString = [];
    setConsoleValue(consoleValueString);
  };
  const collapseConsole = () => {
    if (isCollaped) {
      setConsoleOutputHeight("100%");
      setIframeHeight("80%");
      setConsoleOutputOverflow("overlay");
      setIsCollaped(false);
    } else {
      setConsoleOutputHeight("0%");
      setConsoleOutputOverflow("hidden");
      setIframeHeight("95%");
      setIsCollaped(true);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }} className={AppStyle.Dark}>
      <iframe
        className={Style.Iframe}
        ref={ref}
        src="http://localhost:4000/static/"
        frameBorder="0"
        style={{ width: "100%", height: iframeHeight }}
        key={state}
        id={"iframe"}
      ></iframe>

      <div
        className={`${Style.Console} ${AppStyle.Dark}`}
        style={{
          height: "20%",
        }}
      >
        <div className={`${Style.ConsoleMenu} ${AppStyle.DarkSecond}`}>
          <Text
            type="secondary"
            style={{ color: "rgba(190, 190, 190, 0.623)", margin: "0px 5px" }}
          >
            Console
          </Text>

          <div className={Style.ConsoleMenuButtons}>
            <ClearOutlined className={Style.Button} onClick={clearConsole} />
            {isCollaped ? (
              <VerticalAlignTopOutlined
                className={Style.Button}
                onClick={collapseConsole}
              />
            ) : (
              <VerticalAlignBottomOutlined
                className={Style.Button}
                onClick={collapseConsole}
              />
            )}
          </div>
        </div>
        <div
          key={stateOutput}
          className={Style.ConsoleOutput}
          id="scroll"
          style={{
            height: consoleOutputHeight,
            overflow: consoleOutputOverflow,
          }}
        >
          {/* <div style={{ height: "max-content" }}>{consoleValue}</div> */}
          {consoleValue}
          {<Scroll.Element name="scrollPoint" />}
        </div>
      </div>
    </div>
  );
};

export default OutputWindow;
