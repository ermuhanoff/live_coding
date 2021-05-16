import React, { ReactNode, FC, ReactPortal } from "react";
import { Popover, Space } from "antd";
import { Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { NoticeItem } from "../ToolPanel/ToolPanel";

const { Text } = Typography;

interface Props {
  children?: ReactNode[] | Element[] | Element | ReactPortal;
  data: NoticeItem;
  isOpened: boolean;
  setIsOpened: (val: boolean) => void;
  element: HTMLElement;
}

const EditorNotice: FC<Props> = ({
  children,
  data,
  isOpened,
  setIsOpened,
  element,
}: Props) => {
  return (
    <Popover
      placement={"topLeft"}
      defaultVisible={true}
      visible={isOpened}
      destroyTooltipOnHide
      content={
        <>
          <div>
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
                element.remove();
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
