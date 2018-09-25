import React from "react";
import { Table } from "antd";
import { parseResult } from "../utils";

export default class Containers extends React.Component {
  render() {
    const columns = [
      {
        title: "containerIds",
        dataIndex: "id"
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
      },
      {
        title: "names",
        dataIndex: "name"
      }
    ];
    const containers = parseResult();
    return (
      <Table
        columns={columns}
        dataSource={containers}
        bordered={false}
        pagination={false}
      />
    );
  }
}
