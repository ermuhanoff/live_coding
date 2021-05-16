import React from "react";
import { List } from "antd";
import ClosedNotice from "../ClosedNotice/ClosedNotice";
import Style from "./ClosedNotificationPanel.module.css";

const data = [
  <ClosedNotice />,
  <ClosedNotice />,
  <ClosedNotice />,
  <ClosedNotice />,
  <ClosedNotice />,
];

const ClosedNotificationPanel = () => {
  return (
    <div className={Style.Notice}>
      <List
        dataSource={data}
        renderItem={(item) => (
          <div className={Style.Notice_Wrapper}>{item}</div>
        )}
        size="small"
      />
    </div>
  );
};

export default ClosedNotificationPanel;
