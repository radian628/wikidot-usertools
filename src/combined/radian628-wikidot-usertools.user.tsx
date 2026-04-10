/*!
// ==UserScript==
// @name        (BETA WIP UNFINISHED) Radian628 Wikidot Usertools
// @match       *://*.wikidot.com/*
// @grant       GM.getValue 
// @grant       GM.setValue 
// @version     0.1.0
// @author      radian628
// @description all the usertools in one!
// ==/UserScript==
*/

import { createRoot } from "react-dom/client";
import { UsertoolPlugin, PluginHooks } from "./plugin.js";
import React, { useEffect, useState } from "react";
import { BooleanField, createEvalbox, NumberField, useGetSet } from "r628";
import { initCustomCssWidget } from "../custom-css-widget/widget.js";
import { getIsEnabled, getSettings, SettingsMenu } from "./settings-menu.js";
import { CustomCSSWidgetPlugin } from "../custom-css-widget/custom-css-widget.jsx";
import { BetterEditorPlugin } from "../better-editor/better-editor.js";
import { AutoLocalizePlugin } from "../autolocalize/autolocalize.js";
import { UnfuckAllCSSPlugin } from "../unfuck-all-css/unfuck-all-css.user.js";
import { BetterCommentsViewPlugin } from "../better-comments-view/better-comments-view.user.js";
import { MinimalistEditorPlugin } from "../minimalist-editor/minimalist-editor.js";
import { MultisavePlugin } from "../multisave/multisave.user.js";
import { SmartHistoryPlugin } from "../smart-history/smart-history.js";
import { BetterForumViewPlugin } from "../better-forum/better-forum-view.js";

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
      !window.location.pathname.endsWith("resize-iframe.html") &&
      plugin.shouldRun(new URL(window.location.href)) &&
      (await getIsEnabled(plugin))
    ) {
      plugin.onPageLoad(hooks, await getSettings(plugin));
    }
    plugins.push(plugin);
  }

  registerPlugin(CustomCSSWidgetPlugin);
  registerPlugin(BetterEditorPlugin);
  registerPlugin(AutoLocalizePlugin);
  registerPlugin(UnfuckAllCSSPlugin);
  registerPlugin(BetterCommentsViewPlugin);
  registerPlugin(MinimalistEditorPlugin);
  registerPlugin(MultisavePlugin);
  registerPlugin(SmartHistoryPlugin);
  registerPlugin(BetterForumViewPlugin);

  if (isSettingsPage) {
    hooks.replacePageWith(() => (
      <SettingsMenu plugins={plugins}></SettingsMenu>
    ));
    return;
  }
})();
