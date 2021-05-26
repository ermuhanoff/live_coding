import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { Context, useAppContext } from "../App/AppContext";
import {} from "../FileManager/FileManager";
import { Emitter, socketRef, VIEW_TYPE } from "../App/App";
import { FileInfo } from "../ToolPanel/ToolPanel";
import axios from "axios";
import { openNotification } from "../Notification/Notification";

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
    setEditorData(Context.fileManagerOpenedFile);
    Emitter.on("open_file", (file: FileInfo) => {
      setEditorData(file);
    });
    Emitter.on("editor_update", (data) => {
      setValue(data.value);
    });
  }, []);

  function setEditorData(file: FileInfo): void {
    if (Editor) {
      let model = Editor.getModel();

      if (model) {
        Monaco.editor.setModelLanguage(model, getModeFromExt(file.ext));
        setValue(getFileContent(file));
      }
    }
  }

  function getFileContent(file: FileInfo): string {
    return typeof file.content === "object" ? "" : file.content;
  }

  function getModeFromExt(ext: string | undefined): string {
    switch (ext) {
      case ".js":
        return "javascript";
      case ".css":
        return "text/css";
      case ".html":
        return "text/html";
      default:
        return "";
    }
  }

  const onChange = (value: any, ev: any): void => {
    const file = {
      value,
      file: Context.fileManagerOpenedFile.path,
    };

    setValue(value);
    socketRef.current?.emit("editor_data", file);
    Emitter.emit("editor_update_self", file);
  };

  const handleEditorDidMount = (
    editor: EditorDidMountParams[0],
    monaco: EditorDidMountParams[1]
  ) => {
    EditorRef.current = editor;
    MonacoRef.current = monaco;

    Monaco = monaco;
    Editor = editor;

    editor.addAction({
      id: "addNotice",
      label: "Add Notice",
      contextMenuGroupId: "2_modification",
      contextMenuOrder: 0,
      run: (editor: EditorDidMountParams[0]) => {
        let sel = editor.getSelection();

        if (sel !== null) {
          Context.noticePos = sel;
          Context.isNoticeAddWindowOpened = true;

          Emitter.emit("open_notice_add");
        }
      },
    });

    if (VIEW_TYPE === "streamer") {
      editor.addAction({
        id: "saveAaction",
        label: "Save Current File",
        contextMenuGroupId: "9_cutcopypaste",
        contextMenuOrder: 0,
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
        run: (editor: EditorDidMountParams[0]) => {
          axios
            .post("http://localhost:4000/savefile", {
              filePath: Context.fileManagerOpenedFile.path,
              content: editor.getValue(),
            })
            .then(() => {
              Emitter.emit("output_reload");
            })
            .catch(() => {
              openNotification({
                message: "Save file error!",
                description: "Unexpected error saving file!",
                type: "error",
              });
            });
        },
      });
    }

    editor.updateOptions({
      roundedSelection: true,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      readOnly: VIEW_TYPE == "streamer" ? false : true,
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

    editor.onDidScrollChange((e) => {
      if (Context.isSrcollEventActive) {
        Emitter.emit("notice_will_scroll", e);
      }
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
