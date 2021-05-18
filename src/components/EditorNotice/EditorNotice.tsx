import React, { ReactNode, FC, ReactPortal, useEffect, useState } from "react";
import { Popover, Space } from "antd";
import { Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { NoticeItem } from "../ToolPanel/ToolPanel";
import { Context } from "../App/AppContext";
import { Editor } from "../Editor/Editor";
import { TooltipPlacement } from "antd/lib/tooltip";
import { Emitter } from "../App/App";

const { Text } = Typography;

interface Props {
  children?: ReactNode[] | Element[] | Element | ReactPortal;
  data: NoticeItem;
  isOpened: boolean;
  setIsOpened: (val: boolean) => void;
  contentWidget: any;
  placement: TooltipPlacement
}

const EditorNotice: FC<Props> = ({
  children,
  data,
  isOpened,
  setIsOpened,
  contentWidget,
  placement
}: Props) => {
  
  return (
    <Popover
      placement={placement}
      visible={isOpened}
      destroyTooltipOnHide
      content={
        <>
          <div className={"CoolMan"}>
            <Text type="secondary" strong style={{ fontSize: "0.8em" }}>
              from {data.author}
            </Text>
          </div>
          <div style={{ padding: "5px 0px", fontSize: "1.2em" }}>
            {data.desc}
          </div>
        </>
      }
      title={
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          {data.title}
          {
            <a
              onClick={() => {
                setIsOpened(false);
                Context.isSrcollEventActive = false;
                Context.decorations = Editor.deltaDecorations(
                  Context.decorations,
                  []
                );
                if (contentWidget) Editor.removeContentWidget(contentWidget);
              }}
            >
              <CloseCircleOutlined />
            </a>
          }
        </Space>
      }
      trigger={"contextMenu"}
    >
      {children}
    </Popover>
  );
};

export default EditorNotice;
