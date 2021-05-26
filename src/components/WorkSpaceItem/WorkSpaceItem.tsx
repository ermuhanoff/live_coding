import React, { DOMElement, FC, ReactNode, useState, useEffect } from "react";
import Style from "./WorkSapceItem.module.css";
import Dragable, { DraggableEvent } from "react-draggable";
import { Size } from "../WorkSpace/WorkSpace";

interface Props {
  children?: ReactNode;
  size?: Size;
}

let width: number;
const ITEM = React.createRef<HTMLDivElement>();

const WorkSpaceItem: FC<Props> = ({
  children,
  size = { width: "100%", height: "100%" },
}: Props) => {
  useEffect(() => {
    width = ITEM.current?.offsetWidth || 0;
  }, []);

  return (
    <div
      ref={ITEM}
      className={Style.WorkSpaceItem}
      style={{ ...size }}
    >
      {children}
    </div>
  );
};

export default WorkSpaceItem;
