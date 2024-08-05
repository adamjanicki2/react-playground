import * as prettier from "prettier/standalone";
import * as babylon from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

export default function lint(code: string): Promise<string> {
  const formattedCode = prettier.format(code, {
    parser: "babel",
    plugins: [babylon, prettierPluginEstree],
  });

  return formattedCode;
}
