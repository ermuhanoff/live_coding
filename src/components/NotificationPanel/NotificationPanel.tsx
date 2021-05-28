import React, { ReactNode, useEffect, useState } from "react";
import { List } from "antd";
import Notice from "../Notice/Notice";
import Style from "./NotificationPanel.module.css";
import AppStyle from "../App/App.module.css";
import { NoticeItem } from "../ToolPanel/ToolPanel";
import { Emitter } from "../App/App";
interface Props {
  setNoticeCount: (count: number) => void;
  setClosedNoticeArr: (prop: any) => void;
  setNoticeArr: (prop: any) => void;
  openNotice: (prop: number) => void;
  data: NoticeItem[];
  sourceNotices: NoticeItem[];
  sourceClosedNotices: NoticeItem[];
  setSourceNotices: (prop: any) => any;
}

const NotificationPanel = ({
  setNoticeCount,
  setClosedNoticeArr,
  setNoticeArr,
  openNotice,
  sourceNotices,
  sourceClosedNotices,
  setSourceNotices,
  data,
}: Props) => {
  const closeNotice = (id: number): void => {
    let notice: NoticeItem = sourceNotices.filter((item) => item.id === id)[0];

    let newSourceNotices = setSourceNotices(sourceNotices.filter((item) => item.id !== notice?.id))
    sourceClosedNotices.unshift(notice);

    setNoticeArr(newSourceNotices);
    setNoticeCount(newSourceNotices.length);
    setClosedNoticeArr(sourceClosedNotices);

    Emitter.emit("close_notice", notice);
  };

  return (
    <div className={`${Style.Notice} ${AppStyle.Dark}`}>
      <List
        dataSource={data.reverse()}
        renderItem={(item) => {
          return (
            <div className={Style.Notice_Wrapper}>
              <Notice
                data={item}
                closeNotice={closeNotice}
                openNotice={openNotice}
              />
            </div>
          );
        }}
        size="small"
      />
    </div>
  );
};

export default NotificationPanel;
