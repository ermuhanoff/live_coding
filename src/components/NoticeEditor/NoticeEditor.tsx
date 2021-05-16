import React from "react";
import { UnControlled } from "react-codemirror2";
import Options from "../Editor/EditorOptions";
import "codemirror/lib/codemirror.css";
import "../Editor/Editor.css";

interface Props {
  value: string;
  lineStart: number;
}

const NoticeEditor = ({ value, lineStart }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <UnControlled
        className={"CodeMirror_custom CodeMirror_notice"}
        options={{
          ...Options,
          firstLineNumber: lineStart,
          //   readOnly: "nocursor",
          lint: false,
          cursorHeight: 0
        }}
        value={value}
        onChange={(c, e) => {}}
        onBeforeChange={(c, e: any) => {
          if (e.text.join("\n") !== value) e.cancel();
        }}
      ></UnControlled>
    </div>
  );
};

export default NoticeEditor;
