export function nullToUndefined<T>(val: null | undefined | T): T | undefined {
  return val ?? undefined;
}
