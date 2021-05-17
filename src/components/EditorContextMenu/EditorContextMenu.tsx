import React from "react";
import ContextMenuPoint from "../ContextMenu/ContextMenuPoint";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useAppContext } from "../App/AppContext";
import { Monaco, Editor } from "../Editor/Editor";

interface Props {
  setContextMenu: (visible: boolean) => void;
  pos: {
    x: number;
    y: number;
  };
  cm: any;
}

const EditorContextMenu = ({ setContextMenu, pos, cm }: Props) => {
  const { context, setContext } = useAppContext();

  const onCopy = (e: any) => {
    // let selected: string = Doc.getSelection();
    // if (selected === "") {
    //   navigator.clipboard.writeText(Doc.getLine(Doc.getCursor().line));
    // } else {
    //   navigator.clipboard.writeText(selected);
    // }

    // setContextMenu(false);
  };

  const data = [
    { el: "Cut", disabled: true },
    { el: "Copy", disabled: false },
    { el: "Paste", disabled: false },
    { el: "Add notice", disabled: false },
  ];
  const action: any[] = [
    (e: any) => console.log("CUT"),
    onCopy,
    (e: any) => console.log("Pase"),
    (e: any) => {
      setContext((prev) => ({ ...prev, isNoticeAddWindowOpened: true }));
      setContextMenu(false);
    },
  ];

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
