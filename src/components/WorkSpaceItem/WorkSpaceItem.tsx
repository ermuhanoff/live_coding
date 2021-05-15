import React, { DOMElement, FC, ReactNode, useState, useEffect } from "react";
import Style from "./WorkSapceItem.module.css";
import Dragable, { DraggableEvent } from "react-draggable";
import { Size } from "../WorkSpace/WorkSpace";

interface Props {
  children?: ReactNode;
  size?: Size;
  nextSize: Size;
  setSize: (size: Size) => void;
  setNextSize: (size: Size) => void;
}

let startPos: number;
let offset: number;
let percent: number = 50;
let width: number;
const ITEM = React.createRef<HTMLDivElement>();

const WorkSpaceItem: FC<Props> = ({
  children,
  size = { width: "100%", height: "100%" },
  nextSize,
  setSize,
  setNextSize,
}: Props) => {
  const onDragStart = (e: DraggableEvent): void => {
    // console.log(e);
    startPos = (e as MouseEvent).clientX;
  };
  const onDragEnd = (e: DraggableEvent): void => {
    // console.log(e);
  };
  const onDrag = (e: DraggableEvent): void => {
    // console.log(e);
    let pos: number = (e as MouseEvent).clientX;
    offset = pos - startPos;
    let newWidth: number = width + offset;

    console.log(percent, width);

    let newPercent: number = (newWidth * percent) / width;

    console.log("new:", newPercent);

    

    setNextSize({ ...nextSize, width: 100 - newPercent + "%" });
    setSize({ ...size, width: newPercent + "%" });
  };

  useEffect(() => {
    width = ITEM.current?.offsetWidth || 0;
  }, []);

  return (
    <div ref={ITEM} className={Style.WorkSpaceItem} style={size}>
      {children}
      <Dragable
        axis="x"
        scale={2}
        onStart={onDragStart}
        onDrag={onDrag}
        onStop={onDragEnd}
      >
        <div className={Style.WorkSpaceItem_Resizer}></div>
      </Dragable>
    </div>
  );
};

export default WorkSpaceItem;
