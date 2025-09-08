import * as Babel from "@babel/standalone";

export default function makeIframeSrc(code: string) {
  let transformed = code.replace(
    /from\s+["']([^"']+)["']/g,
    (_, libName) => `from "https://esm.sh/${libName}"`
  );

  transformed = transformed.replace(/export\s+default\s+/, "window.__App__ = ");

  const babelCompiled = Babel.transform(transformed, {
    presets: ["react"],
  }).code;

  return `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://esm.sh/@adamjanicki/ui/style.css">
</head>
<body>
<div id="root"></div>
<script type="module">
${babelCompiled}

import { createRoot } from "https://esm.sh/react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App__));
</script>
</body>
</html>`;
}
