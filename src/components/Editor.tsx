import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { classNames } from "@adamjanicki/ui/utils/util";
import "src/components/editor.css";
import { Resizable } from "re-resizable";

type Props = {
  code: string;
  setCode: (code: string) => void;
  screenWidth: number;
  height?: string | number;
  className?: string;
};

const Editor = ({ code, setCode, screenWidth, height, className }: Props) => (
  <Resizable
    className={classNames("flex editor-container", className)}
    defaultSize={{ width: Math.floor(screenWidth / 2), height }}
    enable={{ right: true }}
    minWidth={350}
    maxWidth={screenWidth - 350}
  >
    <CodeMirror
      style={{ width: "100%", height: "100%" }}
      className="pa2"
      value={code}
      onChange={(value) => setCode(value)}
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
