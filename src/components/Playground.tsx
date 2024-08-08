import { Button, IconButton, UnstyledButton } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/utils/util";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Compiler from "src/components/Compiler";
import Editor from "src/components/Editor";
import FileUpload from "src/components/FileUpload";
import Menu from "src/components/Menu";
import { useCodeStore, useKeys } from "src/hooks";
import lint from "src/utils/lint";
import { downloadCode, getCurrentTimestamp } from "src/utils/util";

const codeString = `import React from "react";

export default function App() {
  return <>Hello world.</>;
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

  useKeys({
    keys: ["meta+s", "ctrl+s"],
    callback: () => compileRef.current?.click(),
    keyEvent: "keydown",
  });

  const diff = code.trim() !== codeToCompile.trim();

  return (
    <div
      className={classNames("flex flex-column", className)}
      style={{ width, ...(style || {}) }}
    >
      <div className="flex items-center w-100 mb3">
        <Button
          ref={compileRef}
          onClick={async () => {
            if (diff) {
              let lintedCode: string;
              try {
                lintedCode = await lint(code);
              } catch (e: any) {
                return setCodeToCompile(code);
              }
              if (code !== lintedCode) {
                setCode(lintedCode);
              }
              setCodeToCompile(lintedCode);
              setSavedCode(lintedCode);
            }
          }}
        >
          Compile <code className="desktop">(⌘S)</code>
        </Button>
        <Menu
          className="ml2"
          trigger={
            <IconButton
              name="more"
              className="alt-button flex items-center justify-center"
              style={{ width: 32, height: 32, borderRadius: "50%" }}
              icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
            />
          }
          items={[
            <UnstyledButton
              onClick={() =>
                downloadCode(
                  code,
                  `react-playground-${getCurrentTimestamp()}.jsx`
                )
              }
              className="w-100 pa3 br3 alt-button"
            >
              Download as <code>.jsx</code>
            </UnstyledButton>,
            <FileUpload
              ButtonElement={UnstyledButton as any}
              ButtonProps={{}}
              className="w-100 pa3 br3 alt-button"
              onChange={(file) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const content = reader.result as string;
                  setCode(content);
                };
                reader.readAsText(file);
              }}
            />,
          ]}
        />
      </div>
      <div className="flex w-100 playground-container">
        <Editor
          screenWidth={width}
          height="60vh"
          code={code}
          setCode={setCode}
        />
        <Compiler code={codeToCompile} />
      </div>
    </div>
  );
};

export default Playground;
