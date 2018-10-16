import React from "react";
import { Button, Form, Input, InputNumber, Row, Col } from "antd";
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
      name: e.target.name.value ? " --name " + e.target.name.value + " " : "",
      imageName: this.props.selectedImage
        ? this.props.selectedImage.repoIds
        : e.target.imageName.value
    };
    console.log(e.target.port.value);
    console.log(e.target.forwardPort.value);
    console.log(e.target.name.value);
    console.log(e.target.imageName);
    console.log(runConf);
    this.props.runConf(runConf);
  };

  onInputChange = value => {
    console.log("changed", value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return this.props.showComponent ? (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h2 style={{ marginTop: "10px" }}>Run Configuration</h2>
          <FormItem>
            {getFieldDecorator("imageName", {
              rules: [{ type: "string", message: "Please input image name" }]
            })(
              <Row>
                <Col span={2}>
                  <label name="Image">Image :</label>
                </Col>
                <Col span={10}>
                  <Input
                    name="imageName"
                    placeholder="Image Name"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            )}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={2}>
                <label>Port :</label>
              </Col>
              <Col span={10}>
                {getFieldDecorator("port", {
                  rules: [
                    { type: "number", message: "Please input only number" }
                  ]
                })(
                  <InputNumber
                    name="port"
                    placeholder="Port"
                    style={{ width: "100%" }}
                  />
                )}
                {getFieldDecorator("forwardPort", {
                  rules: [
                    { type: "number", message: "Please input only number" }
                  ]
                })(
                  <InputNumber
                    name="forwardPort"
                    placeholder="Forward Port"
                    style={{ width: "100%" }}
                  />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator("name", {
              rules: [{ type: "string", message: "Please input name" }]
            })(
              <Row>
                <Col span={2}>
                  <label>Alias:</label>
                </Col>
                <Col span={10}>
                  <Input
                    name="name"
                    placeholder="Docker Name"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            )}
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
