import { Alert, ui, ErrorBoundary } from "@adamjanicki/ui";
import { useEffect, useRef } from "react";
import makeIframeSrc from "src/utils/makeIframeSrc";

type Props = { code: string };

function Iframe({ code }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = makeIframeSrc(code);
  }, [code]);

  return (
    <ui.iframe
      vfx={{ borderStyle: "none", width: "full", height: "full" }}
      ref={iframeRef}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
    />
  );
}

export default function Compiler({ code }: Props) {
  return (
    <ErrorBoundary Fallback={ErrorMessage} deps={[code]}>
      <Iframe code={code} />
    </ErrorBoundary>
  );
}

type ErrorMessageProps = {
  error: Error;
};
const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const name = error?.name || "Unknown Error";
  const message = error?.message || "This error occurred for an unknown reason";
  return (
    <Alert type="error">
      <ui.p vfx={{ margin: "none" }} style={{ whiteSpace: "pre-wrap" }}>
        <strong>{name}</strong>: {message}
      </ui.p>
    </Alert>
  );
};
