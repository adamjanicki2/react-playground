import React from "react";
import * as ui from "@adamjanicki/ui";
import * as uiExtended from "@adamjanicki/ui-extended";
import * as FallingParticles from "falling-particles";

const allowedModules = {
  react: React,
  "@adamjanicki/ui": ui,
  "@adamjanicki/ui-extended": uiExtended,
  "falling-particles": FallingParticles,
} as const;

export default allowedModules;
