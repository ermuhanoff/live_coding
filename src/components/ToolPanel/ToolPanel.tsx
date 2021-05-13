import React, { useState, ReactNode } from "react";
import { Space } from "antd";
import FileManager from "../FileManager/FileManager";
import Chat from "../Chat/Chat";
import {
  FileOutlined,
  WechatOutlined,
  CameraOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Style from "./ToolPanel.module.css";

interface Props {
  setToolPanelSize: (state: any) => any;
}

interface Tool {
  icon: ReactNode;
  name: string;
}

const tools = [
  { icon: <FileOutlined />, name: "file" },
  { icon: <WechatOutlined />, name: "chat" },
  { icon: <CameraOutlined />, name: "camera" },
  { icon: <SettingOutlined />, name: "settings" },
];

const ToolPanel = ({ setToolPanelSize }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [openedWindow, setOpenedWindow] = useState<string>("");

  const toolsToComponents = (tools: Tool[]): ReactNode[] => {
    return tools.map((item) => (
      <div onClick={(e) => onIconClick(e, item.name)}>{item.icon}</div>
    ));
  };

  const onIconClick = (e: any, id: string) => {
    if (isOpened) {
      setToolPanelSize({ width: "40px", height: "100%" });
      setIsOpened(false);
    } else {
      setIsOpened(true);
      setToolPanelSize({ width: "400px", height: "100%" });
      setOpenedWindow(id);
    }
  };

  const getComponentByName = (name: string): ReactNode => {
    if (name === "file") {
      return <FileManager />;
    } else if (name === "chat") {
      return <Chat />;
    }
  };

  return (
    <div className={Style.Wrapper}>
      <Space
        className={`${Style.ToolPanel_Icons} ${Style.ToolPanel_Space}`}
        direction="vertical"
      >
        {toolsToComponents(tools)}
      </Space>
      {isOpened && (
        <div className={Style.ToolPanel_FileManager}>
          {getComponentByName(openedWindow)}
        </div>
      )}
    </div>
  );
};

export default ToolPanel;
