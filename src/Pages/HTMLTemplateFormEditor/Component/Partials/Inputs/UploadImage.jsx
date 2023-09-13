import { EyeOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import React from "react";

/**
 *
 *
 * @export
 * @param {{ defaultValue, name, _token, table, onChange = (uri) => {}, onUploadImage = (e, setLoading) => {}} props
 * @return {*}
 */
export default function UploadImage(props) {
  const { defaultValue, name, _token } = props;
  const [imageUrl, setImageUrl] = React.useState(defaultValue ?? null);
  const [loading, setLoading] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [elInputFile] = React.useState(
    (() => {
      let inputFile = document.createElement("input");
      inputFile.type = "file";
      inputFile.accept = "image/*";
      inputFile.name = name;

      return inputFile;
    })()
  );

  const handleClickUpload = () => {
    elInputFile.click();
    elInputFile.onchange = e => {
      props.onUploadImage(e, setImageUrl, setLoading);
    };
  };

  React.useEffect(() => {
    props.onChange(imageUrl);
  }, [imageUrl]);

  return (
    <React.Fragment>
      <Modal
        title="File Gambar"
        open={showImage}
        cancelText="Oke"
        okButtonProps={{ hidden: true }}
        onCancel={() => setShowImage(false)}
      >
        <img style={{ width: "100%" }} src={imageUrl} />
      </Modal>
      <Row gutter={10}>
        <Col>
          <Button
            onClick={handleClickUpload}
            type="dashed"
            loading={loading}
            icon={<PlusOutlined />}
          >
            Upload Gambar
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={loading ? <LoadingOutlined /> : <EyeOutlined />}
            onClick={() => setShowImage(true)}
          ></Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}
