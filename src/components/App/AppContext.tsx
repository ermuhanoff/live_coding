import { TooltipPlacement } from "antd/lib/tooltip";
import { Position } from "codemirror";
import { createContext, useContext, useState } from "react";
import { FileInfo } from "../ToolPanel/ToolPanel";

export const Context = {
  isNoticeAddWindowOpened: false,
  noticePos: {
    startColumn: 0,
    startLineNumber: 0,
    endColumn: 0,
    endLineNumber: 0,
  },
  lineRange: {
    from: 0,
    to: 0,
  },
  scrollInfo: {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    clientWidth: 0,
    clientHeight: 0,
  },
  isSrcollEventActive: false,
  fileManagerOpenedFile: { content: "" } as FileInfo,
  decorations: [] as string[],
  placement: "topLeft" as TooltipPlacement,
  username: ""
};

export type AppContextType = typeof Context;

export type ContextStateType = {
  context: AppContextType;
  setContext: React.Dispatch<React.SetStateAction<AppContextType>>;
};

export const ContextState: ContextStateType = {
  context: Context,
  setContext: () => {},
};
const AppContext = createContext<ContextStateType>(ContextState);

export const useAppContext = (): ContextStateType =>
  useContext<ContextStateType>(AppContext);

export default AppContext;
