export const windowPadding = 16;

export function usableWidth() {
  return window.innerWidth - 2 * windowPadding;
}
