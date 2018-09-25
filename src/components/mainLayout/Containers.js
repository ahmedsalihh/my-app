import React from "react";
import { Table } from "antd";
import { parseResult } from "../utils";

export default class Containers extends React.Component {
  renderContainers = parseResult();
  render() {
    const columns = [
      {
        title: "names",
        dataIndex: "name"
      },
      {
        title: "images",
        dataIndex: "image"
      },
      {
        title: "commands",
        dataIndex: "command"
      },
      {
        title: "createTimes",
        dataIndex: "createTime"
      },
      {
        title: "status",
        dataIndex: "status"
      },
      {
        title: "ports",
        dataIndex: "port"
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.renderContainers}
        bordered={false}
        pagination={false}
      />
    );
  }
}
