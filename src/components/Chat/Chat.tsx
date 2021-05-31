import React, { useState, ReactNode, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import Style from "./Chat.module.css";
import AppStyle from "../App/App.module.css";
import { Input, Button } from "antd";
import Draggable from "react-draggable";
import { Message } from "../ToolPanel/ToolPanel";
import * as Scroll from "react-scroll";
import { Emitter } from "../App/App";
import { Context } from "../App/AppContext";

const { Search } = Input;

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

  const onClick = () => {

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
    <div className={`${Style.Chat} ${AppStyle.Dark}`}>
      <div className={`${Style.Messages} ${AppStyle.DarkSecond}`} id="scrollChat">
        {messageToReactNode(messages)}
        {<Scroll.Element name="scrollPointChat" />}
      </div>
      <div className={Style.Input}>
        <Search
          allowClear
          maxLength={100}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          enterButton="Send"
          onSearch={onClick}
        />
      </div>
    </div>
  );
};

export default Chat;
