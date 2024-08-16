import { Button, IconButton, Select, UnstyledButton } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/utils/util";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Compiler from "src/components/Compiler";
import Editor from "src/components/Editor";
import FileUpload from "src/components/FileUpload";
import Menu from "src/components/Menu";
import { useCodeStore, useKeys } from "src/hooks";
import availablethemes from "src/utils/availableThemes";
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

  const [showEditor, setShowEditor] = useState(true);
  const [theme, setTheme] = useState("default");

  useKeys({
    keys: ["meta+s", "ctrl+s"],
    callback: () => compileRef.current?.click(),
    keyEvent: "keydown",
  });

  const diff = code.trim() !== codeToCompile.trim();

  return (
    <div className="flex flex-column">
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
        <Select
          style={{ padding: "8px" }}
          options={Object.keys(availablethemes)}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mh2"
        />
        <Menu
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
              className="w-100 pa3 br3 alt-button tl"
              onClick={() => setShowEditor(!showEditor)}
            >
              {showEditor ? "Hide" : "Show"} editor
            </UnstyledButton>,
            <UnstyledButton
              onClick={() =>
                downloadCode(
                  code,
                  `react-playground-${getCurrentTimestamp()}.jsx`
                )
              }
              className="w-100 pa3 br3 alt-button tl"
            >
              Download as <code>.jsx</code>
            </UnstyledButton>,
            <FileUpload
              ButtonElement={UnstyledButton as any}
              ButtonProps={{}}
              className="w-100 pa3 br3 alt-button tl"
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
      <div
        className={classNames("flex w-100 playground-container", className)}
        style={{
          width,
          height: "60vh",
          overflowY: "scroll",
          ...(style || {}),
        }}
      >
        {showEditor && (
          <Editor
            screenWidth={width}
            code={code}
            setCode={setCode}
            theme={availablethemes[theme]}
          />
        )}
        <div
          className={classNames(
            "compiler-output",
            showEditor ? "compiler-bs" : ""
          )}
        >
          <Compiler code={codeToCompile} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
