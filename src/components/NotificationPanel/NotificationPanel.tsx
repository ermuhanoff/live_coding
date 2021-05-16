import React from "react";
import { List } from "antd";
import Notice from "../Notice/Notice";
import Style from "./NotificationPanel.module.css";

const data = [<Notice />, <Notice />, <Notice />, <Notice />, <Notice />];

const NotificationPanel = () => {
  return (
    <div className={Style.Notice}>
      <List
        dataSource={data}
        renderItem={(item) => <div className={Style.Notice_Wrapper}>{item}</div>}
        size="small"

      />
    </div>
  );
};

export default NotificationPanel;
