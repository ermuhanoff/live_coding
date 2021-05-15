import React from "react";
import ContextMenuPoint from "../ContextMenu/ContextMenuPoint";
import ContextMenu from "../ContextMenu/ContextMenu";

interface Props {
  setContextMenu: (visible: boolean) => void;
  pos: {
    x: number;
    y: number;
  };
  cm: any;
}
const data = [
  { el: "Cut", disabled: true },
  { el: "Copy", disabled: false },
  { el: "Paste", disabled: false },
];
const action: any[] = [
  (e: any) => console.log("CUT"),
  (e: any) => console.log("COPY"),
];

const EditorContextMenu = ({ setContextMenu, pos, cm }: Props) => {
  return (
    <ContextMenu
      data={data}
      action={action}
      visible={true}
      placement={"rightTop"}
      onVisibleChange={(visible) => {
        setContextMenu(visible);
      }}
    >
      <ContextMenuPoint size={{ x: pos.x, y: pos.y }} />
    </ContextMenu>
  );
};

export default EditorContextMenu;
