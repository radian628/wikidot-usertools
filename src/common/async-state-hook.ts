import { useGetSet, useLatest } from "r628";
import { useEffect, useReducer, useRef, useState } from "react";

export function useAsyncState<T>(generate: () => T | Promise<T>, deps: any[]) {
  const state = useGetSet<T | undefined>(undefined);

  const execIndexRef = useRef(0);

  useEffect(() => {
    execIndexRef.current++;
    state.setValue(() => undefined);
  }, deps);

  function setIfValid(
    setter: (t: T | undefined) => T | undefined,
    index: number,
  ) {
    if (execIndexRef.current === index) {
      state.setValue(setter);
    }
  }

  useEffect(() => {
    const myIndex = execIndexRef.current;
    if (state.value !== undefined) return;
    (async () => {
      const newValue = await generate();
      setIfValid(() => newValue, myIndex);
    })();
  }, [state.value, ...deps]);

  return {
    value: state.value,
    setValue: (setter: (value: T | undefined) => T | undefined) => {
      const myIndex = execIndexRef.current;
      setIfValid(setter, myIndex);
    },
  };
}

export function useAsyncInstantState<T>(generate: () => T, deps: any[]) {
  const state = useGetSet<T>(generate());

  const execIndexRef = useRef(0);

  useEffect(() => {
    const index = execIndexRef.current++;
    state.setValue(() => generate());
  }, deps);

  function setIfValid(setter: (t: T) => T, index: number) {
    if (execIndexRef.current === index) {
      state.setValue(setter);
      return true;
    }
    return false;
  }

  return {
    value: state.value,
    setValue: (setter: (value: T) => T) => {
      const myIndex = execIndexRef.current;
      setIfValid(setter, myIndex);
    },
  };
}

export function useListAsyncSequence<T>(
  loadMore: (i: number) => Promise<{
    data: T[];
    hasMore: boolean;
  }>,
  deps: any[],
) {
  const [state, dispatch] = useReducer(
    (prevState, action: { callingDeps: any[]; reset: boolean }) => {
      if (action.reset) {
        return {
          deps: action.callingDeps,
          seqEntry: Promise.resolve({ data: [], nextIndex: 0, hasMore: true }),
        };
      }

      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== action.callingDeps[i]) return prevState;
      }

      return {
        seqEntry: (async () => {
          const s = await prevState.seqEntry;
          if (!s.hasMore) return s;
          const more = await loadMore(s.nextIndex);
          return {
            nextIndex: s.nextIndex + 1,
            data: [...s.data, ...more.data],
            hasMore: more.hasMore,
          };
        })(),
        deps: prevState.deps,
      };
    },
    {
      seqEntry: Promise.resolve({
        data: [] as T[],
        nextIndex: 0,
        hasMore: true,
      }),
      deps: deps,
    },
  );

  const latestState = useGetSet<T[]>([]);

  useEffect(() => {
    (async () => {
      const s = await state.seqEntry;
      latestState.setValue(() => s.data);
    })();
  }, [state]);

  useEffect(() => {
    dispatch({ callingDeps: deps, reset: true });
  }, deps);

  return {
    loadMore: async () => {
      dispatch({ callingDeps: deps, reset: false });
    },
    value: latestState.value,
  };
}
