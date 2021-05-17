import { useState, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Space, Badge, Drawer, Button } from "antd";
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
import { Editor, Monaco, scrollInfo } from "../Editor/Editor";
import { Position, ScrollInfo } from "codemirror";
import EditorNotice from "../EditorNotice/EditorNotice";
import { useAppContext } from "../App/AppContext";
import NoticeAddComponent from "../NoticeAddComponent/NoticeAddComponent";
import { Size } from "../WorkSpace/WorkSpace";

interface Props {
  setToolPanelSize: (state: any) => any;
}

export interface NoticeItem {
  id: number;
  title: string;
  desc: string;
  author: string;
  position: Position;
}

export interface FileInfo {
  name: string;
  path: string;
  type: "folder" | "file";
  ext?: string;
  size: number;
  content: FileInfo[] | string;
}

interface Tool {
  icon: ReactNode;
  name: string;
}

let oldPos: Position;
let newPos: Position;
let pos: any;
let el: HTMLElement;

const closedData: NoticeItem[] = [
  {
    id: 6,
    title: "title 6",
    desc: "desc for title 6",
    author: "Kolya",
    position: { line: 23, ch: 7 },
  },
  {
    id: 7,
    title: "title 7",
    desc: "desc for title 7",
    author: "Olga",
    position: { line: 89, ch: 12 },
  },
  {
    id: 8,
    title: "title 8",
    desc: "desc for title 8",
    author: "Dasha",
    position: { line: 45, ch: 9 },
  },
];
const data: NoticeItem[] = [
  {
    id: 1,
    title: "title 1",
    desc: "desc for title 1",
    author: "Dima",
    position: { line: 69, ch: 12 },
  },
  {
    id: 2,
    title: "title 2",
    desc: "desc for title 2",
    author: "Danya",
    position: { line: 69, ch: 30 },
  },
  {
    id: 3,
    title: "title 3",
    desc: "desc for title 3",
    author: "Vova",
    position: { line: 78, ch: 12 },
  },
  {
    id: 4,
    title: "title 4",
    desc: "desc for title 4",
    author: "Oleg",
    position: { line: 100, ch: 4 },
  },
  {
    id: 5,
    title: "title 5",
    desc: "desc for title 5",
    author: "Stepa",
    position: { line: 2, ch: 32 },
  },
  {
    id: 9,
    title: "title 9",
    desc: "desc for title 9",
    author: "Stepa",
    position: { line: 2, ch: 32 },
  },
];

const directory: FileInfo[] = [
  {
    name: "script",
    path: "/script",
    type: "folder",
    size: 0,
    content: [
      {
        name: "index.js",
        path: "/script/index.js",
        type: "file",
        ext: "js",
        size: 0,
        content:
          "function helloWorld(name) {\n\tconsole.log(`${name} is saying hello!`);\n}\n",
      },
    ],
  },
  {
    name: "style",
    path: "/style",
    type: "folder",
    size: 0,
    content: [
      {
        name: "style.css",
        path: "/style/style.css",
        type: "file",
        ext: "css",
        size: 0,
        content: "body {\n\tmargin: 0;\n\tpadding: 0\n}\n",
      },
    ],
  },
  {
    name: "index.html",
    path: "/index.html",
    type: "file",
    ext: "html",
    size: 0,
    content: `<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t</head>\n\t<body>\n\t</body>\n</html>`,
  },
];

const TOOL_PANEL_WIDTH: number = 250;

const ToolPanel = ({ setToolPanelSize }: Props) => {
  const { context, setContext } = useAppContext();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isNoticeOpened, setIsNoticeOpened] = useState<boolean>(false);
  const [openedTool, setOpenedTool] = useState<string>("");
  const [noticeCount, setNoticeCount] = useState<number>(5);
  const [closedNoticeArr, setClosedNoticeArr] =
    useState<NoticeItem[]>(closedData);
  const [noticeArr, setNoticeArr] = useState<NoticeItem[]>(data);
  const [openedNoticeId, setOpenedNoticeId] = useState<number>(0);
  const [size, setSize] = useState<Size>({ width: "0px", height: "100%" });
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  let tools: Tool[] = [
    { icon: <FileOutlined />, name: "file" },
    { icon: <WechatOutlined />, name: "chat" },
    { icon: <CameraOutlined />, name: "camera" },
    { icon: <SettingOutlined />, name: "settings" },
    {
      icon: (
        <Badge
          className={Style.Badge}
          count={noticeCount}
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

  const openNotice = (id: number) => {
    setOpenedNoticeId(id);
    setIsNoticeOpened(true);
    scrollToCode(getNoticeFromId(id).position);
    setContext({ ...context, isSrcollEventActive: true });
  };

  const toolsToComponents = (tools: Tool[]): ReactNode[] => {
    return tools.map((item) => (
      <div
        key={item.name}
        className={Style.Icon}
        onClick={(e) => onIconClick(e, item.name)}
      >
        {item.icon}
      </div>
    ));
  };

  const scrollToCode = (position: Position) => {
    // oldPos = Editor.getCursor();
    // Editor.setSelection(position);
    // Editor.focus();
    // newPos = Editor.getCursor();
    // pos = Editor.cursorCoords(true, "page");
    // el = document.createElement("div");
    // el.style.cssText = `position: absolute;`;
    // Editor.addWidget(newPos, el, true);
  };

  const openToolPanel = (id: string) => {
    setOpenedTool(id);
    setIsOpened(true);
    setSize({ width: TOOL_PANEL_WIDTH + "px", height: "100%" });
  };

  const closeToolPanel = () => {
    setSize({ width: "0px", height: "100%" });
    setIsOpened(false);
  };

  const onIconClick = (e: any, id: string) => {
    if (isOpened) {
      if (openedTool != id) openToolPanel(id);
      else closeToolPanel();
    } else openToolPanel(id);
  };

  const createNotice = (values: any) => {
    const author: string = "Han Solo";
    const pos = context.noticePos;
    setNoticeArr([
      ...noticeArr,
      {
        id: noticeArr.length + closedNoticeArr.length + 1,
        title: values.Question,
        desc: values.Description,
        author,
        position: { line: 0, ch: 0 },
      },
    ]);
    setNoticeCount(noticeArr.length + 1);
  };

  const getToolComponentByName = (name: string): ReactNode => {
    switch (name) {
      case "file":
        return (
          <FileManager
            data={directory}
            expanded={expandedKeys}
            setExpanded={setExpandedKeys}
          />
        );
      case "chat":
        return <Chat />;
      case "notice":
        return (
          <NotificationPanel
            data={noticeArr}
            setNoticeCount={setNoticeCount}
            setClosedNoticeArr={setClosedNoticeArr}
            setNoticeArr={setNoticeArr}
            openNotice={openNotice}
          />
        );
      case "closed_notice":
        return (
          <ClosedNotificationPanel
            data={closedNoticeArr}
            openNotice={openNotice}
          />
        );
    }
  };

  const getNoticeFromId = (id: number): NoticeItem => {
    return [...noticeArr, ...closedNoticeArr].filter(
      (item) => item.id === id
    )[0];
  };

  const getScrollOffset = () => {
    let pos = { top: 0 };
    let cursorHeight: number = 12;

    const popover = document.getElementsByClassName("CoolMan")[0];

    if (popover) {
      const parent: any = popover.closest(".ant-popover ");

      if (parent.offsetTop < parent.offsetHeight + 5) {
        parent.style.top = pos.top + cursorHeight + "px";
      } else {
        parent.style.top = pos.top - parent.offsetHeight + 5 + "px";
      }
    }
  };

  return (
    <div className={Style.Wrapper}>
      <Space
        className={`${Style.ToolPanel_Icons} ${Style.ToolPanel_Space}`}
        style={{ width: 50, minWidth: 50 }}
        direction="vertical"
      >
        {toolsToComponents(tools)}
      </Space>

      <div className={Style.ToolPanel_OpenedTool} style={{ ...size }}>
        {getToolComponentByName(openedTool)}
      </div>

      {isNoticeOpened && (
        <>
          {getScrollOffset()}
          {ReactDOM.createPortal(
            <div
              style={{
                position: "absolute",
                top: -13,
                left: -20,
              }}
            >
              <EditorNotice
                data={getNoticeFromId(openedNoticeId)}
                isOpened={isNoticeOpened}
                setIsOpened={setIsNoticeOpened}
                element={el}
              ></EditorNotice>
            </div>,
            el
          )}
        </>
      )}
      <NoticeAddComponent createNotice={createNotice} />
    </div>
  );
};

export default ToolPanel;
