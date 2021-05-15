import { useState } from "react";
import WorkSpaceItem from "../WorkSpaceItem/WorkSpaceItem";
import Editor from "../Editor/Editor";
import ToolPanel from "../ToolPanel/ToolPanel";
import OutputWindow from "../OutputWindow/OutputWindow";
import Style from "./WorkSpace.module.css";

export interface Size {
  width: string;
  height: string;
}

const WorkSpace = () => {
  const [toolPanelSize, setToolPanelSize] = useState<Size>({
    width: "40px",
    height: "100%",
  });
  const [editorSize, setEditorSize] = useState<Size>({
    width: "50%",
    height: "100%",
  });
  const [outputSize, setOutputSize] = useState<Size>({
    width: "50%",
    height: "100%",
  });

  return (
    <div className={Style.WorkSpace}>
      <WorkSpaceItem
        size={toolPanelSize}
        setSize={setToolPanelSize}
        nextSize={editorSize}
        setNextSize={setEditorSize}
      >
        <ToolPanel setToolPanelSize={setToolPanelSize} />
      </WorkSpaceItem>
      <WorkSpaceItem
        size={editorSize}
        setSize={setEditorSize}
        nextSize={outputSize}
        setNextSize={setOutputSize}
      >
        <Editor />
      </WorkSpaceItem>
      <WorkSpaceItem
        size={outputSize}
        setSize={setToolPanelSize}
        nextSize={editorSize}
        setNextSize={setEditorSize}
      >
        <OutputWindow />
      </WorkSpaceItem>
    </div>
  );
};

export default WorkSpace;
