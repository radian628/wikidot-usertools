/*!
// ==UserScript==
// @name        Radian628 Wikidot Usertools 
// @match       *://*.wikidot.com/*
// @grant       GM.getValue 
// @grant       GM.setValue 
// @version     1.0
// @author      radian628
// @description  
// ==/UserScript==
*/

import { createRoot } from "react-dom/client";
import { UsertoolPlugin, PluginHooks } from "./plugin.js";
import React, { useEffect, useState } from "react";
import { BooleanField, createEvalbox, NumberField, useGetSet } from "r628";
import { initCustomCssWidget } from "../custom-css-widget/widget.js";
import { getIsEnabled, getSettings, SettingsMenu } from "./settings-menu.js";

const appendedContentContainer = document.createElement("div");
document.body.appendChild(appendedContentContainer);

(async () => {
  const hooks: PluginHooks = {
    replacePageWith(Component) {
      for (const child of Array.from(document.head.childNodes)) {
        child.remove();
      }

      for (const child of Array.from(document.body.childNodes)) {
        if (child !== appendedContentContainer) {
          child.remove();
        }
      }

      const newPageContentContainer = document.createElement("div");
      document.body.prepend(newPageContentContainer);
      const root = createRoot(newPageContentContainer);
      root.render(<Component></Component>);

      return () => {
        newPageContentContainer.remove();
        root.unmount();
      };
    },
    appendToPage(Component) {
      const newAppendedContentContainer = document.createElement("div");
      appendedContentContainer.appendChild(newAppendedContentContainer);
      const root = createRoot(newAppendedContentContainer);
      root.render(<Component></Component>);

      return () => {
        newAppendedContentContainer.remove();
        root.unmount();
      };
    },
    evalbox: await createEvalbox(),
  };

  const isSettingsPage =
    window.location.hostname === "www.wikidot.com" &&
    window.location.pathname === "/radian628-wikidot-usertools";

  let plugins: UsertoolPlugin<any>[] = [];

  async function registerPlugin<T>(plugin: UsertoolPlugin<T>) {
    if (
      !isSettingsPage &&
      plugin.shouldRun(new URL(window.location.href)) &&
      (await getIsEnabled(plugin))
    ) {
      plugin.onPageLoad(hooks, await getSettings(plugin));
    }
    plugins.push(plugin);
  }

  registerPlugin({
    name: "Custom CSS Widget",
    defaultSettings: {
      height: 300,
    },
    settingsMenu: (props) => (
      <div>
        <NumberField {...props.prop("height")}></NumberField>
      </div>
    ),
    shouldRun: () => true,
    async onPageLoad(hooks, settings) {
      const initListener = () => {
        initCustomCssWidget();
        document.removeEventListener("click", initListener);
      };

      document.addEventListener("click", initListener);
    },
  });

  registerPlugin({
    name: "Sample Plugin",
    defaultSettings: {},
    settingsMenu: () => <div>sdfsdfdsf</div>,
    shouldRun: () => true,
    async onPageLoad() {},
  });

  if (isSettingsPage) {
    hooks.replacePageWith(() => (
      <SettingsMenu plugins={plugins}></SettingsMenu>
    ));
    return;
  }
})();
