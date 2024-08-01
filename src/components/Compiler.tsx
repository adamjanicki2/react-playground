import { useMemo } from "react";
import * as Babel from "@babel/standalone";
import Boundary from "src/components/ErrorBoundary";
import { Alert } from "@adamjanicki/ui";
import allowedModules from "src/utils/allowedModules";
import "src/components/compiler.css";

type Props = {
  code: string;
};

type ComponentType = () => JSX.Element;

const _require = (moduleName: string) => {
  if (moduleName in allowedModules) {
    const key = moduleName as keyof typeof allowedModules;
    return allowedModules[key];
  }
  // Does not exist
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
      // eslint-disable-next-line no-new-func
      const componentFunction = new Function(
        "module",
        "exports",
        "require",
        transformedCode
      );
      componentFunction(componentModule, componentModule.exports, _require);

      return (
        componentModule.exports.default ||
        (() => (
          <Alert type="warning">
            <p className="ma0">
              No default export was provided.
              <br />
              Make sure to add <code>export default</code>.
            </p>
          </Alert>
        ))
      );
    } catch (error: any) {
      return () => <Alert type="error">{error.toString()}</Alert>;
    }
  }, [code]);

  const ComponentToRender = code
    ? Component
    : () => <Alert type="info">No code generated yet.</Alert>;

  return (
    <div className="compiler-output">
      <Boundary
        fallback={({ error }) => <Alert type="error">{error.toString()}</Alert>}
      >
        {ComponentToRender}
      </Boundary>
    </div>
  );
};

export default Compiler;
