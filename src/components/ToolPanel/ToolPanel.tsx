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

const TOOL_PANEL_WIDTH: number = 450;

const ToolPanel = ({ setToolPanelSize }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [openedTool, setOpenedTool] = useState<string>("");

  const toolsToComponents = (tools: Tool[]): ReactNode[] => {
    return tools.map((item) => (
      <div key={item.name} onClick={(e) => onIconClick(e, item.name)}>
        {item.icon}
      </div>
    ));
  };

  const openToolPanel = (id: string) => {
    setOpenedTool(id);
    setIsOpened(true);
    setToolPanelSize({ width: TOOL_PANEL_WIDTH + "px", height: "100%" });
  };

  const closeToolPanel = () => {
    setToolPanelSize({ width: "40px", height: "100%" });
    setIsOpened(false);
  };

  const onIconClick = (e: any, id: string) => {
    if (isOpened) {
      if (openedTool != id) openToolPanel(id);
      else closeToolPanel();
    } else openToolPanel(id);
  };

  const getToolComponentByName = (name: string): ReactNode => {
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
        <div className={Style.ToolPanel_OpenedTool}>
          {getToolComponentByName(openedTool)}
        </div>
      )}
    </div>
  );
};

export default ToolPanel;
