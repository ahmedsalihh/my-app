import React from "react";
import { Table } from "antd";

export default class Containers extends React.Component {
  render() {
    const columns = [
      {
        title: "containerIds",
        dataIndex: "containerIds"
      },
      {
        title: "images",
        dataIndex: "images"
      },
      {
        title: "commands",
        dataIndex: "commands"
      },
      {
        title: "createTimes",
        dataIndex: "createTimes"
      },
      {
        title: "status",
        dataIndex: "status"
      },
      {
        title: "ports",
        dataIndex: "ports"
      },
      {
        title: "names",
        dataIndex: "names"
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.data}
        bordered={false}
        pagination={false}
      />
    );
  }
}
