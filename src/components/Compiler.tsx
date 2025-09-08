import { Alert, ui, ErrorBoundary } from "@adamjanicki/ui";
import { useEffect, useRef, useState } from "react";
import makeIframeSrc from "src/utils/makeIframeSrc";

type Props = { code: string };

function Iframe({ code }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    setError(null);

    iframeRef.current.srcdoc = makeIframeSrc(code);
  }, [code]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === "iframe-error") {
        setError(new Error(event.data.message));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (error) {
    throw error;
  }

  return (
    <ui.iframe
      vfx={{ borderStyle: "none", width: "full", height: "full" }}
      ref={iframeRef}
      sandbox="allow-scripts allow-modals"
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
