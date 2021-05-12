import React from "react";
import { Layout } from "antd";
import WorkSpace from "../WorkSpace/WorkSpace";
const { Content } = Layout;

const LayoutComponent = () => {
  return (
    <Layout style={{height: "100%"}}>
      <Content>
        <WorkSpace />
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
