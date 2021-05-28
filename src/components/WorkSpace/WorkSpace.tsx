import { useState } from "react";
import WorkSpaceItem from "../WorkSpaceItem/WorkSpaceItem";
import EditorComponent from "../Editor/Editor";
import ToolPanel from "../ToolPanel/ToolPanel";
import OutputWindow from "../OutputWindow/OutputWindow";
import Style from "./WorkSpace.module.css";
import { Resizable } from "re-resizable";

export interface Size {
  width: string;
  height: string;
}

const style: any = {
  display: "flex",
  width: "100%",
  flexShrink: 1,
};

const enable = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

let toolPanelRezisable: any;

const WorkSpace = () => {
  const defToolPanelSize = {
    width: "10px",
    height: "100%",
  };
  const [toolPanelSize, setToolPanelSize] = useState<Size>({
    width: "max-content",
    height: "100%",
  });
  const [editorSize, setEditorSize] = useState<Size>({
    width: "100px",
    height: "100%",
  });
  const [outputSize, setOutputSize] = useState<Size>({
    width: "400px",
    height: "100%",
  });

  function updateToolPanelSize(size: Size): void {
    setToolPanelSize(size);

    toolPanelRezisable.updateSize(size);
  }

  return (
    <div className={Style.WorkSpace}>
      <WorkSpaceItem size={toolPanelSize}>
        <ToolPanel setToolPanelSize={setToolPanelSize} />
      </WorkSpaceItem>
      <Resizable
        style={{ backgroundColor: "#1b1b1b", flexGrow: 1 }}
        size={editorSize}
        enable={enable}
        defaultSize={editorSize}
        onResizeStop={(e, direction, ref, d) => {
          setEditorSize({
            width: parseInt(editorSize.width) + d.width + "px",
            height: "100%",
          });
        }}
      >
        <WorkSpaceItem size={{ width: "100%", height: "100%" }}>
          <EditorComponent />
        </WorkSpaceItem>
      </Resizable>
      <Resizable
        style={{ backgroundColor: "#1b1b1b" }}
        size={outputSize}
        enable={{ ...enable, left: true, right: false }}
        defaultSize={outputSize}
        minWidth={"15%"}
        maxWidth={"80%"}
        onResizeStop={(e, direction, ref, d) => {
          setOutputSize({
            width: parseInt(outputSize.width) + d.width + "px",
            height: "100%",
          });
        }}
      >
        <WorkSpaceItem size={{ width: "100%", height: "100%" }}>
          <OutputWindow />
        </WorkSpaceItem>
      </Resizable>
    </div>
  );
};

export default WorkSpace;
