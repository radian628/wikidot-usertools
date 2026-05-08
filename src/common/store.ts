import { useSyncExternalStore } from "react";

export function createStore<T>(initValue: T) {
  let data: T = initValue;

  const subscribers: Set<(t: T) => void> = new Set();

  return {
    use() {
      return useSyncExternalStore(
        (cb) => {
          subscribers.add(cb);
          return () => {
            subscribers.delete(cb);
          };
        },
        () => data,
      );
    },
    set(cb: (oldValue: T) => T) {
      data = cb(data);
      for (const s of subscribers) {
        s(data);
      }
    },
  };
}
