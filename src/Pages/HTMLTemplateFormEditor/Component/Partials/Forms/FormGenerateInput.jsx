import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";

export default function FormGenerateInput({
  onSubmit = (value, formResetInput) => {},
  initialValues = { type: "text", name: "", label: "", value: "" },
  saveText = "Add",
}) {
  const [form] = Form.useForm();
  
  const formResetInput = () => {
    form.setFieldsValue(initialValues);
  };

  return (
    <Form
      form={form}
      onFinish={value => {
        if (onSubmit) {
          onSubmit(value, formResetInput);
        }
      }}
      initialValues={initialValues}
      layout="vertical"
    >
      <Form.Item required name="type" label="Type">
        <Select
          value={form.getFieldValue("type")}
          options={[
            { label: "TEXT", value: "text" },
            { label: "IMAGE", value: "image" },
            { label: "COLOR", value: "color" },
          ]}
        />
      </Form.Item>

      <Form.Item required name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        required
        name="label"
        label="Label"
        rules={[{ required: true }]}
      >
        <Input placeholder="Label" />
      </Form.Item>
      <Form.Item
        required
        name="value"
        label="Value"
        rules={[{ required: true }]}
      >
        <Input placeholder="Value" />
      </Form.Item>

      <Row justify="end">
        <Col>
          <Button type="dashed" htmlType="submit" icon={<PlusCircleOutlined />}>
            {saveText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
