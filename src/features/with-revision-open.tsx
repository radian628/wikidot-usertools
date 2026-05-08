import { waitFor } from "r628";
import { PluginHooks, UsertoolFeature } from "../combined/plugin.js";
import { revisionNumberToId } from "../common/history.js";
import { getPageId } from "../common/wikidot-api-utils.js";
import React from "react";

export const WithRevisionOpenFeature: UsertoolFeature = {
  name: "Open pages with revision source automatically open",
  async setup(hooks: PluginHooks) {
    const search = new URLSearchParams(window.location.search);

    if (!search.has("withRevisionOpen")) return;

    const revisionNumber = Number(search.get("withRevisionOpen"));
    if (isNaN(revisionNumber)) return;

    const loadingDialog = hooks.appendToPage(
      () => (
        <div
          style={{
            border: "1px solid black",
            color: "black",
            backgroundColor: "white",
            padding: "20px",
            fontSize: "125%",
          }}
        >
          Loading Revision {revisionNumber}...
        </div>
      ),
      "left: 50%; top: 10px; transform: translateX(-50%); position: fixed; z-index: 9999",
    );

    const pageId = await getPageId(window.location.href);
    if (pageId === undefined) return;

    const id = await revisionNumberToId(pageId, revisionNumber);
    if (id.type === "error") return;

    const revidnum = Number(id.id);
    if (isNaN(revidnum)) return;

    // open history and wait for it to load
    // @ts-expect-error
    WIKIDOT.page.listeners.historyClick();
    await waitFor(
      () =>
        document.querySelector("#history-form-1 .page-history") ?? undefined,
    );

    // open source and wait for it to load
    // @ts-expect-error
    showSource(revidnum);
    const pagesource = await waitFor(
      () =>
        document.querySelector("#history-subarea .page-source") ?? undefined,
    );

    loadingDialog();

    // scroll source into view
    document.querySelector("history-subarea")?.scrollIntoView(true);
  },
};
