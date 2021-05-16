import React, { ReactNode, useState } from "react";
import { List } from "antd";
import Notice from "../Notice/Notice";
import Style from "./NotificationPanel.module.css";
import { NoticeItem } from "../ToolPanel/ToolPanel";
interface Props {
  setNoticeCount: (count: number) => void;
  setClosedNoticeArr: (prop: any) => void;
  setNoticeArr: (prop: any) => void;
  openNotice: (prop: number) => void;
  data: NoticeItem[];
}

const NotificationPanel = ({
  setNoticeCount,
  setClosedNoticeArr,
  setNoticeArr,
  openNotice,
  data,
}: Props) => {
  const closeNotice = (id: number): void => {
    let item: NoticeItem | undefined = data.find((item) => item.id === id);

    setNoticeArr(data.filter((item) => item.id !== id));
    setNoticeCount(data.length - 1);
    setClosedNoticeArr((prev: any) => {
      return [...prev, item];
    });
  };

  return (
    <div className={Style.Notice}>
      <List
        dataSource={data}
        renderItem={(item) => {
          return (
            <div className={Style.Notice_Wrapper}>
              <Notice data={item} closeNotice={closeNotice} openNotice={openNotice} />
            </div>
          );
        }}
        size="small"
      />
    </div>
  );
};

export default NotificationPanel;
