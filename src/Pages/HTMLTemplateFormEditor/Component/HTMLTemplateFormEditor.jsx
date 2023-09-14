import { Button, Col, Form, Row, Typography } from "antd";
import React from "react";
import CodeEditor from "./Partials/Inputs/CodeEditor";
import { GenerateInputOption } from "./Utils/Helpers";
import GenerateInputs from "./Partials/GenerateInputs";
import HtmlRender from "./Partials/HtrmlRender";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

/**
 *
 *
 * @export
 * @param {{
 *  html : string,
 *  onChange : html => {},
 *  wrapTemplateOptions = [{id : number, name : string, upperbody : string, lowerbody : string }]
 * }} props
 * @return {*}
 */
export default function HTMLTemplateFormEditor({
  html = "",
  onChange = html => {},
  wrapTemplateOptions = [],
  onUploadImage = (e, setImageUrl, setLoading) => {},
}) {
  const [textHTML, setTextHTML] = React.useState(html);
  const [generateInputOption, setGenerateInputOption] = React.useState(
    GenerateInputOption.formText(html)
  );
  const [mdSize, setMdSize] = React.useState({
    left: 10,
    right: 14,
  });

  React.useEffect(() => {
    onChange(textHTML);
    setGenerateInputOption(GenerateInputOption.formText(textHTML));
  }, [textHTML]);

  const handleGenerateInputsChange = generateInputs => {
    let editGenerateInputOption = generateInputOption;
    let editTextHTML = textHTML;

    for (const index in generateInputs) {
      const newKeyGenerateInput = `{${JSON.stringify(generateInputs[index])}}`;

      editTextHTML = editTextHTML?.replaceAll(
        editGenerateInputOption.keyGenerateInputs[index],
        newKeyGenerateInput
      );
    }

    setTextHTML(editTextHTML);
  };

  const getRenderTextHTML = () => {
    let renderTextHTML = textHTML;
    const generateInputs = generateInputOption.generateInputs;

    for (const index in generateInputs) {
      renderTextHTML = renderTextHTML.replaceAll(
        generateInputOption.keyGenerateInputs[index],
        generateInputs[index]?.value
      );
    }

    return renderTextHTML;
  };

  return (
    <React.Fragment>
      <Row gutter={5}>
        <Col md={mdSize.left}>
          <Row>
            <Col md={24}>
              <CodeEditor
                value={textHTML}
                onChange={textHTML => setTextHTML(textHTML)}
              />
            </Col>
            <Col md={24}>
              <GenerateInputs
                onUploadImage={onUploadImage}
                generateInputs={generateInputOption.generateInputs}
                onChange={handleGenerateInputsChange}
              />
            </Col>
          </Row>
          <div style={{ position: "absolute", left: 5, top: 40 }}>
            <Button
              onClick={e => {
                const left = mdSize.left + 1;
                const right = mdSize.right - 1;

                console.log({ left, right });

                if (left > 1 && left < 18) {
                  setMdSize({ left, right });
                }
              }}
              icon={<RightCircleOutlined />}
            />
          </div>
        </Col>
        <Col md={mdSize.right}>
          <div style={{ position: "absolute", right: 5, top: 40, zIndex: 999 }}>
            <Button
              onClick={e => {
                const left = mdSize.left - 1;
                const right = mdSize.right + 1;

                if (right > 1 && right < 18) {
                  setMdSize({ left, right });
                }
              }}
              icon={<LeftCircleOutlined />}
            />
          </div>
          <HtmlRender
            wrapTemplateOptions={wrapTemplateOptions}
            html={getRenderTextHTML()}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
