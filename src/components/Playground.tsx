import { Button } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/utils/util";
import { useEffect, useRef, useState } from "react";
import Compiler from "src/components/Compiler";
import Editor from "src/components/Editor";
import FileUpload from "src/components/FileUpload";
import { useCodeStore } from "src/hooks";
import { downloadCode, getCurrentTimestamp } from "src/utils/util";

const codeString = `import React from 'react'

export default function App() {
  return (
    <h1>Hello world!</h1>
  );
}
`;

type Props = {
  width: number;
  style?: React.CSSProperties;
  className?: string;
};

const Playground = ({ width, style, className }: Props) => {
  const compileRef = useRef<HTMLButtonElement>(null);
  const { code: savedCode, setCode: setSavedCode } = useCodeStore();
  const initialCode = savedCode ?? codeString;

  const [code, setCode] = useState(initialCode);
  const [codeToCompile, setCodeToCompile] = useState(initialCode);

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        if (event.key === "s") {
          compileRef.current?.click();
          event.stopPropagation();
        }
      }
    };

    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, []);

  const diff = code.trim() !== codeToCompile.trim();

  return (
    <div
      className={classNames("flex flex-column", className)}
      style={{ width, ...(style || {}) }}
    >
      <div className="flex items-center w-100 mb3">
        <Button
          ref={compileRef}
          onClick={() => {
            if (diff) {
              setCodeToCompile(code);
              setSavedCode(code);
            }
          }}
        >
          Compile <code>(⌃S)</code>
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            downloadCode(code, `react-playground-${getCurrentTimestamp()}.jsx`)
          }
          className="mh2"
        >
          Download
        </Button>
        <FileUpload
          onChange={(file) => {
            const reader = new FileReader();
            reader.onload = () => {
              const content = reader.result as string;
              setCode(content);
            };
            reader.readAsText(file);
          }}
        />
      </div>
      <div className="flex w-100 playground-container">
        <Editor
          screenWidth={width}
          height="50vh"
          code={code}
          setCode={setCode}
        />
        <Compiler code={codeToCompile} />
      </div>
    </div>
  );
};

export default Playground;
