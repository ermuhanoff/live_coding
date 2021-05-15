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
  onVisibleChange,
}: Props) => {
  const toListItems = (data: any[]): ReactNode[] => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          onClick={(e) => {
            if (!item.disabled) action[index](e);
          }}
        >
          {<Text disabled={item.disabled}>{item.el}</Text>}
        </div>
      );
    });
  };

  return (
    <Popover
      placement={placement}
      defaultVisible={visible}
      onVisibleChange={onVisibleChange}
      content={
        <List
          size="small"
          dataSource={toListItems(data)}
          renderItem={(item: ReactNode) => {
            return <List.Item className={Style.List_item}>{item}</List.Item>;
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
