import LeftSider from "./LeftSider";
import PageContent from "./PageContent";
import React from "react";

import { Layout} from "antd";

export default class MainLayout extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <LeftSider />
        <PageContent />
      </Layout>
    );
  }
}
