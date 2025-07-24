export function waitUntil<T>(
  fn: (cb: T extends void ? () => void : (t: T) => void) => () => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    // @ts-expect-error
    const unsub = fn((t) => {
      unsub();
      resolve(t);
    });
  });
}
