import React, { useMemo } from "react";
import * as Babel from "@babel/standalone";
import { Alert } from "@adamjanicki/ui";
import allowedModules from "src/utils/allowedModules";
import ErrorBoundary from "src/components/ErrorBoundary";
import "src/components/compiler.css";
import restrictedGlobals from "src/utils/restrictedGlobals";

type ErrorMessageProps = {
  error: Error;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const name = error?.name || "Unknown Error";
  const message = error?.message || "This error occurred for an unknown reason";
  return (
    <Alert type="error">
      <p className="pa0 ma0">
        <strong>{name}</strong>:{" "}
        {message.split("\n").map((line: string, index: number) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
    </Alert>
  );
};

type Props = {
  code: string;
};

type ComponentType = () => JSX.Element;

const _require = (moduleName: string) => {
  if (moduleName in allowedModules) {
    const key = moduleName as keyof typeof allowedModules;
    return allowedModules[key];
  }
  throw new Error(`Module '${moduleName}' not found`);
};

const Compiler = ({ code }: Props) => {
  const CustomCode = useMemo<ComponentType>(() => {
    try {
      // Transform the JSX code into JavaScript
      const transformedCode = Babel.transform(code, {
        presets: ["react"],
        plugins: ["transform-modules-commonjs"],
      }).code;

      if (!transformedCode) {
        throw new Error("Error transforming code");
      }

      // Create a new function from the transformed code
      const componentModule: Record<string, any> = { exports: {} };

      const componentFunction = new Function(
        "module",
        "exports",
        "require",
        "React",
        ...Object.keys(restrictedGlobals),
        transformedCode
      );

      componentFunction(
        componentModule,
        componentModule.exports,
        _require,
        React,
        ...Object.values(restrictedGlobals)
      );

      const RawComponent = componentModule.exports.default;

      if (typeof RawComponent !== "function") {
        throw new Error(
          "No default export found or default export is not a component"
        );
      }

      return RawComponent;
    } catch (error: any) {
      return () => <ErrorMessage error={error} />;
    }
  }, [code]);

  const Component = code
    ? CustomCode
    : () => <Alert type="info">No code generated yet.</Alert>;

  return (
    <div className="compiler-output">
      <ErrorBoundary Fallback={ErrorMessage} deps={code}>
        <Component />
      </ErrorBoundary>
    </div>
  );
};
export default Compiler;
