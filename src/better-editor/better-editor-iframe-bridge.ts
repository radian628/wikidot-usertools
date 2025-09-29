import { preprocess } from "./preprocess.js";

let concattedSheets = "";

export const IframeBridge = {
  async replaceStylesheets(sheets: string[]) {
    const c = sheets.join("");
    if (c === concattedSheets) return;
    console.log("got here");
    concattedSheets = c;
    for (const style of Array.from(document.head?.querySelectorAll("style"))) {
      if (
        style.innerText.includes(
          `/*${window.location.pathname.split("/")[1]}*/`
        )
      ) {
        style.textContent = (
          await preprocess(sheets.shift() ?? "", 0, true)
        ).str;
      }
    }
  },
};
