import React from "react";
import WorkSpaceItem from "../WorkSpaceItem/WorkSpaceItem";
import Editor from "../Editor/Editor";
import Chat from "../Chat/Chat";
import FileManager from "../FileManager/FileManager";
import Style from "./WorkSpace.module.css";

const WorkSpace = () => {
  return (
    <div className={Style.WorkSpace}>
      <WorkSpaceItem size={{ width: 60, height: 100 }}>
        <Editor />
      </WorkSpaceItem>
      <WorkSpaceItem size={{ width: 40, height: 100 }}>
        <WorkSpaceItem size={{ width: 100, height: 50 }}>
          <FileManager />
        </WorkSpaceItem>
        <WorkSpaceItem size={{ width: 100, height: 50 }}>
          <Chat />
        </WorkSpaceItem>
      </WorkSpaceItem>
    </div>
  );
};

export default WorkSpace;
