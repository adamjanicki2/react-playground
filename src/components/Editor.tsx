import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";
import "src/components/editor.css";

type Props = {};

const defaultCode = `import React from 'react';
export default function App() {
  return <div>Hello World!</div>;
}`;

const Editor = (props: Props) => {
  const [code, setCode] = useState(defaultCode);
  return (
    <>
      <CodeMirror
        className="editor-container"
        value={code}
        onChange={(value) => setCode(value)}
        height="60vh"
        width="80vw"
        basicSetup={{
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
          highlightActiveLineGutter: false,
          autocompletion: false,
        }}
        extensions={[langs.tsx()]}
      />
    </>
  );
};

export default Editor;
