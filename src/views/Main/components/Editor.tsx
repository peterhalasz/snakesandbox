import * as React from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export default class Editor extends React.Component<Props> {
  render() {
    return (
      <AceEditor
        onChange={this.props.onCodeChange}
        mode="javascript"
        theme="chrome"
        name="editor"
        fontSize={14}
        value={this.props.code}
        style={{ float: "left", height: "93vh", width: "100%" }}
        showPrintMargin={false}
      />
    );
  }
}
