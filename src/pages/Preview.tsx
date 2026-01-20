import "src/components/compiler.css";

import {
  Badge,
  Box,
  Button,
  Icon,
  useLocation,
  useNavigate,
} from "@adamjanicki/ui";
import { check, clipboard } from "@adamjanicki/ui/icons";
import { useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Alert from "src/components/Alert";
import Compiler from "src/components/Compiler";
import Page from "src/components/Page";
import { useCodeStore } from "src/hooks";
import { deserializeCode } from "src/utils/share";

export default function Preview() {
  const { setCode } = useCodeStore();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const code = useMemo(() => {
    const rawHash = hash.startsWith("#") ? hash.slice(1) : hash;
    return deserializeCode(rawHash);
  }, [hash]);

  return (
    <Page documentTitle="Preview" vfx={{ paddingY: "m" }}>
      {!code ? (
        <Alert type="warning">
          Missing or invalid preview code in the URL hash.
        </Alert>
      ) : (
        <Box
          vfx={{ axis: "x", gap: "m", width: "full", paddingX: "l" }}
          className="preview-container"
        >
          <Box
            vfx={{
              axis: "y",
              radius: "rounded",
              border: true,
              overflow: "hidden",
              backgroundColor: "default",
              shadow: "subtle",
            }}
            className="preview-snippet"
          >
            <Box
              vfx={{
                axis: "x",
                align: "center",
                justify: "end",
                width: "full",
                backgroundColor: "muted",
                padding: "s",
                borderBottom: true,
                gap: "s",
              }}
            >
              <Button
                size="small"
                onClick={() => {
                  setCode(code);
                  navigate("/");
                }}
              >
                Edit in my playground
              </Button>
              <CopyButton>{code}</CopyButton>
            </Box>
            <Box vfx={{ axis: "y", width: "full", padding: "s" }}>
              <SyntaxHighlighter
                showLineNumbers
                children={code.trim()}
                language="tsx"
                customStyle={{
                  background: "none",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                }}
              />
            </Box>
          </Box>
          <Box
            vfx={{ width: "full" }}
            className="compiler-output preview-compiler"
            style={{ minHeight: "60vh" }}
          >
            <Compiler code={code} />
          </Box>
        </Box>
      )}
    </Page>
  );
}

type Props = {
  children: string;
};

function CopyButton({ children }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return copied ? (
    <Badge
      vfx={{ axis: "x", align: "center", gap: "xs", paddingY: "xs" }}
      type="success"
    >
      <Icon icon={check} /> Copied
    </Badge>
  ) : (
    <Button
      vfx={{ axis: "x", align: "center", gap: "xs" }}
      onClick={copy}
      size="small"
      variant="secondary"
    >
      <Icon icon={clipboard} />
      Copy
    </Button>
  );
}
