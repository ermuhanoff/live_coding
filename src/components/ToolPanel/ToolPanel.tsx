import React, { useState, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Space, Badge, Drawer, Button, Typography } from "antd";
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
import EditorNotice from "../EditorNotice/EditorNotice";
import { Context, useAppContext } from "../App/AppContext";
import NoticeAddComponent from "../NoticeAddComponent/NoticeAddComponent";
import { Size } from "../WorkSpace/WorkSpace";
import MonacoRef from "monaco-editor";
import { Emitter, socketRef, VIEW_TYPE } from "../App/App";
import { TooltipPlacement } from "antd/lib/tooltip";
import axios from "axios";
import { openNotification } from "../Notification/Notification";

interface Props {
  setToolPanelSize: (state: any) => any;
}

export interface NoticeItem {
  id: number;
  title: string;
  desc: string;
  author: string;
  position: MonacoRef.IRange;
  currentFile: string;
}

export interface Message {
  content: string;
  title: string;
  date: string;
}

export interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  ext: string;
  size: number;
  content: string;
  children: FileInfo[];
}

interface Tool {
  icon: ReactNode;
  name: string;
}

const { Text } = Typography;
const closedData: NoticeItem[] = [
  {
    id: 6,
    title: "Очень непонятно!",
    desc: "Можешь ещё раз объяснить что тут. Я всё пропустил.",
    author: "Kolya",
    position: {
      startLineNumber: 4,
      endLineNumber: 5,
      startColumn: 4,
      endColumn: 6,
    },
    currentFile:
      "C:\\Users\\ermuh\\Documents\\js_projects\\live_coding_server\\root\\scripts\\index.js",
  },
  {
    id: 7,
    title: "А что делает этот участок кода?",
    desc: "Я понял, что возвращаемое значение не определено, но как не падает ошибка?\nЭто здесь реализованно или как?",
    author: "Olga",
    position: {
      startLineNumber: 40,
      endLineNumber: 40,
      startColumn: 60,
      endColumn: 60,
    },
    currentFile: "/script/index.js",
  },
  {
    id: 8,
    title: "Аааа! Как это работает?",
    desc: "Голова кипит! Пж, расскажи как это получется.\nНичего не понимаю, помоги!",
    author: "Dasha",
    position: {
      startLineNumber: 55,
      endLineNumber: 55,
      startColumn: 12,
      endColumn: 34,
    },
    currentFile: "/script/index.js",
  },
];
const data: NoticeItem[] = [
  {
    id: 1,
    title: "Что в этой строчке кода?",
    desc: "Никак немогу разобраться. Объясни плиз!",
    author: "Dima",
    position: {
      startLineNumber: 7,
      endLineNumber: 12,
      startColumn: 10,
      endColumn: 10,
    },
    currentFile: "/script/index.js",
  },
  {
    id: 2,
    title: "А это работает везде так?",
    desc: "А если заначения будут другими или контест поменяется?\nВожможно ли падение ошибки?",
    author: "Danya",
    position: {
      startLineNumber: 1,
      endLineNumber: 3,
      startColumn: 12,
      endColumn: 12,
    },
    currentFile: "/script/index.js",
  },
  {
    id: 3,
    title: "Хах, прикольно",
    desc: "Очень интересно написано. Правда рефакторинг трудный будет.",
    author: "Vova",
    position: {
      startLineNumber: 23,
      endLineNumber: 23,
      startColumn: 23,
      endColumn: 23,
    },
    currentFile: "/script/index.js",
  },
  {
    id: 4,
    title: "Что-то странное",
    desc: "Очень странное поведение тут. Возможно из-за пееременной... Или возможно, контекст не тот.\nПопробуй проверь",
    author: "Oleg",
    position: {
      startLineNumber: 45,
      endLineNumber: 45,
      startColumn: 2,
      endColumn: 2,
    },
    currentFile: "/script/index.js",
  },
];

let messages: Message[] = [];
let directory: FileInfo[] = [];
let openedToolVar: string = "";
let isOpenedToolVar: boolean = false;
let newMessages: number = 0;
let updateNum = 0;

const TOOL_PANEL_WIDTH: number = 250;
const noticePoint = document.createElement("div");

const ToolPanel = ({ setToolPanelSize }: Props) => {
  const { context, setContext } = useAppContext();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isNoticeOpened, setIsNoticeOpened] = useState<boolean>(false);
  const [openedTool, setOpenedTool] = useState<string>("");
  const [noticeCount, setNoticeCount] = useState<number>(data.length);
  const [messageCount, setMesssageCount] = useState<number>(newMessages);
  const [messageArr, setMessageArr] = useState<Message[]>(messages);
  const [closedNoticeArr, setClosedNoticeArr] =
    useState<NoticeItem[]>(closedData);
  const [noticeArr, setNoticeArr] = useState<NoticeItem[]>(data);
  const [openedNoticeId, setOpenedNoticeId] = useState<number>(0);
  const [size, setSize] = useState<Size>({ width: "0px", height: "100%" });
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [placement, setPlacement] = useState<TooltipPlacement>("topLeft");
  const [filesArr, setFilesArr] = useState<FileInfo[]>(directory);
  const [update, setUpdate] = useState<number>(updateNum);

  function forceUpdate() {
    setUpdate(++updateNum);
  }

  let contentWidget;

  useEffect(() => {
    Emitter.on("close_notice_add", () => {});

    Emitter.on("notice_will_scroll", (e) => {
      const popover = document.getElementsByClassName("CoolMan")[0];
      const wOffset = noticePoint.offsetTop;
      const sOffset = e.scrollTop;
      const offset = wOffset - sOffset;

      if (popover) {
        const parent: HTMLElement | null = popover.closest(".ant-popover ");

        if (!parent) return;

        if (parent?.classList.contains("ant-popover-placement-bottomLeft")) {
          parent.style.top = offset + 17 + "px";
        } else {
          parent.style.top = offset - parent.offsetHeight - 2 + "px";
        }
      }
    });

    axios
      .get("http://localhost:4000/directory")
      .then((json) => {
        json.data.sort((a: FileInfo, b: FileInfo) => {
          if (a.isDirectory) return -1;
          else if (b.isDirectory) return 0;
          return 1;
        });

        directory = json.data;
        setFilesArr(directory);
      })
      .catch((err) => {
        openNotification({
          message: <Text type="danger">Files fetch error.</Text>,
          description:
            "Unexpected error on server! Try to reload page.\n" + err,
          type: "error",
        });
      });

    axios
      .get("http://localhost:4000/chat_messages")
      .then((json) => {
        messages = json.data;
        setMessageArr(messages);
        setMesssageCount(messages.length);
      })
      .catch((err) => {
        openNotification({
          message: <Text type="danger">Chat messages fetch error.</Text>,
          description:
            "Unexpected error on server! Try to reload page.\n" + err,
          type: "error",
        });
      });

    Emitter.on("chat_message", (data) => {
      messages.push(data);

      if (isOpenedToolVar) {
        if (openedToolVar !== "chat") {
          newMessages++;
          setMesssageCount(newMessages);
        }
      } else {
        newMessages++;
        setMesssageCount(newMessages);
      }

      setMessageArr(messages);
      forceUpdate();
    });

    Emitter.on("editor_data_broadcast", (data) => {
      directory.forEach((item) => {
        if (item.path === data.file) {
          item.content = data.value;

          setFilesArr(directory);
        }
      });

      if (Context.fileManagerOpenedFile.path === data.file) {
        Context.fileManagerOpenedFile.content = data.value;
        Emitter.emit("editor_update", data);
      }
    });
  }, []);

  const tools: Tool[] =
    VIEW_TYPE === "streamer"
      ? [
          { icon: <FileOutlined />, name: "file" },
          {
            icon: (
              <Badge
                className={Style.Badge}
                count={messageCount}
                overflowCount={100}
                size="small"
                offset={[-5, 0]}
                title={"Unread messages"}
              >
                <WechatOutlined className={Style.ToolPanel_Icons} />
              </Badge>
            ),
            name: "chat",
          },
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
        ]
      : [
          { icon: <FileOutlined />, name: "file" },
          {
            icon: (
              <Badge
                className={Style.Badge}
                count={messageCount}
                overflowCount={100}
                size="small"
                offset={[-5, 0]}
                title={"Unread messages"}
              >
                <WechatOutlined className={Style.ToolPanel_Icons} />
              </Badge>
            ),
            name: "chat",
          },
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

  Context.placement = "topLeft";

  const openNotice = (id: number) => {
    if (isNoticeOpened) {
      setIsNoticeOpened(false);
      Editor.deltaDecorations(Context.decorations, []);
      Context.isSrcollEventActive = false;
    }

    const notice = getNoticeFromId(id);

    if (Context.fileManagerOpenedFile.path !== notice.currentFile) {
      Emitter.emit("notice_open_file", { path: notice.currentFile });
    }

    Editor.revealLineInCenter(getNoticeFromId(id).position.startLineNumber, 0);

    let scrollTop = Editor.getScrollTop();
    let place: number;

    if (notice.position.startLineNumber < 10) {
      place = notice.position.endLineNumber;
      Context.placement = "bottomLeft";
    } else {
      place = notice.position.startLineNumber;
      Context.placement = "topLeft";
    }

    setPlacement(Context.placement);

    contentWidget = {
      getId: function () {
        return "my.content.widget";
      },
      getDomNode: function () {
        return noticePoint;
      },
      getPosition: function () {
        return {
          position: {
            lineNumber: place,
            column:
              (notice.position.endColumn - notice.position.startColumn) / 2,
          },
          preference: [
            Monaco.editor.ContentWidgetPositionPreference.ABOVE,
            Monaco.editor.ContentWidgetPositionPreference.BELOW,
          ],
        };
      },
    };
    Editor.addContentWidget(contentWidget);

    Context.decorations = Editor.deltaDecorations(
      [],
      [
        {
          range: notice.position,
          options: {
            isWholeLine: true,
            className: "noticeLineSelected",
            marginClassName: "noticeLineSelectedMargin",
            glyphMarginClassName: "noticeLineSelectedGlyph",
            hoverMessage: { value: `${notice.title} from ${notice.author}` },
          },
        },
      ]
    );

    setOpenedNoticeId(id);
    setIsNoticeOpened(true);
    Context.isSrcollEventActive = true;
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

  const openToolPanel = (id: string) => {
    setOpenedTool(id);
    openedToolVar = id;
    setIsOpened(true);
    isOpenedToolVar = true;
    setSize({ width: TOOL_PANEL_WIDTH + "px", height: "100%" });

    if (openedToolVar === "chat") {
      newMessages = 0;
      setMesssageCount(newMessages);
    }
  };

  const closeToolPanel = () => {
    setSize({ width: "0px", height: "100%" });
    setIsOpened(false);
    isOpenedToolVar = false;
  };

  const onIconClick = (e: any, id: string) => {
    if (isOpened) {
      if (openedTool != id) {
        openToolPanel(id);
        openedToolVar = id;
      } else closeToolPanel();
    } else {
      openToolPanel(id);
      openedToolVar = id;
    }
  };

  const createNotice = (values: any) => {
    const author: string = "Han Solo";
    const pos = Context.noticePos;
    setNoticeArr([
      ...noticeArr,
      {
        id: noticeArr.length + closedNoticeArr.length + 1,
        title: values.Question,
        desc: values.Description,
        author,
        position: pos,
        currentFile: Context.fileManagerOpenedFile.path,
      },
    ]);
    setNoticeCount(noticeArr.length + 1);
  };

  const getToolComponentByName = (name: string): ReactNode => {
    switch (name) {
      case "file":
        return (
          <FileManager
            data={filesArr}
            expanded={expandedKeys}
            setExpanded={setExpandedKeys}
          />
        );
      case "chat":
        return (
          <Chat
            key={update}
            sourceMessages={messages}
            messages={messageArr}
            setMessageArr={setMessageArr}
            setMessageCount={setMesssageCount}
          />
        );
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
          {ReactDOM.createPortal(
            <div
              style={{
                position: "absolute",
                top: 13,
              }}
            >
              <EditorNotice
                placement={placement}
                data={getNoticeFromId(openedNoticeId)}
                isOpened={isNoticeOpened}
                setIsOpened={setIsNoticeOpened}
                contentWidget={contentWidget}
              ></EditorNotice>
            </div>,
            noticePoint
          )}
        </>
      )}
      <NoticeAddComponent createNotice={createNotice} />
    </div>
  );
};

export default ToolPanel;
