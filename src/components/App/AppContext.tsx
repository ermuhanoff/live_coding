import { Position } from "codemirror";
import { createContext, useContext, useState } from "react";

export const Context = {
  isNoticeAddWindowOpened: false,
  noticePos: {} as Position,
  lineRange: {
    from: 0,
    to: 0,
  },
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
