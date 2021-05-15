import React, { useState, ReactNode, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import Style from "./Chat.module.css";
import { Input, Button } from "antd";
import Draggable from "react-draggable";
const { TextArea } = Input;

const messages = [
  <ChatMessage content={"content aaaaaaaaaaaa"} title={"Voloday"} />,
  <ChatMessage content={"content aaaaaaaaaaaa"} title={"Voloday"} />,
  <ChatMessage content={"content aaaa aaaaaaaa"} title={"Voloday"} />,
];

const Chat = () => {
  const [messagesList, setMessagesList] = useState<ReactNode[]>(messages);
  const [inputText, setInputText] = useState<string>("");

  const onClick = (e: any) => {
    e.preventDefault();

    if (inputText !== "") {
      setMessagesList((prevState) => {
        const newState = [...prevState];
        newState.push(<ChatMessage content={inputText} title={"Voloday"} />);

        return newState;
      });
      setInputText("");
    }
  };

  return (
    <div className={Style.Chat}>
      <div className={Style.Messages}>{messagesList}</div>
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
      {/* <div>
        <Draggable
        //   axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[25, 25]}
          scale={1}
        //   onStart={this.handleStart}
        //   onDrag={this.handleDrag}
        //   onStop={this.handleStop}
        >
          <div>
            <div className="handle">Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div>
        </Draggable>
      </div> */}
    </div>
  );
};

export default Chat;
