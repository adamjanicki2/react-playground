import { Button } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/utils/util";
import { useEffect, useRef, useState } from "react";
import Compiler from "src/components/Compiler";
import Editor from "src/components/Editor";
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

  const [code, setCode] = useState(codeString);
  const [codeToCompile, setCodeToCompile] = useState(codeString);

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
      <div className="flex items-center w-100 mb2">
        <Button
          ref={compileRef}
          onClick={() => {
            if (diff) setCodeToCompile(code);
          }}
        >
          Compile <code>(⌃S)</code>
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            downloadCode(code, `react-playground-${getCurrentTimestamp()}.jsx`)
          }
          className="ml2"
        >
          Download
        </Button>
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
