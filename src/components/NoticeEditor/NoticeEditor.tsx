import React from "react";
import "codemirror/lib/codemirror.css";
import "../Editor/Editor.css";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

type EditorDidMountParams = Parameters<OnMount>;

interface Props {
  value: string;
  lineStart: number;
  lineCount: number;
}

const EDITOR_PADDING: number = 10;
const LINE_HEIGHT: number = 19;
const MAX_LINE_COUNT: number = 12;
const MAX_LINE_HEIGHT: number = 250;

const NoticeEditor = ({ value, lineStart, lineCount }: Props) => {
  const handleEditorDidMount = (
    editor: EditorDidMountParams[0],
    monaco: EditorDidMountParams[1]
  ) => {
    editor.updateOptions({
      roundedSelection: true,
      scrollBeyondLastLine: false,
      readOnly: true,
      minimap: {
        enabled: false,
      },
      lineNumbers: (num) => lineStart + num - 1 + "",
      padding: { bottom: EDITOR_PADDING, top: EDITOR_PADDING },
    });

    monaco.editor.defineTheme("vs-dark-custom", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.selectionBackground": "#e6e6e625",
        "editor.inactiveSelectionBackground": "#e6e6e615",
      },
    });
    monaco.editor.setTheme("vs-dark-custom");
  };

  return (
    <>
      <MonacoEditor
        className={"CodeMirror_custom"}
        defaultLanguage="javascript"
        defaultValue={value}
        theme="vs-dark"
        value={value}
        onMount={handleEditorDidMount}
        height={
          lineCount > MAX_LINE_COUNT
            ? MAX_LINE_HEIGHT
            : (lineCount + 1) * LINE_HEIGHT + EDITOR_PADDING * 2
        }
      />
    </>
  );
};

export default NoticeEditor;
