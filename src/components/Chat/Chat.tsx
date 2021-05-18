import React, { useState, ReactNode, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import Style from "./Chat.module.css";
import { Input, Button } from "antd";
import Draggable from "react-draggable";
import { Message } from "../ToolPanel/ToolPanel";
import * as Scroll from "react-scroll";

const { TextArea } = Input;

interface Props {
  messages: Message[];
  setMessageArr: (value: Message[]) => void;
  setMessageCount: (value: number) => void;
}

const Chat = ({ messages, setMessageArr, setMessageCount }: Props) => {
  const [inputText, setInputText] = useState<string>("");

  const messgeToReactNode = (messages: Message[]) => {
    return messages.map((item) => (
      <ChatMessage content={item.content} title={item.title} />
    ));
  };

  useEffect(() => {
    Scroll.scroller.scrollTo("scrollPoint", {
      duration: 500,
      delay: 0,
      smooth: true,
      containerId: "scroll",
    });
  }, []);

  const onClick = (e: any) => {
    e.preventDefault();

    if (inputText !== "") {
      setMessageArr([...messages, { content: inputText, title: "Server" }]);
      setMessageCount(messages.length + 1);
      setInputText("");
      Scroll.scroller.scrollTo("scrollPoint", {
        duration: 500,
        delay: 0,
        smooth: true,
        containerId: "scroll",
      });
    }
  };

  return (
    <div className={Style.Chat}>
      <div className={Style.Messages} id="scroll">
        {messgeToReactNode(messages)}
        {<Scroll.Element name="scrollPoint" />}
      </div>
      <div className={Style.Input}>
        <TextArea
          showCount
          allowClear
          maxLength={100}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onPressEnter={onClick}
          autoSize={{ maxRows: 1, minRows: 1 }}
        />
        <Button type="primary" onClick={onClick} style={{ marginTop: 10 }}>
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Chat;
