import React from "react";
import * as ui from "@adamjanicki/ui";
import * as uiExtended from "@adamjanicki/ui-extended";

const allowedModules = {
  react: React,
  "@adamjanicki/ui": ui,
  "@adamjanicki/ui-extended": uiExtended,
} as const;

export default allowedModules;
