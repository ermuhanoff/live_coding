import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { useAppContext } from "../App/AppContext";

type EditorDidMountParams = Parameters<OnMount>;

export let Monaco: EditorDidMountParams[1];
export let Editor: EditorDidMountParams[0];
export const scrollInfo: any = {};

const EditorComponent = () => {
  const { context, setContext } = useAppContext();
  const [value, setValue] = useState<string>("");
  const EditorRef = useRef<EditorDidMountParams[0]>();
  const MonacoRef = useRef<EditorDidMountParams[1]>();

  useEffect(() => {
    if (Editor) {
      let model = Editor.getModel();
      let content =
        typeof context.fileManagerOpenedFile.content === "object"
          ? ""
          : context.fileManagerOpenedFile.content;

      if (model) {
        Monaco.editor.setModelLanguage(
          model,
          getModeFromExt(context.fileManagerOpenedFile.ext)
        );

        setValue(content);
      }
    }
  }, [context.fileManagerOpenedFile]);

  function getModeFromExt(ext: string | undefined): string {
    switch (ext) {
      case "js":
        return "javascript";
      case "css":
        return "text/css";
      case "html":
        return "text/html";
      default:
        return "";
    }
  }

  const onChange = (value: any, ev: any): void => {
    setValue(value);
  };

  const handleEditorDidMount = (
    editor: EditorDidMountParams[0],
    monaco: EditorDidMountParams[1]
  ) => {
    EditorRef.current = editor;
    MonacoRef.current = monaco;

    Monaco = monaco;
    Editor = editor;

    Editor.onContextMenu((e) => {
      const cursor = document.querySelector(
        "textarea.monaco-mouse-cursor-text"
      ) as HTMLElement;
      const el = document.createElement("div");
      const offsetY: number = 40 + 10 + 2;
      const offsetX: number = 20;

      if (cursor) {
        el.style.position = "absolute";
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.backgroundColor = "#f00";
        el.style.top = cursor.offsetTop + offsetX + "px";
        el.style.left = cursor.offsetLeft + offsetY + "px";
        el.style.zIndex = "999";

        document.body.append(el);
        console.dir(cursor);
      }
    });

    editor.addAction({
      id: "addNotice",
      label: "Add notice",
      contextMenuGroupId: "2_modification",
      contextMenuOrder: 0,
      run: (editor: EditorDidMountParams[0]) => {
        let sel = editor.getSelection();

        if (sel !== null) {
          setContext({
            ...context,
            noticePos: {
              startColumn: sel.startColumn,
              startLineNumber: sel.startLineNumber,
              endColumn: sel.endColumn,
              endLineNumber: sel.endLineNumber,
            },
            lineRange: {
              from: sel.startLineNumber,
              to: sel.endLineNumber,
            },
            isNoticeAddWindowOpened: true,
          });
        }
      },
    });
  };

  return (
    <>
      <MonacoEditor
        className={"CodeMirror_custom"}
        defaultLanguage="javascript"
        defaultValue=""
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default EditorComponent;
