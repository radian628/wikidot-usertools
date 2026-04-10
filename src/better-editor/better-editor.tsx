import {
  injectFunction,
  StringField,
  throttle,
  workerifyServerIframe,
} from "r628";
import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./editor.js";
import { IframeBridge } from "./better-editor-iframe-bridge.js";
import { asyncRequestModule, getPageId } from "../common/wikidot-api-utils.js";
import { UsertoolPlugin } from "../combined/plugin.js";

// function initializeEditor() {
//   document.body.innerHTML = "";
//   document.head.innerHTML = "";
//   document.body.style.margin = "0";
//   document.body.style.padding = "0";
//   document.body.style.overflow = "hidden";
//   // @ts-expect-error
//   OZONE.utils.addJavascriptUrl = () => {};
//   const domRoot = document.createElement("div");
//   document.body.appendChild(domRoot);
//   const reactRoot = createRoot(domRoot);
//   reactRoot.render(<App></App>);
// }

export const BetterEditorPlugin: UsertoolPlugin<{ customCss: string }> = {
  name: "Better Editor",
  defaultSettings: { customCss: "" },
  settingsMenu: (props) => (
    <div>
      <label>Custom CSS</label>
      <br></br>
      <StringField isTextarea={true} {...props.prop("customCss")}></StringField>
    </div>
  ),
  shouldRun: () => true,
  async onPageLoad(hooks, settings) {
    // if not in an iframe
    if (window.parent === window) {
      console.log("RUN IN MAIN PAGE");
      await injectFunction(
        () => WIKIDOT?.page?.listeners?.editClick,
        (fn) => (WIKIDOT.page.listeners.editClick = fn),
        (fn) => (fn) => {
          hooks.replacePageWith(() => <App {...settings}></App>);
        },
      );

      console.log("RUN IN MAIN PAGE 2");
      // if in an iframe
    } else {
      workerifyServerIframe("iframe", IframeBridge, window.parent);
      window.addEventListener("load", () => {
        function forceRefreshAllCSS() {
          for (const style of Array.from(document.querySelectorAll("style"))) {
            style.parentElement?.removeChild(style);
            const style2 = document.createElement("style");
            style2.textContent = style.innerText + "/*force refresh lol*/";
            document.head.appendChild(style2);
          }
        }

        setTimeout(() => {
          forceRefreshAllCSS();
        }, 2000);
      });
    }
  },
};
