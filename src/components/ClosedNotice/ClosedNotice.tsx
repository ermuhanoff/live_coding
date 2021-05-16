import React, { useState } from "react";
import { Card, Avatar, Button, Typography } from "antd";
import Style from "./ClosedNotice.module.css";
import {
  UserOutlined,
  CodeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const description: string =
  "I don`t know what is it, in 6 row... Help me booy!";
const question: string = "What is it? asdasdasd";

const ClosedNotice = () => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleMeta = () => {
    setIsOpened(!isOpened);
  };

  return (
    <Card
      type="inner"
      size="small"
      title={
        <Text ellipsis className={Style.ClosedNotice_Text}>
          {question}
        </Text>
      }
      extra={
        isOpened ? (
          <Button size="small" onClick={toggleMeta}>
            Close
          </Button>
        ) : (
          <Button size="small" onClick={toggleMeta}>
            Open
          </Button>
        )
      }
      actions={isOpened ? [<CodeOutlined key="code" />] : []}
    >
      {isOpened ? (
        <Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          description={description}
        />
      ) : (
        <Paragraph ellipsis className={Style.ClosedNotice_Text}>
          {description}
        </Paragraph>
      )}
    </Card>
  );
};

export default ClosedNotice;
