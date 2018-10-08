import React from "react";
import { Button, Table } from "antd";
import RunComponentForm from "../RunComponent";

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
        dataIndex: "repository"
      },
      {
        title: "Tag",
        dataIndex: "tag"
      },
      {
        title: "Create Time",
        dataIndex: "create"
      },
      {
        title: "Size",
        dataIndex: "size"
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
