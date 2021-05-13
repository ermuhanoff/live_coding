import { useState } from "react";
import WorkSpaceItem from "../WorkSpaceItem/WorkSpaceItem";
import Editor from "../Editor/Editor";
import ToolPanel from "../ToolPanel/ToolPanel";
import OutputWindow from "../OutputWindow/OutputWindow";
import Style from "./WorkSpace.module.css";

const WorkSpace = () => {
  const [toolPanelSize, setToolPanelSize] = useState({
    width: "40px",
    height: "100%",
  });
  return (
    <div className={Style.WorkSpace}>
      <WorkSpaceItem size={toolPanelSize}>
        <ToolPanel setToolPanelSize={setToolPanelSize} />
      </WorkSpaceItem>
      <WorkSpaceItem size={{ width: "50%", height: "100%" }}>
        <Editor />
      </WorkSpaceItem>
      <WorkSpaceItem size={{ width: "50%", height: "100%" }}>
        <OutputWindow />
      </WorkSpaceItem>
    </div>
  );
};

export default WorkSpace;
