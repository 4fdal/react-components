import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Input, Radio, Row, Select, Typography } from "antd";
import React from "react";

const sizeViewHTMLOptions = {
  mobile: {
    width: 414,
    height: 896,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1366,
    height: 768,
  },
};

/**
 *
 *
 * @export
 * @param {{ html = "", wrapTemplateOptions = [{id : number, name : string, upperbody : string, lowerbody : string }] }} props
 * @return {*}
 */
export default function HtmlRender({ html = "", wrapTemplateOptions = [] }) {
  const [selectWrapTemplate, setSelectWrapTemplate] = React.useState({
    upperbody: wrapTemplateOptions[0] ? wrapTemplateOptions[0].upperbody : "",
    lowerbody: wrapTemplateOptions[0] ? wrapTemplateOptions[0].lowerbody : "",
  });

  const [sizeViewHTML, setSizeViewHTML] = React.useState({
    width: sizeViewHTMLOptions.desktop.width,
    height: sizeViewHTMLOptions.desktop.height,
  });
  const [sizeType, setSizeType] = React.useState("desktop");

  const [wrapTemplateId, setWrapTemplateId] = React.useState(
    wrapTemplateOptions[0] ? wrapTemplateOptions[0].id : null
  );

  const handleChangeWrapTemplate = wrapTemplateId => {
    let wrapTemplate = wrapTemplateOptions.find(
      wrapTemplate => wrapTemplate.id == wrapTemplateId
    );

    if (wrapTemplate) {
      setSelectWrapTemplate({
        upperbody: wrapTemplate.upperbody,
        lowerbody: wrapTemplate.lowerbody,
      });
    }

    setWrapTemplateId(wrapTemplateId);
  };

  const getTextHTML = () => {
    let newHTML = html;

    newHTML = `${selectWrapTemplate.upperbody} ${newHTML} ${selectWrapTemplate.lowerbody}`;

    return newHTML;
  };

  return (
    <Card
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text strong>HTML VIEW</Typography.Text>
          </Col>
          <Col style={{ marginBlock: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Radio.Group
                value={sizeType}
                onChange={e => {
                  const sizeType = e.target.value;
                  setSizeType(sizeType);
                  setSizeViewHTML(sizeViewHTMLOptions[sizeType]);
                }}
              >
                <Radio.Button value="mobile">
                  <MobileOutlined />
                </Radio.Button>
                <Radio.Button value="tablet">
                  <TabletOutlined />
                </Radio.Button>
                <Radio.Button value="desktop">
                  <DesktopOutlined />
                </Radio.Button>
              </Radio.Group>
              <div
                style={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  style={{ width: 55, textAlign: "center" }}
                  value={sizeViewHTML.width}
                  onChange={({ target: { value: width } }) =>
                    setSizeViewHTML({ ...sizeViewHTML, width })
                  }
                />
                <strong style={{ marginInline: 10 }}>X</strong>
                <Input
                  style={{ width: 55, textAlign: "center" }}
                  value={sizeViewHTML.height}
                  onChange={({ target: { value: height } }) =>
                    setSizeViewHTML({ ...sizeViewHTML, height })
                  }
                />
              </div>
            </div>
          </Col>
          {wrapTemplateOptions[0] && (
            <Col>
              <Select
                style={{ width: 150 }}
                value={wrapTemplateId}
                onChange={handleChangeWrapTemplate}
                options={wrapTemplateOptions.map(wrapTemplate => ({
                  label: wrapTemplate.name,
                  value: wrapTemplate.id,
                }))}
              />
            </Col>
          )}
        </Row>
      }
      style={{ height: "100%" }}
    >
      <Row justify={"center"}>
        <div
          style={{
            border: "none",
            width: `${sizeViewHTML.width}px`,
            height: `${sizeViewHTML.height}px`,
            borderRadius: 10,
            paddingBottom: 20,
            background: "black",
          }}
        >
          <iframe
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              padding: 0,
              margin: 0,
            }}
            srcDoc={getTextHTML()}
          />
        </div>
      </Row>
    </Card>
  );
}
