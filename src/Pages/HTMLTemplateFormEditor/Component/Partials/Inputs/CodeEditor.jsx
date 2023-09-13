import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/html";
import { Button, Card, Col, Row, Typography } from "antd";

export default function CodeEditor({ value = "", onChange = value => {} }) {
  const [cursor, setCursor] = React.useState(null);

  const appendTextInCursor = newText => {
    const { $autoNewLine, $lines } = cursor.document;
    const { row, column } = cursor;

    let lineCode = $lines[row];
    let strBeforeColumn = lineCode.substring(0, column);
    let strAfterColumn = lineCode.substring(column, lineCode.length);

    $lines[row] = `${strBeforeColumn}${newText}${strAfterColumn}`;

    onChange($lines.join($autoNewLine));
  };

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
    <Card title={<Row gutter={10} justify='space-between' align='middle'>
      <Col>
        <Typography.Text strong>CODE VIEW</Typography.Text>
      </Col>
      <Col>
        <Row gutter={10}>
          <Col><Button icon={} /></Col>
        </Row>
      </Col>
    </Row>}>
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
