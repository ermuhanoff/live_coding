import {
  AudioMutedOutlined,
  AudioOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Badge, Button, List, Space, Switch, Typography } from "antd";
import React, { useState } from "react";
import AppStyle from "../App/App.module.css";

const { Paragraph, Text } = Typography;

interface User {
  name: string;
  muted: boolean;
}

const host = "http://livecoding/";
const projectType = "WEB";

const Settings = () => {
  const [projectName, setProjectName] = useState<string>("Project 1");
  const [link, setLink] = useState<string>("nf62hd8xbsgj");
  const [isWhiteList, setIsWhiteList] = useState<boolean>(false);
  const [viewersArr, setViewersArr] = useState<User[]>([
    { name: "Oleg", muted: false },
    { name: "Dima", muted: false },
    { name: "Daniil", muted: false },
    { name: "Dasha", muted: false },
    { name: "Sasha", muted: false },
    { name: "Valera", muted: false },
  ]);
  const [whiteListArr, setWhiteListArr] = useState<string[]>([
    "Oleg",
    "Dima",
    "Daniil",
    "Dasha",
    "Sasha",
    "Valera",
  ]);

  return (
    <div
      className={AppStyle.Dark}
      style={{ width: "100%", height: "100%", overflow: "overlay" }}
    >
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", paddingTop: 20 }}
        size="large"
      >
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <Text style={{ fontSize: 20 }}>Project name</Text>
          <Paragraph editable={{ onChange: setProjectName }}>
            {projectName}
          </Paragraph>
        </Space>
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <Text style={{ fontSize: 20 }}>Project type</Text>
          <Text code style={{ fontSize: 17 }}>
            {projectType}
          </Text>
        </Space>
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <div style={{display: "flex", alignItems: 'center', justifyContent: "space-between"}}>
            <Text style={{ fontSize: 20 }}>Link</Text>
            <Text keyboard type="danger">Online</Text>
          </div>
          <Paragraph>
            <Text style={{ fontSize: 13 }}>{host}</Text>
            <Paragraph
              strong
              copyable={{ text: host + link }}
              style={{
                border: "1px solid #fff",
                borderRadius: 5,
                width: "max-content",
                padding: "1px 10px",
                fontSize: 18,
                marginTop: 6,
              }}
            >
              {link}
            </Paragraph>
          </Paragraph>
        </Space>
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <Badge
            count={viewersArr.length}
            size="small"
            offset={[5, 5]}
            style={{ backgroundColor: "#52C41A" }}
          >
            <Text style={{ fontSize: 20 }}>Viewers</Text>
          </Badge>

          <List
            dataSource={viewersArr}
            renderItem={(item) => (
              <List.Item>
                <Text>{item.name}</Text>
                <Button
                  onClick={(e) =>
                    setViewersArr(
                      viewersArr.map((item1) => {
                        if (item1.name === item.name)
                          item1.muted = !item1.muted;

                        return item1;
                      })
                    )
                  }
                  danger={item.muted}
                >
                  {item.muted ? (
                    <>
                      Unmute <AudioMutedOutlined style={{ marginLeft: 10 }} />
                    </>
                  ) : (
                    <>
                      Mute
                      <AudioOutlined style={{ marginLeft: 10 }} />
                    </>
                  )}
                </Button>
              </List.Item>
            )}
            bordered
            size="small"
            style={{ height: 150, overflow: "overlay" }}
          />
        </Space>
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, marginRight: 20 }}>White list</Text>{" "}
            <Switch onChange={() => setIsWhiteList(!isWhiteList)} />
          </div>
          {isWhiteList && (
            <>
              <List
                dataSource={whiteListArr}
                renderItem={(item) => (
                  <List.Item>
                    <Text>{item}</Text>
                    <Button
                      onClick={(e) =>
                        setWhiteListArr(
                          whiteListArr.filter((item_in) => item !== item_in)
                        )
                      }
                      danger={true}
                    >
                      <CloseOutlined />
                    </Button>
                  </List.Item>
                )}
                bordered
                size="small"
                style={{ height: 150, overflow: "overlay" }}
              />
              <Button style={{ width: "100%", marginBottom: 20 }}>
                Add to list
              </Button>
            </>
          )}
        </Space>
      </Space>
    </div>
  );
};

export default Settings;
