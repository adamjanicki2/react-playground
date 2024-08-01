import React from "react";
import * as adamjanickiui from "@adamjanicki/ui";

const allowedModules = {
  react: React,
  "@adamjanicki/ui": adamjanickiui,
} as const;

export default allowedModules;
