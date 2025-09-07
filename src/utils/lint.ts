import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

export default function lint(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "babel",
    plugins: [babelPlugin, estreePlugin],
  });
}
