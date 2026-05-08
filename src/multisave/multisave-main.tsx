import { createRoot } from "react-dom/client";
import { MultisaveDialog } from "./multisave.js";
import React from "react";
import { PluginHooks, UsertoolPlugin } from "../combined/plugin.js";
import { Icon } from "@mdi/react";
import { mdiFolderMultiple } from "@mdi/js";

export const MultisavePlugin: UsertoolPlugin<{}> = {
  name: "Multisave",
  defaultSettings: {},
  shouldRun: () => true,
  onPageLoad: main,
};

async function main(hooks: PluginHooks) {
  let menuOpen = false;
  function createCustomFilesMenu() {
    menuOpen = true;
    const remove = hooks.appendToPage(
      () => (
        <MultisaveDialog
          rootClass={"multisave-dialog"}
          exit={() => {
            remove();
            menuOpen = false;
          }}
        ></MultisaveDialog>
      ),
      `
  position: fixed; 
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
      `,
    );
  }
  hooks.addMenu({
    icon: () => <Icon path={mdiFolderMultiple}></Icon>,
    menu: () => (
      <MultisaveDialog
        rootClass={"multisave-menu"}
        exit={() => {}}
      ></MultisaveDialog>
    ),
    // onClickIcon() {
    //   if (!menuOpen) {
    //     createCustomFilesMenu();
    //   }
    // },
  });

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
      createCustomFilesMenu();
    });
  }, 0);
}
