import React from "react";
import { Table, Button } from "antd";
import { parseResult } from "./containerCommands";

const execSync = window.require("child_process").execSync;

export default class Containers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containers: [],
      selectedRowKeys: [],
      loading: false,
      formDisplay: false,
      runConf: ""
    };
  }
  updateContainers = () => {
    this.setState({ containers: parseResult(), selectedRowKeys: [] });
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleStop = () => {
    this.setState({ loading: true });
    console.log("before stop command " + this.state.loading);
    this.state.selectedRowKeys.map(row => {
      this.setState({ loading: false });
      console.log("after stop command " + this.state.loading);
      return execSync("docker container stop " + this.state.containers[row].id);
    });
    this.updateContainers();
  };

  handleStart = () => {
    this.setState({ loading: true });
    console.log("after start command " + this.state.loading);
    this.state.selectedRowKeys.map(row => {
      this.setState({ loading: false });
      console.log("after start command " + this.state.loading);
      return execSync(
        "docker container start " + this.state.containers[row].id
      );
    });
    this.updateContainers();
  };

  handleRestart = () => {
    this.setState({ loading: true });
    console.log("after restart command " + this.state.loading);
    this.state.selectedRowKeys.map(row => {
      this.setState({ loading: false });
      console.log("after restart command " + this.state.loading);
      return execSync(
        "docker container restart " + this.state.containers[row].id
      );
    });
    this.updateContainers();
  };

  handleDelete = () => {
    this.setState({ loading: true });
    console.log("after delete command " + this.state.loading);
    this.state.selectedRowKeys.map(row => {
      this.setState({ loading: false });
      console.log("after delete command " + this.state.loading);
      return execSync("docker container rm " + this.state.containers[row].id);
    });
    this.updateContainers();
  };

  componentDidMount() {
    this.updateContainers();
  }

  render() {
    const columns = [
      {
        title: "name",
        dataIndex: "name"
      },
      {
        title: "image",
        dataIndex: "image"
      },
      {
        title: "command",
        dataIndex: "command"
      },
      {
        title: "create time",
        dataIndex: "createTime"
      },
      {
        title: "status",
        dataIndex: "status"
      },
      {
        title: "port",
        dataIndex: "port"
      }
    ];

    const { selectedRowKeys, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <Button
          onClick={this.handleStart}
          loading={loading}
          disabled={!hasSelected}
        >
          Start
        </Button>
        <Button
          onClick={this.handleStop}
          loading={loading}
          disabled={!hasSelected}
        >
          Stop
        </Button>
        <Button
          onClick={this.handleRestart}
          loading={loading}
          disabled={!hasSelected}
        >
          Restart
        </Button>
        <Button
          onClick={this.handleDelete}
          loading={loading}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.containers}
          bordered={false}
          pagination={false}
        />
      </div>
    );
  }
}
