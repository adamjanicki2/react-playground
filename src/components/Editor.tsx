import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { classNames } from "@adamjanicki/ui/utils/util";
import "src/components/editor.css";

type Props = {
  code: string;
  setCode: (code: string) => void;
  width: number;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Editor = ({ code, setCode, width, height, className, style }: Props) => (
  <CodeMirror
    className={classNames("editor-container", className)}
    style={{ ...(style || {}), width, height }}
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
);

export default Editor;
