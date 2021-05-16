import React, { useEffect, useState } from "react";
import { Controlled } from "react-codemirror2";
import EditorContextMenu from "../EditorContextMenu/EditorContextMenu";

import Options from "./EditorOptions";
import "codemirror/lib/codemirror.css";
import "./Editor.css";
import CodeMirror from "codemirror";
import { useAppContext } from "../App/AppContext";

let x: number;
let y: number;
let editor: any;
export let Editor: CodeMirror.Editor;
export let Doc: CodeMirror.Doc;

const EditorComponent = () => {
  const { context, setContext } = useAppContext();
  const [value, setValue] =
    useState<string>(`import React, { useState, ReactNode } from "react";
  import { Space, Badge } from "antd";
  import FileManager from "../FileManager/FileManager";
  import Chat from "../Chat/Chat";
  import NotificationPanel from "../NotificationPanel/NotificationPanel";
  import ClosedNotificationPanel from "../ClosedNotificationPanel/ClosedNotificationPanel";
  import {
    FileOutlined,
    WechatOutlined,
    CameraOutlined,
    SettingOutlined,
    BellOutlined,
    BookOutlined,
  } from "@ant-design/icons";
  import Style from "./ToolPanel.module.css";
  
  interface Props {
    setToolPanelSize: (state: any) => any;
  }
  
  interface Tool {
    icon: ReactNode;
    name: string;
  }
  
  const tools = [
    { icon: <FileOutlined />, name: "file" },
    { icon: <WechatOutlined />, name: "chat" },
    { icon: <CameraOutlined />, name: "camera" },
    { icon: <SettingOutlined />, name: "settings" },
  
    {
      icon: (
        <Badge
          className={Style.Badge}
          count={10}
          overflowCount={9}
          size="small"
          offset={[-5, 0]}
          title={"Unread messages"}
        >
          <BellOutlined className={Style.ToolPanel_Icons} />
        </Badge>
      ),
      name: "notice",
    },
    { icon: <BookOutlined />, name: "closed_notice" },
  ];
  
  const TOOL_PANEL_WIDTH: number = 450;
  
  const ToolPanel = ({ setToolPanelSize }: Props) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [openedTool, setOpenedTool] = useState<string>("");
  
    const toolsToComponents = (tools: Tool[]): ReactNode[] => {
      return tools.map((item) => (
        <div key={item.name} onClick={(e) => onIconClick(e, item.name)}>
          {item.icon}
        </div>
      ));
    };
  
    const openToolPanel = (id: string) => {
      setOpenedTool(id);
      setIsOpened(true);
      setToolPanelSize({ width: TOOL_PANEL_WIDTH + "px", height: "100%" });
    };
  
    const closeToolPanel = () => {
      setToolPanelSize({ width: "50px", height: "100%" });
      setIsOpened(false);
    };
  
    const onIconClick = (e: any, id: string) => {
      if (isOpened) {
        if (openedTool != id) openToolPanel(id);
        else closeToolPanel();
      } else openToolPanel(id);
    };
  
    const getToolComponentByName = (name: string): ReactNode => {
      switch (name) {
        case "file":
          return <FileManager />;
        case "chat":
          return <Chat />;
        case "notice":
          return <NotificationPanel />;
        case "closed_notice":
          return <ClosedNotificationPanel />;
      }
    };
  
    return (
      <div className={Style.Wrapper}>
        <Space
          className={"ClassName"}
          style={{ width: 50 }}
          direction="vertical"
        >
          {toolsToComponents(tools)}
        </Space>
        {isOpened && (
          <div className={Style.ToolPanel_OpenedTool}>
            {getToolComponentByName(openedTool)}
          </div>
        )}
      </div>
    );
  };
  
  export default ToolPanel;
  `);
  const [isContextMenu, setContextMenu] = useState<boolean>(false);

  const onBeforeChange = (editor: any, data: any, value: string): void => {
    setValue(value);
  };

  const onChange = (editor: any, data: any, value: string): void => {};

  const onContexMenu = (cm: CodeMirror.Editor, e: any) => {
    e.preventDefault();
    editor = cm;
    let pos = Editor.coordsChar({ left: e.clientX, top: e.clientY });

    x = e.clientX;
    y = e.clientY - 15;

    if (
      !(e.path[0] as HTMLElement).classList.contains("CodeMirror-selectedtext")
    ) {
      Doc.setCursor({ line: pos.line, ch: pos.ch});
    }

    let cursorPosFrom = Doc.getCursor("from");
    let cursorPosTo = Doc.getCursor("to");

    setContext({
      ...context,
      noticePos: { line: cursorPosTo.line, ch: cursorPosTo.ch },
      lineRange: {
        from: cursorPosFrom.line,
        to: cursorPosTo.line,
      },
    });

    setContextMenu(true);
  };

  // useEffect(() => {
  //     document
  //     .getElementsByClassName("CodeMirror-overlayscroll-vertical")[0]
  //     .children[0].addEventListener("mousedown", (event) => {
  //       const el: any = event.target;

  //       const oldHeight = el.offsetHeight ;

  //       const onMouseMove = (e: any) => {
  //         console.log(e.target.style.height);

  //         e.target.style.height = oldHeight  + 12 + "px";
  //       };

  //       el?.addEventListener("mousemove", onMouseMove);

  //       el?.addEventListener("mouseup", () =>
  //         el.removeEventListener("mousemove", onMouseMove)
  //       );
  //     });
  // }, []);

  return (
    <>
      <Controlled
        className={"CodeMirror_custom"}
        value={value}
        options={Options}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        onContextMenu={onContexMenu}
        editorDidMount={(editor) => {
          Editor = editor;
          Doc = Editor.getDoc();
        }}
      ></Controlled>
      {isContextMenu && (
        <EditorContextMenu
          setContextMenu={setContextMenu}
          pos={{ x, y }}
          cm={editor}
        />
      )}
    </>
  );
};

export default EditorComponent;
