import {
  Button,
  Card,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import UploadImage from "./Inputs/UploadImage";
import { EditOutlined } from "@ant-design/icons";
import FormGenerateInput from "./Forms/FormGenerateInput";

export function ModalEditGenerateInput({
  generateInput = {},
  onChange = generateInput => {},
}) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <React.Fragment>
      <Modal
        open={showModal}
        title={`Edit generate input '${generateInput.name}'`}
        onCancel={() => setShowModal(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <FormGenerateInput
          saveText="Save"
          onSubmit={async newGenerateInput => {
            await onChange(newGenerateInput);
            setShowModal(false);
          }}
          initialValues={generateInput}
        />
      </Modal>
      <Tooltip title={`Change input type '${generateInput.label}'`}>
        <Button
          type="link"
          onClick={() => setShowModal(true)}
          icon={<EditOutlined />}
        />
      </Tooltip>
    </React.Fragment>
  );
}

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
      <React.Fragment>
        <Form.Item
          style={{ marginTop: 5, padding: 0 }}
          name={generateInput.name}
          label={generateInput.label}
        >
          <Row>
            <Col md={23}>{renderInput}</Col>
            <Col md={1}>
              <ModalEditGenerateInput
                key={Math.random()}
                onChange={onChange}
                generateInput={generateInput}
              />
            </Col>
          </Row>
        </Form.Item>
      </React.Fragment>
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
                // key={`${Math.random()}_${index}`}
                // key={JSON.stringify(generateInput)}
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
