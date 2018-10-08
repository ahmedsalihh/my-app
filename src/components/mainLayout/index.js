import LeftSider from "./LeftSider";
import PageContent from "./PageContent";
import React from "react";
import { HashRouter } from "react-router-dom";

import { Layout } from "antd";

export default class MainLayout extends React.Component {
  render() {
    return (
      <HashRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <LeftSider />
          <PageContent />
        </Layout>
      </HashRouter>
    );
  }
}
