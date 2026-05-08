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
import { mdiPencilPlus } from "@mdi/js";
import { Icon } from "@mdi/react";

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
      const removeMenu = hooks.addMenu({
        icon: () => <Icon path={mdiPencilPlus}></Icon>,
        onClickIcon() {
          openEditor();
        },
      });

      function openEditor() {
        removeMenu();
        hooks.replacePageWith(() => <App customCss={settings.customCss}></App>);
      }

      WIKIDOT.page.listeners.editClick = () => {};
      const openOnCtrlE = (e: KeyboardEvent) => {
        if (e.key === "e" && e.ctrlKey) {
          openEditor();
          document.removeEventListener("keydown", openOnCtrlE);
        }
      };
      document.addEventListener("keydown", openOnCtrlE);

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
