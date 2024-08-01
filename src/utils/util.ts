export const windowPadding = 16;

export function usableWidth() {
  const width = window.visualViewport
    ? window.visualViewport.width
    : window.innerWidth;
  return width - 2 * windowPadding;
}

export function downloadCode(code: string, filename: string) {
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};
