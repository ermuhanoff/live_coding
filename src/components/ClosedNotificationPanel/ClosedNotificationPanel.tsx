import React, { useState } from "react";
import { List } from "antd";
import ClosedNotice from "../ClosedNotice/ClosedNotice";
import Style from "./ClosedNotificationPanel.module.css";
import { NoticeItem } from "../ToolPanel/ToolPanel";

interface Props {
  data: NoticeItem[];
  openNotice: (prop: number) => void;
}

const ClosedNotificationPanel = ({ data, openNotice }: Props) => {
  return (
    <div className={Style.Notice}>
      <List
        dataSource={data.reverse()}
        renderItem={(item) => (
          <div className={Style.Notice_Wrapper}>
            <ClosedNotice data={item} openNotice={openNotice}/>
          </div>
        )}
        size="small"
      />
    </div>
  );
};

export default ClosedNotificationPanel;
