import React from "react";
import { Card, Avatar } from "antd";
import {
  UserOutlined,
  CodeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { NoticeItem } from "../ToolPanel/ToolPanel";

const { Meta } = Card;

interface Props {
  data: NoticeItem;
  closeNotice: (id: number) => void;
  openNotice: (id: number) => void;
}

const Notice = ({ data, closeNotice, openNotice }: Props) => {
  const onCodeClick = () => {
    // Doc.setCursor(70, 11);
    openNotice(data.id);
  };
  const onCloseClick = () => {
    closeNotice(data.id);
  };
  return (
    <>
      <Card
        size="small"
        actions={[
          <CodeOutlined key="code" onClick={onCodeClick} />,
          <CloseCircleOutlined key="close" onClick={onCloseClick} />,
        ]}
      >
        <Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={data.title}
          description={data.desc}
        />
      </Card>
    </>
  );
};

export default Notice;
