import React from "react";
import { Button, Table, Checkbox } from "antd";
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
      loading: false,
      forceChacked: false
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
      const cmdStr =
        "docker image rm " +
        (this.state.forceChacked ? " -f " : " ") +
        this.state.images[row].imageIds;
      return execSync(cmdStr);
    });
    this.updateImages();
  };

  onCheckBoxClick = e => {
    this.setState({ forceChacked: !this.state.forceChacked });
    console.log(`checked = ${e.target.checked}`);
    console.log(this.state.forceChacked);
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
        <Checkbox
          onChange={this.onCheckBoxClick}
          style={{ marginLeft: "10px" }}
        >
          Force Delete
        </Checkbox>
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
