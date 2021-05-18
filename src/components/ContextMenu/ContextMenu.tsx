import React, { ReactNode, FC } from "react";
import { Popover, List } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import Style from "./ContextMenu.module.css";
import { Typography } from "antd";

const { Text } = Typography;

interface Props {
  data: any[];
  action: any[];
  children?: ReactNode | string;
  title?: string;
  placement?: TooltipPlacement;
  trigger?: string;
  visible?: boolean;
  fileItem: any;
  onVisibleChange?: (visible: boolean) => void;
}

const ContextMenu: FC<Props> = ({
  children,
  title = "Context menu",
  placement = "rightBottom",
  trigger = "contextMenu",
  visible = false,
  data,
  action,
  fileItem,
  onVisibleChange,
}: Props) => {
  return (
      <Popover
        placement={placement}
        defaultVisible={visible}
        onVisibleChange={onVisibleChange}
        content={
          <List
            size="small"
            dataSource={data}
            renderItem={(item: any) => {
              return (
                <List.Item
                  className={Style.List_item}
                  style={!item.last ? { border: "none" } : {}}
                >
                  <div
                    key={item.id}
                    onClick={(e) => {
                      if (!item.disabled) action[item.id](e, fileItem);
                    }}
                  >
                    {<Text disabled={item.disabled}>{item.el}</Text>}
                  </div>
                </List.Item>
              );
            }}
          />
        }
        title={title}
        trigger={trigger}
      >
        {children}
      </Popover>
  );
};

export default ContextMenu;
