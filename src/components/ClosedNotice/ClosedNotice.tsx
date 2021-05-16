import React, { useState } from "react";
import { Card, Avatar, Button, Typography } from "antd";
import Style from "./ClosedNotice.module.css";
import { UserOutlined, CodeOutlined } from "@ant-design/icons";
import { NoticeItem } from "../ToolPanel/ToolPanel";

interface Props {
  data: NoticeItem;
  openNotice: (prop: number) => void;
}

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ClosedNotice = ({ data, openNotice }: Props) => {
  const [isExpand, setIsExpand] = useState(false);

  const toggleMeta = () => {
    setIsExpand(!isExpand);
  };

  const onCodeClick = () => {
    openNotice(data.id);
  };

  return (
    <>
      <Card
        type="inner"
        size="small"
        title={
          <Text ellipsis className={Style.ClosedNotice_Text}>
            {data.title}
          </Text>
        }
        extra={
          isExpand ? (
            <Button size="small" onClick={toggleMeta}>
              Close
            </Button>
          ) : (
            <Button size="small" onClick={toggleMeta}>
              Open
            </Button>
          )
        }
        actions={
          isExpand ? [<CodeOutlined key="code" onClick={onCodeClick} />] : []
        }
      >
        {isExpand ? (
          <Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            description={data.desc}
          />
        ) : (
          <Paragraph ellipsis className={Style.ClosedNotice_Text}>
            {data.desc}
          </Paragraph>
        )}
      </Card>
    </>
  );
};

export default ClosedNotice;
