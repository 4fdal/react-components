import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/html";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export function FormAddGenerateInput(props) {
  const [form] = Form.useForm();

  const formResetInput = () => {
    form.setFieldsValue({ type: "text", name: "", label: "", value: "" });
  };

  return (
    <Form
      form={form}
      onFinish={value => {
        if (props.onSubmit) {
          props.onSubmit(value, formResetInput);
        }
      }}
      initialValues={{ type: "text", name: "", label: "", value: "" }}
      layout="vertical"
    >
      <Form.Item required name="type" label="Type">
        <Select
          defaultValue={form.getFieldValue("type")}
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
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default function CodeEditor({ value = "", onChange = value => {} }) {
  const [newValue, setNewValue] = React.useState(value);
  const [cursor, setCursor] = React.useState(null);
  const [showModalAddInput, setShowModalAddInput] = React.useState(false);

  const appendTextInCursor = newText => {
    const { $autoNewLine, $lines } = cursor.document;
    const { row, column } = cursor;

    let lineCode = $lines[row];
    let strBeforeColumn = lineCode.substring(0, column);
    let strAfterColumn = lineCode.substring(column, lineCode.length);

    $lines[row] = `${strBeforeColumn}${newText}${strAfterColumn}`;

    setNewValue($lines.join($autoNewLine));
  };

  React.useEffect(() => {
    onChange(newValue);
  }, [newValue]);

  React.useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleLoadAceEditor = editor => {
    editor.completers.push({
      getCompletions: function (editor, session, pos, prefix, callback) {
        var completions = [];
        // we can use session and pos here to decide what we are going to show
        [
          {
            value: `{{"type" : "text", "name" : "text_:name", "label" : "Text", "value" : ":name"}}`,
            caption: "genintext",
            meta: "generate input text",
          },
          {
            value: `{{"type" : "image", "name" : "image_:name", "label" : "Image", "value" : ""}}`,
            caption: "geninimage",
            meta: "generate input image",
          },
          {
            value: `{{"type" : "color", "name" : "color_:name", "label" : "Color", "value" : "#fffff"}}`,
            caption: "genincolor",
            meta: "generate input color",
          },
        ].forEach(function (w) {
          completions.push({
            value: w.value.replaceAll(":name", new Date().getTime()),
            meta: w.meta,
            caption: w.caption, // use custom caption
          });
        });
        callback(null, completions);
      },
    });
  };

  const handleCursorChange = ({ cursor }) => {
    setCursor(cursor);
  };

  return (
    <Card
      title={
        <Row gutter={10} justify="space-between" align="middle">
          <Col>
            <Typography.Text strong>CODE VIEW</Typography.Text>
          </Col>
          <Col>
            <Row gutter={10}>
              <Col>
                <Tooltip title="Add generate input from current cursor">
                  <Button
                    onClick={() => setShowModalAddInput(true)}
                    icon={<PlusCircleOutlined />}
                  >
                    Add Input
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      }
    >
      <Modal
        title="Add generate input from current cursor"
        open={showModalAddInput}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => setShowModalAddInput(false)}
      >
        <FormAddGenerateInput
          onSubmit={(value, formResetInput) => {
            appendTextInCursor(`{${JSON.stringify(value)}}`);
            setShowModalAddInput(false);
            formResetInput();
          }}
        />
      </Modal>
      <AceEditor
        onLoad={handleLoadAceEditor}
        mode="html"
        value={value}
        theme="monokai"
        width="100%"
        height="400px"
        onChange={onChange}
        onPaste={onChange}
        wrapEnabled={true}
        onCursorChange={handleCursorChange}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </Card>
  );
}
