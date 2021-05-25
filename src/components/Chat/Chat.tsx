import React, { useState, ReactNode, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import Style from "./Chat.module.css";
import { Input, Button } from "antd";
import Draggable from "react-draggable";
import { Message } from "../ToolPanel/ToolPanel";
import * as Scroll from "react-scroll";
import { Emitter } from "../App/App";
import { Context } from "../App/AppContext";

const { TextArea } = Input;

interface Props {
  messages: Message[];
  sourceMessages: Message[];
  setMessageArr: (value: Message[]) => void;
  setMessageCount: (value: number) => void;
}

const Chat = ({
  messages,
  setMessageArr,
  setMessageCount,
  sourceMessages,
}: Props) => {
  const [inputText, setInputText] = useState<string>("");

  const messageToReactNode = (messages: Message[]) => {
    return messages.map((item, index) => (
      <ChatMessage
        content={item.content}
        title={item.title}
        date={item.date}
        key={index}
      />
    ));
  };

  useEffect(() => {
    Scroll.scroller.scrollTo("scrollPointChat", {
      duration: 0,
      delay: 0,
      smooth: true,
      containerId: "scrollChat",
    });

    Emitter.on("chat_message", (data) => {
      // sourceMessages.push(data);
      // setMessageArr(sourceMessages);
      Scroll.scroller.scrollTo("scrollPointChat", {
        duration: 0,
        delay: 0,
        smooth: true,
        containerId: "scrollChat",
      });
    });
  }, []);

  const onClick = (e: any) => {
    e.preventDefault();

    if (inputText !== "") {
      const message = {
        content: inputText,
        title: Context.username,
        date: new Date().toLocaleString(),
      };
      sourceMessages.push(message);
      setMessageArr(sourceMessages);
      Scroll.scroller.scrollTo("scrollPointChat", {
        duration: 500,
        delay: 0,
        smooth: true,
        containerId: "scrollChat",
      });
      Emitter.emit("new_chat_message", message);
      setInputText("");
    }
  };

  return (
    <div className={Style.Chat}>
      <div className={Style.Messages} id="scrollChat">
        {messageToReactNode(messages)}
        {<Scroll.Element name="scrollPointChat" />}
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
