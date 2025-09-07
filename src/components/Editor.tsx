import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { classNames } from "@adamjanicki/ui/functions";
import "src/components/editor.css";
import { Resizable } from "re-resizable";

type Props = {
  code: string;
  setCode: (code: string) => void;
  screenWidth: number;
  className?: string;
  theme?: ReactCodeMirrorProps["theme"];
};

const Editor = ({ code, setCode, screenWidth, className, theme }: Props) => (
  <Resizable
    className={classNames("aui-flex-x editor-container", className)}
    defaultSize={{ width: Math.floor(screenWidth / 2) }}
    enable={{ right: true }}
    minWidth={350}
    maxWidth={screenWidth - 350}
  >
    <CodeMirror
      style={{ width: "100%", height: "100%" }}
      className="aui-pa-s"
      value={code}
      onChange={(value) => setCode(value)}
      theme={theme}
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
  </Resizable>
);

export default Editor;
