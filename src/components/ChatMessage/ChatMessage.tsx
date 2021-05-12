import React from "react";
import { Comment, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Style from "./ChatMessage.module.css";

interface Props {
  title: string;
  content: string;
}

const ChatMessage = ({ title, content }: Props) => {
  return (
    <div className={Style.ChatMessage}>
      <Comment
        author={title}
        avatar={<Avatar icon={<UserOutlined />} />}
        content={<p>{content}</p>}
        datetime={new Date().toLocaleString()}
      />
    </div>
  );
};

export default ChatMessage;
