import { Icon } from "@mdi/react";
import { UsertoolPlugin } from "./plugin.js";
import { mdiContentCopy } from "@mdi/js";
import React from "react";
import { getPageSource } from "../common/wikidot-api-utils.js";

export const CopyPageSourceToClipboardPlugin: UsertoolPlugin<{}> = {
  name: "Copy Page Source to Clipboard",
  defaultSettings: {},
  shouldRun: () => true,
  async onPageLoad(hooks) {
    hooks.addMenu({
      icon: () => <Icon path={mdiContentCopy}></Icon>,
      onClickIcon: async () => {
        const src = await getPageSource(window.location.href);
        if (src === "") {
          hooks.toast(
            () => <>Error: Page Source is either empty or inaccessible.</>,
            2500,
            "error",
          );
          return;
        }
        const res = await navigator.clipboard
          .writeText(src)
          .catch(() => {
            hooks.toast(
              () => <>Failed to copy Page Source to clipboard.</>,
              2500,
              "error",
            );
          })
          .then(() => {
            hooks.toast(
              () => <>Copied Page Source to clipboard!</>,
              2500,
              "success",
            );
          });
      },
    });
  },
};
