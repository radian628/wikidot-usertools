export function listenForSelector(selector: string) {
  const elem = document.querySelector(selector);
  if (elem) return Promise.resolve(elem);

  return new Promise<Element>((resolve, reject) => {
    const observer = new MutationObserver(() => {
      const elem = document.querySelector(selector);
      if (elem) {
        observer.disconnect();
        resolve(elem);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function listenForNoSelector(selector: string) {
  const elem = document.querySelector(selector);
  if (!elem) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const observer = new MutationObserver(() => {
      const elem = document.querySelector(selector);
      if (!elem) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
