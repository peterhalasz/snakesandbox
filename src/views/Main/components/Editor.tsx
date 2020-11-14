import React from "react";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/monokai";

interface Props {
  code: string;
  onCodeChange: (code: string) => void;
}

export default function Editor({ onCodeChange, code }: Props) {
  return (
    <AceEditor
      onChange={onCodeChange}
      mode="javascript"
      theme="chrome"
      name="editor"
      fontSize={14}
      value={code}
      style={{ float: "left", height: "93vh", width: "100%" }}
      showPrintMargin={false}
      showGutter={false}
    />
  );
}
