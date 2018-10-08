import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import "../App.css";

const FormItem = Form.Item;

class RunComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formDisplay: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const runConf = {
      portValue: e.target.port.value
        ? " -p " +
          (e.target.forwardPort.value
            ? e.target.port.value + ":" + e.target.forwardPort.value + " "
            : e.target.port.value)
        : "",
      name: e.target.name.value ? " --name " + e.target.name.value + " " : ""
    };
    console.log(e.target.port.value);
    console.log(e.target.forwardPort.value);
    console.log(e.target.name.value);
    console.log(runConf);
    this.props.runConf(runConf);
  };

  onInputChange = value => {
    console.log("changed", value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 1 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    return this.props.showComponent ? (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h2 style={{ marginTop: "10px" }}>Run Configuration</h2>
          <FormItem label="Port" {...formItemLayout}>
            {getFieldDecorator("port", {
              rules: [{ type: "number", message: "Please input only number" }]
            })(
              <InputNumber
                name="port"
                placeholder="Port"
                style={{ width: "50%" }}
              />
            )}
            {getFieldDecorator("forwardPort", {
              rules: [{ type: "number", message: "Please input only number" }]
            })(
              <InputNumber
                name="forwardPort"
                placeholder="Forward Port"
                style={{ width: "50%" }}
              />
            )}
          </FormItem>
          <FormItem label="Name" {...formItemLayout}>
            {getFieldDecorator("name", {
              rules: [{ type: "string", message: "Please input name" }]
            })(<Input />)}
          </FormItem>
          <FormItem>
            <Button htmlType="submit">Execute</Button>
          </FormItem>
        </Form>
      </div>
    ) : (
      ""
    );
  }
}

const RunComponentForm = Form.create()(RunComponent);

export default RunComponentForm;
