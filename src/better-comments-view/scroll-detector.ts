export function scrollDetector(upwardsExtent: string): {
  element: HTMLElement;
  onVisible: (cb: () => void) => () => void;
  isVisible: () => boolean;
} {
  const element = document.createElement("div");
  element.style.height = upwardsExtent;
  element.style.marginTop = `-${upwardsExtent}`;
  element.style.pointerEvents = "none";
  const callbacks = new Set<() => void>();

  const it = new IntersectionObserver(
    (r) => {
      console.log("intersectionobserver callback", r);
      for (const e of r) {
        if (!e.isIntersecting) continue;
        _isVisible = true;
        for (const cb of callbacks) {
          cb();
        }
        return;
      }
      _isVisible = false;
    },
    {
      root: null,
      threshold: 0.01,
    }
  );
  it.observe(element);

  let _isVisible: boolean | undefined = undefined;
  function isVisible() {
    console.log("isVisible", _isVisible);
    if (_isVisible === undefined) {
      for (const e of it.takeRecords()) {
        if (!e.isIntersecting) continue;
        return (_isVisible = true);
      }
      return (_isVisible = false);
    } else {
      return _isVisible;
    }
  }

  return {
    element,
    onVisible(cb) {
      callbacks.add(cb);
      setTimeout(() => {
        if (isVisible() && callbacks.has(cb)) {
          console.log("initially visible");
          cb();
        }
      });
      return () => {
        callbacks.delete(cb);
      };
    },
    isVisible,
  };
}
