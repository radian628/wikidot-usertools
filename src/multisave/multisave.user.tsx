import { createRoot } from "react-dom/client";
import { MultisaveDialog } from "./multisave.js";
import React from "react";
import MultisaveCSS from "./multisave.css?raw";
import { UsertoolPlugin } from "../combined/plugin.js";

export const MultisavePlugin: UsertoolPlugin<{}> = {
  name: "Multisave",
  defaultSettings: {},
  shouldRun: () => true,
  onPageLoad: main,
};

async function main() {
  const interval = setInterval(() => {
    // get the file button
    const filesButton = document.getElementById("files-button") as HTMLElement;
    if (!filesButton || filesButton.dataset.isClone) return;
    clearInterval(interval);

    // replace files button with a clone with no listeners attached to it
    const buttonClone = filesButton.cloneNode(true) as HTMLElement;
    buttonClone.dataset.isClone = "true";
    filesButton.parentElement?.insertBefore(buttonClone, filesButton);
    filesButton.parentElement?.removeChild(filesButton);

    // add listener that will open the custom file dialog
    buttonClone.addEventListener("click", () => {
      const root = document.createElement("div");
      const shadowRoot = root.attachShadow({ mode: "open" });
      const editorStylesheet = document.createElement("style");
      editorStylesheet.innerHTML = MultisaveCSS;
      shadowRoot.appendChild(editorStylesheet);
      shadowRoot.appendChild(root);

      const root2 = document.createElement("div");
      shadowRoot.appendChild(root2);

      createRoot(root2).render(
        <MultisaveDialog
          exit={() => {
            document.body.removeChild(root);
          }}
        ></MultisaveDialog>,
      );
    });
  }, 0);
}
