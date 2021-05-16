import React, { ReactNode, FC, useRef, ReactPortal } from "react";
import { Popover, List } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import Style from "./ContextMenu.module.css";
import { Typography } from "antd";

interface Props {
  children?: ReactNode[] | Element[] | Element | ReactPortal;
}

export let ref = React.createRef<HTMLElement>();

const EditorNotice: FC<Props> = ({ children }: Props) => {
  return (
    <Popover
      ref={ref}
      placement={"topLeft"}
      defaultVisible={true}
      visible={true}
      content={"content"}
      title={"Notice"}
      trigger={"contextMenu"}
    >
      {children}
    </Popover>
  );
};

export default EditorNotice;
