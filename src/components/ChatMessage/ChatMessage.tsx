import React from "react";
import { Comment, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Style from "./ChatMessage.module.css";
import AppStyle from "../App/App.module.css";

interface Props {
  title: string;
  content: string;
  date: string
}

const ChatMessage = ({ title, content, date }: Props) => {
  return (
    <div className={`${Style.ChatMessage} ${AppStyle.Dark}`}>
      <Comment
        author={title}
        avatar={<Avatar icon={<UserOutlined />} />}
        content={<p>{content}</p>}
        datetime={<div className={Style.ChatMessage_Date}>{date}</div>}
      />
    </div>
  );
};

export default ChatMessage;
