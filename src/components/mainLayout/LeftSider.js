import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default class LeftSider extends React.Component {
  state = {
    collapsed: true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>
              <Link to="/" style={{ color: "white" }}>
                Containers
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>
              <Link to="/images" style={{ color: "white" }}>
                Images
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
