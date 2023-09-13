import { Col, Form, Row, Typography } from "antd";
import React from "react";
import CodeEditor from "./Partials/Inputs/CodeEditor";
import { GenerateInputOption } from "./Utils/Helpers";
import GenerateInputs from "./Partials/GenerateInputs";
import HtmlRender from "./Partials/HtrmlRender";

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
      <Row gutter={10}>
        <Col md={12}>
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
        </Col>
        <Col md={12}>
          <HtmlRender
            wrapTemplateOptions={wrapTemplateOptions}
            html={getRenderTextHTML()}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
