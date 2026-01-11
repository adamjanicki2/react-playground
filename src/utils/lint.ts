import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import typescriptPlugin from "prettier/plugins/typescript";
import prettier from "prettier/standalone";

export default function lint(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "typescript",
    plugins: [babelPlugin, typescriptPlugin, estreePlugin],
  });
}
