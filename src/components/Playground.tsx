import { Button, Select, Box, ui } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { useRef, useState } from "react";
import Compiler from "src/components/Compiler";
import Editor from "src/components/Editor";
import Menu from "src/components/Menu";
import { useCodeStore, useKeys } from "src/hooks";
import availablethemes, { type Theme } from "src/utils/availableThemes";
import { downloadCode, getCurrentTimestamp } from "src/utils/helpers";
import lint from "src/utils/lint";

const codeString = `import React from "react";

export default function App() {
  return <>Hello world.</>;
}
`;

type Props = {
  width: number;
};

export default function Playground({ width }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { code: savedCode, setCode: setSavedCode } = useCodeStore();
  const initialCode = savedCode ?? codeString;

  const [code, setCode] = useState(initialCode);
  const [codeToCompile, setCodeToCompile] = useState(initialCode);

  const [showEditor, setShowEditor] = useState(true);
  const [theme, setTheme] = useState<Theme>("VSCode");

  useKeys({
    keys: ["meta+s", "ctrl+s"],
    callback: () => buttonRef.current?.click(),
    keyEvent: "keydown",
  });

  const diff = code.trim() !== codeToCompile.trim();

  return (
    <Box vfx={{ axis: "y", align: "center" }}>
      <Box
        vfx={{
          axis: "x",
          align: "center",
          padding: "m",
          gap: "s",
          borderBottom: true,
        }}
        className="toolbar"
      >
        <Button
          vfx={{ axis: "x", align: "center", gap: "xs" }}
          ref={buttonRef}
          onClick={async () => {
            if (diff) {
              let lintedCode: string;
              try {
                lintedCode = await lint(code);
              } catch {
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
          Compile{" "}
          <ui.code vfx={{ fontSize: "default" }} className="desktop">
            (⌘S)
          </ui.code>
        </Button>
        <Select
          aria-label="theme"
          options={Object.keys(availablethemes)}
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
        />
        <Menu
          buttonProps={{ icon: "overflow" }}
          children={[
            {
              text: showEditor ? "Hide editor" : "Show editor",
              onAction: () => setShowEditor(!showEditor),
            },
            {
              text: "Download as .jsx",
              onAction: () =>
                downloadCode(
                  code,
                  `react-playground-${getCurrentTimestamp()}.jsx`
                ),
            },
          ]}
        />
      </Box>
      <Box
        vfx={{ axis: "x" }}
        className="playground-container"
        style={{ width }}
      >
        {showEditor && (
          <Editor
            screenWidth={width}
            code={code}
            setCode={setCode}
            theme={availablethemes[theme]}
          />
        )}
        <Box
          className={classNames(
            "compiler-output",
            showEditor ? "compiler-bs" : ""
          )}
        >
          <Compiler code={codeToCompile} />
        </Box>
      </Box>
    </Box>
  );
}
