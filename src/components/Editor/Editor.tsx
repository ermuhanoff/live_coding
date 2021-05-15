import React, { useState } from "react";
import { Controlled } from "react-codemirror2";
import EditorContextMenu from "../EditorContextMenu/EditorContextMenu";

import Options from "./EditorOptions";
import "codemirror/lib/codemirror.css";
import "./Editor.css";
import CodeMirror from "codemirror";

let x: number;
let y: number;
let editor: any;

const Editor = () => {
  const [value, setValue] = useState<string>("let str = 'Hello World!';\n");
  const [isContextMenu, setContextMenu] = useState<boolean>(false);

  const onBeforeChange = (editor: any, data: any, value: string): void => {
    setValue(value);
  };

  const onChange = (editor: any, data: any, value: string): void => {};

  const onContexMenu = (cm: any, e: any) => {
    e.preventDefault();
    editor = cm;

    x = e.clientX;
    y = e.clientY - 15;

    setContextMenu(true);
  };

  return (
    <>
      <Controlled
        className={"CodeMirror"}
        value={value}
        options={Options}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
        onContextMenu={onContexMenu}
      ></Controlled>
      {isContextMenu && (
        <EditorContextMenu setContextMenu={setContextMenu} pos={{ x, y }} cm={editor}/>
      )}
    </>
  );
};

export default Editor;
