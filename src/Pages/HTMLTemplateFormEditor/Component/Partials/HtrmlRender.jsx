import { Card, Col, Row, Select, Typography } from "antd";
import React from "react";

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
          <Col>
            {wrapTemplateOptions[0] && (
              <Select
                style={{ width: 150 }}
                value={wrapTemplateId}
                onChange={handleChangeWrapTemplate}
                options={wrapTemplateOptions.map(wrapTemplate => ({
                  label: wrapTemplate.name,
                  value: wrapTemplate.id,
                }))}
              />
            )}
          </Col>
        </Row>
      }
      style={{ height: "100%" }}
    >
      <iframe
        width="100%"
        style={{ border: "none", height: "720px" }}
        srcDoc={getTextHTML()}
      />
    </Card>
  );
}
