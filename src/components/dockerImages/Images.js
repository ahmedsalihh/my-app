import React from "react";
import { Button, Table } from "antd";
import RunComponentForm from "../RunComponent";
import { parseImageResult } from "./imageCommands";

const execSync = window.require("child_process").execSync;

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      selectedRowKeys: [],
      formDisplay: false,
      runConf: "",
      loading: false
    };
  }

  componentDidMount() {
    this.updateImages();
  }

  updateImages = () => {
    this.setState({ images: parseImageResult(), selectedRowKeys: [] });
  };

  handleRunClick = () => {
    this.setState({ formDisplay: !this.state.formDisplay });
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleRunConf = runConf => {
    const confStr = (runConf.portValue + runConf.name).replace("  ", " ");
    this.setState({ runConf: confStr });
    try {
      execSync("docker run -dt" + confStr + " ubuntu ");
    } catch (err) {
      console.log(err);
    }
    console.log(confStr);
    this.updateContainers();
  };

  handleDelete = () => {
    this.setState({ loading: true });
    console.log("after delete command " + this.state.loading);
    this.state.selectedRowKeys.map(row => {
      this.setState({ loading: false });
      console.log("after delete command " + this.state.loading);
      return execSync("docker image rm " + this.state.images[row].imageIds);
    });
    this.updateImages();
  };

  render() {
    const columns = [
      {
        title: "Repository",
        dataIndex: "repoIds"
      },
      {
        title: "Tag",
        dataIndex: "tags"
      },
      {
        title: "Create Time",
        dataIndex: "createTimes"
      },
      {
        title: "Size",
        dataIndex: "sizes"
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
          onClick={this.handleDelete}
          loading={loading}
          disabled={!hasSelected}
        >
          Delete
        </Button>
        <Button onClick={this.handleRunClick}>Run</Button>
        <RunComponentForm
          showComponent={this.state.formDisplay}
          runConf={this.handleRunConf}
        />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.images}
          bordered={false}
          pagination={false}
        />
      </div>
    );
  }
}

export default Images;
