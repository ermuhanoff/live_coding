import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Card, Avatar } from "antd";
import { Doc, Editor } from "../Editor/Editor";
import {
  UserOutlined,
  CodeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Position } from "codemirror";
import EditorContextMenu from "../EditorContextMenu/EditorContextMenu";
import Style from "./Notice.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import EditorNotice, { ref } from "../EditorNotice/EditorNotice";

const { Meta } = Card;
let oldPos: Position;
let newPos: Position;
let pos: any;
let el: HTMLElement;

const Notice = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onCodeClick = () => {
    // Doc.setCursor(70, 11);
    oldPos = Doc.getCursor();

    Doc.setSelection({ line: 69, ch: 10 });
    Editor.focus();

    newPos = Doc.getCursor();
    pos = Editor.cursorCoords(true, "page");
    el = document.createElement("div");
    el.className = "Notice_Popover";
    el.style.cssText = ` position: absolute;
    width: 10px;
    height: 10px;
    background-color: #f00;`;

    Editor.addWidget(newPos, el, true);

    setIsOpened(true);
  };
  const onCloseClick = () => {};
  return (
    <>
      <Card
        size="small"
        //   style={{ width: 300 }}
        actions={[
          <CodeOutlined key="code" onClick={onCodeClick} />,
          <CloseCircleOutlined key="close" onClick={onCloseClick} />,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title="What is it, dude? ahahhahahaha lol"
          description="I don`t know what is it, in 6 row... Help me booy!"
        />
      </Card>

      {isOpened && (
        <>
          {ReactDOM.createPortal(
            <div
              style={{
                position: "absolute",
              }}
            >
              <EditorNotice>{ReactDOM.createPortal(<div></div>, el)}</EditorNotice>
            </div>,
            el
          )}
        </>
      )}
    </>
  );
};

export default Notice;
