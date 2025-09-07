import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { githubLight } from "@uiw/codemirror-theme-github";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";

const availablethemes = {
  Default: "light",
  Eclipse: eclipse,
  GitHub: githubLight,
  VSCode: vscodeLight,
  Xcode: xcodeLight,
} as const;

export type Theme = keyof typeof availablethemes;
export default availablethemes;
