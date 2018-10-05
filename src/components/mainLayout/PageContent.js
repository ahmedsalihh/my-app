import React from "react";
import { Layout } from "antd";
import Containers from "./Containers";

const { Header, Content, Footer } = Layout;

class PageContent extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "10px 16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Containers />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default PageContent;
