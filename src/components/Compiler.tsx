import React, { useMemo } from "react";
import * as Babel from "@babel/standalone";
import { Alert } from "@adamjanicki/ui";
import allowedModules from "src/utils/allowedModules";
import Boundary from "src/components/ErrorBoundary";
import "src/components/compiler.css";
import restrictedGlobals from "src/utils/restrictedGlobals";

type ErrorMessageProps = {
  error: Error;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <Alert type="error">
    <p className="pa0 ma0">
      <strong>{error.name}</strong>:{" "}
      {error.message.split("\n").map((line: string, index: number) => (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </p>
  </Alert>
);

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
  const Component = useMemo<ComponentType>(() => {
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
        ...Object.keys(restrictedGlobals),
        transformedCode
      );

      componentFunction(
        componentModule,
        componentModule.exports,
        _require,
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

  const ComponentToRender = code
    ? Component
    : () => <Alert type="info">No code generated yet.</Alert>;

  return (
    <div className="compiler-output">
      <Boundary
        fallback={({ error }) => <ErrorMessage error={error as Error} />}
      >
        {ComponentToRender}
      </Boundary>
    </div>
  );
};

export default Compiler;
