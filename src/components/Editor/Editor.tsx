import React, { useState } from "react";
import { Controlled } from "react-codemirror2";
import Options from "./EditorOptions";
import "./Editor.css";
import "codemirror/lib/codemirror.css";


const Editor = () => {
  const [value, setValue] = useState<string>("let str = 'Hello World!';\n");

  const onBeforeChange = (editor: any, data: any, value: string): void => {
    setValue(value);
  };

  const onChange = (editor: any, data: any, value: string): void => {};

  return (
    <Controlled
      value={value}
      options={Options}
      onBeforeChange={onBeforeChange}
      onChange={onChange}
    ></Controlled>
  );
};

export default Editor;
