import React from "react";
import { Layout } from "antd";
import Containers from "../containers/Containers";
import { Switch, Route } from "react-router-dom";
import Images from "../dockerImages/Images";

const { Header, Content, Footer } = Layout;

class PageContent extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "10px 16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Switch>
              <Route exact path="/" component={Containers} />
              <Route exact path="/images" component={Images} />
            </Switch>
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
