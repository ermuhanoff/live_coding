import React from "react";
import Style from "./ContextMenu.module.css";

interface Props {
  size: { x: number; y: number };
}

const ContextMenuPoint = ({ size }: Props) => {
  return (
    <div
      className={Style.ContextMenuPoint}
      style={{ top: size.y, left: size.x }}
    ></div>
  );
};

export default ContextMenuPoint;
