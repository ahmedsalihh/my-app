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
      runConf: ""
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

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
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
