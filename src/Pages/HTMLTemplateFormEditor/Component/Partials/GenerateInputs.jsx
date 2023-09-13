import {
  Card,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import React from "react";
import UploadImage from "./Inputs/UploadImage";

export function ItemGenerateInput({
  onUploadImage = (e, setImageUrl, setLoading) => {},
  onChange = value => {},
  generateInput = {},
}) {
  const handleChangeValueInput = value => {
    let newChangegenerateInput = generateInput;
    newChangegenerateInput.value = value;
    onChange(newChangegenerateInput);
  };
  let renderInput = null;
  switch (generateInput.type) {
    case "text":
      renderInput = (
        <Input
          onChange={({ target: { value } }) => handleChangeValueInput(value)}
          placeholder={generateInput.label}
          defaultValue={generateInput.value}
        />
      );
      break;
    case "color":
      renderInput = (
        <ColorPicker
          onChange={(_, value) => {
            handleChangeValueInput(value);
          }}
          defaultValue={generateInput.value}
        />
      );
      break;
    case "image":
      renderInput = (
        <UploadImage
          onChange={value => {
            handleChangeValueInput(value);
          }}
          onUploadImage={onUploadImage}
          defaultValue={generateInput.value}
        />
      );
      break;
    default:
      break;
  }
  if (generateInput && renderInput)
    return (
      <Form.Item name={generateInput.name} label={generateInput.label}>
        {renderInput}
      </Form.Item>
    );
}

export default function GenerateInputs({
  generateInputs = [],
  onChange = generateInputs => {},
  onUploadImage = (e, setImageUrl, setLoading) => {},
}) {
  const [form] = Form.useForm();
  const [stateGenerateInputs, setStateGenerateInputs] =
    React.useState(generateInputs);

  React.useEffect(() => {
    setStateGenerateInputs(generateInputs);
  }, [generateInputs]);

  const handleChangeGenerateInput = (valueGenerateInput, index) => {
    let newStateGenerateInputs = stateGenerateInputs;
    newStateGenerateInputs[index] = valueGenerateInput;
    setStateGenerateInputs([...newStateGenerateInputs]);
    onChange(stateGenerateInputs);
  };

  return (
    <Card
      style={{ marginTop: 10 }}
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text strong> Generate Inputs </Typography.Text>
          </Col>
          <Col></Col>
        </Row>
      }
    >
      <Row>
        <Col md={24}>
          <Form form={form} layout="vertical">
            {stateGenerateInputs.map((generateInput, index) => (
              <ItemGenerateInput
                generateInput={generateInput}
                key={index}
                onChange={valueGenerateInput => {
                  handleChangeGenerateInput(valueGenerateInput, index);
                }}
                onUploadImage={onUploadImage}
              />
            ))}
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
