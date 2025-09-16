export const IframeBridge = {
  replaceStylesheets(sheets: string[]) {
    console.log("got here");
    for (const style of Array.from(document.head?.querySelectorAll("style"))) {
      if (
        style.innerText.includes("/* modules */") &&
        style.innerText.includes("cloudfront.net")
      )
        continue;
      style.parentElement?.removeChild(style);
    }
    for (const s of sheets) {
      const style = document.createElement("style");
      style.innerText = s;
      document.head.appendChild(style);
    }
  },
};
