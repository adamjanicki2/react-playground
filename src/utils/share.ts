import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export const serializeCode = (code: string) =>
  compressToEncodedURIComponent(code);

export const deserializeCode = (encoded: string) => {
  if (!encoded) return null;
  const decoded = decompressFromEncodedURIComponent(encoded);
  return decoded ?? null;
};
