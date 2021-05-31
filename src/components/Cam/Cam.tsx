import React, { useState } from "react";
import { Button, Space, Select, Typography, notification } from "antd";
import {
  CameraOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import AppStyle from "../App/App.module.css";

const { Option } = Select;
const { Text } = Typography;

const Cam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className={AppStyle.Dark}>
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", paddingTop: 20 }}
        size="large"
      >
        <div
          style={{
            width: 200,
            height: 200,
            backgroundColor: "rgb(30,30,30)",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <LoadingOutlined style={{ fontSize: 100 }} />
          ) : (
            <CameraOutlined style={{ fontSize: 100 }} />
          )}
        </div>
        <Button
          onClick={(e) => {
            setIsLoading(true);

            setTimeout(() => {
              notification.error({
                message: <Text type="danger">Camera error</Text>,
                description:
                  "Some unextendable internal error. Try to reload page!",
                placement: "bottomLeft",
              });
              setIsLoading(false);
            }, Math.random() * 5 * 1000);
          }}
          disabled={isLoading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Start WebCam{" "}
          {isLoading ? (
            <SyncOutlined
              spin
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            ""
          )}
        </Button>
        <Space direction="vertical" size="small" style={{ width: 200 }}>
          <Text>Cam settings:</Text>
          <Select defaultValue="cam1" style={{ width: "100%" }}>
            <Option value="cam1">Lenovo EasyCamera</Option>
            <Option value="cam2">Integrated Web camera</Option>
          </Select>
        </Space>
      </Space>
    </div>
  );
};

export default Cam;
