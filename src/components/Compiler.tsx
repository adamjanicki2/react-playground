import { Alert, ui, ErrorBoundary } from "@adamjanicki/ui";
import "src/components/compiler.css";

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

type Props = {
  code: string;
};

export default function Compiler({ code }: Props) {
  return (
    <ErrorBoundary Fallback={ErrorMessage} deps={[code]}>
      <Alert type="info">No code generated yet.</Alert>
    </ErrorBoundary>
  );
}
