import React, { ReactNode, FC } from "react";
import { Popover, List } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import Style from "./ContextMenu.module.css";

interface Props {
  children?: ReactNode | string;
  title?: string;
  placement?: TooltipPlacement;
  trigger?: string;
}

const ContextMenu: FC<Props> = ({
  children,
  title = "Context menu",
  placement = "rightBottom",
  trigger = "contextMenu",
}: Props) => {
  return (
    <Popover
      placement={placement}
      content={
        <List
          size="small"
          dataSource={["Open", "Copy", "Delete", "Rename"]}
          renderItem={(item: ReactNode) => (
            <List.Item className={Style.List_item}>{item}</List.Item>
          )}
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
