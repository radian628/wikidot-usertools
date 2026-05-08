/*!
// ==UserScript==
// @name        Wikidot DevOps 
// @namespace   Violentmonkey Scripts
// @grant       none
// @match       *://*.wikidot.com/*
// @version     2.0.1
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import { StringField, useGetSet, Vec2, waitFor } from "r628";
import {
  asyncRequestModule,
  getPageId,
  getPageSource,
  setPageSource,
} from "../common/wikidot-api-utils.js";
import { z } from "zod";
import * as idb from "idb";
import {
  compareBytes,
  getFileIds,
  replaceFile,
  uploadFile,
} from "../common/file-io.js";
import {
  WikidotDevopsContentMessage,
  WikidotDevopsFileMessage,
  WikidotDevopsMessage,
  WikidotDevopsMessageParser,
  WikidotDevopsPageMessage,
} from "./server/src/common-defs.js";
import { createRoot } from "react-dom/client";
import React, { useEffect, useRef } from "react";
import CSS from "./wikidot-devops.css?raw";
import { loadUsertoolsBundle } from "../combined/usertools-bundle.js";
import { Icon } from "@mdi/react";
import { mdiDeveloperBoard, mdiHorizontalRotateClockwise } from "@mdi/js";
import { PluginHooks } from "../combined/plugin.js";

async function applyUpdateToPageContent(
  pagesite: string,
  pageslug: string,
  content: WikidotDevopsContentMessage,
  ctx: ApplyPageUpdateContext,
) {
  const url = `http://${pagesite}.wikidot.com/${pageslug}`;

  ctx.pushInfo(
    `Fetching Page Source for page '${pageslug}' from '${content.updatedSourceUrl}'.`,
  );
  const newSource = await fetch(content.updatedSourceUrl).then((res) =>
    res.ok ? res.text() : undefined,
  );
  if (!newSource) {
    ctx.pushError(
      `Failed to fetch Page Source for page '${pageslug}' from '${content.updatedSourceUrl}'.`,
    );
    return;
  }
  ctx.pushInfo(`Uploading Page Source and Title for page '${pageslug}'.`);
  const res = await setPageSource(
    url,
    newSource,
    content.title,
    content.comment,
  );
  if (res.status === "ok") {
    ctx.pushSuccess(
      `Successfully uploaded Page Source and Title for page '${pageslug}'.`,
    );
  } else {
    ctx.pushError(
      `Failed to upload Page Source and Title for page '${pageslug}'.`,
    );
  }
}

async function applyUpdateToPageFile(
  pageId: string,
  fileMsg: WikidotDevopsFileMessage,
  ctx: ApplyPageUpdateContext,
) {
  ctx.pushInfo(`Fetching file '${fileMsg.name}' from '${fileMsg.fetchUrl}'.`);
  const file = await fetch(fileMsg.fetchUrl).then((res) =>
    res.ok ? res.blob() : undefined,
  );
  if (!file) {
    ctx.pushError(
      `Failed to fetch file '${fileMsg.name}' from '${fileMsg.fetchUrl}'.`,
    );
    return;
  }
  ctx.pushInfo(
    `Uploading file '${fileMsg.name}' (${Math.round(file.size / 1024)} kB).`,
  );
  const uploadResult = await uploadFile(
    fileMsg.name,
    file,
    fileMsg.comments ?? "",
    pageId,
    true,
  );
  if (uploadResult) {
    ctx.pushSuccess(`Successfully uploaded file '${fileMsg.name}'`);
  } else {
    ctx.pushError(`Failed to upload file '${fileMsg.name}'`);
  }
}

async function applyUpdateToPage(
  page: WikidotDevopsPageMessage,
  ctx: ApplyPageUpdateContext,
) {
  if (page.site !== ctx.currSite) {
    ctx.pushWarning(
      `Skipping cross-site page '${page.slug}' (expected site '${page.site}', currently on site '${ctx.currSite}')`,
    );
    return;
  }
  ctx.pushInfo(`Updating page '${page.slug}'.`);

  const url = `http://${page.site}.wikidot.com/${page.slug}`;
  let promises: Promise<any>[] = [];

  let pageContentUpdate: Promise<any> = Promise.resolve();

  if (page.updatedContent) {
    pageContentUpdate = applyUpdateToPageContent(
      page.site,
      page.slug,
      page.updatedContent,
      ctx,
    );
    promises.push(pageContentUpdate);
  }

  const pageId = await getPageId(url)
    // wait for page to be created if necessary
    .then((t) => (t ? t : pageContentUpdate))
    .then(() => getPageId(url));

  if (!pageId) {
    ctx.pushError(`Page '${page.slug}' does not exist, or has no Page ID.`);
    return;
  }

  for (const file of page.updatedFiles) {
    promises.push(applyUpdateToPageFile(pageId, file, ctx));
  }

  await Promise.all(promises);
  ctx.pushSuccess(`Done updating page '${page.slug}'.`);
}

type ApplyPageUpdateContext = {
  currSite: string;
  pushInfo: (msg: string) => void;
  pushWarning: (msg: string) => void;
  pushError: (msg: string) => void;
  pushSuccess: (msg: string) => void;
};

async function applyUpdate(
  update: WikidotDevopsMessage,
  ctx: ApplyPageUpdateContext,
) {
  let promises: Promise<any>[] = [];

  for (const p of update.updatedPages) {
    promises.push(applyUpdateToPage(p, ctx));
  }

  await Promise.all(promises);
}

// @ts-expect-error
window.applyUpdateToPage = applyUpdate;

loadUsertoolsBundle([
  {
    name: "Wikidot DevOps",
    defaultSettings: {},
    shouldRun(url) {
      return true;
    },
    async onPageLoad(hooks, settings) {
      hooks.addMenu({
        icon: () => <Icon path={mdiDeveloperBoard}></Icon>,
        menu: () => <Menu hooks={hooks}></Menu>,
      });
    },
  },
]);

function Menu(props: { hooks: PluginHooks }) {
  const { hooks } = props;
  const inputFieldDevopsUrl = useGetSet("ws://localhost:6969/changes");
  return (
    <div className="devops-init-ui">
      <style>{CSS}</style>
      <StringField {...inputFieldDevopsUrl}></StringField>
      <button
        onClick={() => {
          hooks.replacePageWith(() => (
            <App devopsUrl={inputFieldDevopsUrl.value}></App>
          ));
        }}
      >
        Initialize DevOps
      </button>
    </div>
  );
}

function App(props: { devopsUrl: string }) {
  const logEntries = useGetSet<
    {
      severity: "info" | "warning" | "error" | "success";
      text: string;
    }[]
  >([]);

  const status = useGetSet<"idle" | "changing" | "refreshing">("idle");

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const uiOpen = useGetSet(false);
  const logOpen = useGetSet(false);

  useEffect(() => {
    const ws = new WebSocket(props.devopsUrl);

    ws.addEventListener("message", async (e) => {
      const json = JSON.parse(e.data);
      const msgM = WikidotDevopsMessageParser.safeParse(json);
      if (!msgM.data) return;
      status.setValue(() => "changing");
      const msg = msgM.data;
      await applyUpdate(msg, {
        currSite: window.location.hostname.split(".").at(0)!,
        pushInfo: (text) => {
          logEntries.setValue((v) => [...v, { severity: "info", text }]);
        },
        pushWarning: (text) => {
          logEntries.setValue((v) => [...v, { severity: "warning", text }]);
        },
        pushError: (text) => {
          logEntries.setValue((v) => [...v, { severity: "error", text }]);
        },
        pushSuccess: (text) => {
          logEntries.setValue((v) => [...v, { severity: "success", text }]);
        },
      });
      logEntries.setValue((v) => [
        ...v,
        { severity: "info", text: "Refreshing..." },
        { severity: "info", text: "----------------------" },
      ]);
      status.setValue(() => "refreshing");
      const onload = () => {
        status.setValue(() => "idle");
        iframeRef.current?.removeEventListener("load", onload);
      };
      iframeRef.current?.addEventListener("load", onload);
      if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
    });

    return () => {
      ws.close();
    };
  }, []);

  function refreshNestedIframes() {
    const contentWindow = iframeRef.current?.contentWindow;
    for (const iframe of (contentWindow?.document.querySelectorAll(
      "#page-content iframe",
    ) ?? []) as HTMLIFrameElement[]) {
      iframe.src = iframe.src;
    }
  }

  const dimensions = useGetSet<Vec2>([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const listener = () => {
      dimensions.setValue(() => [window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <div className="devops-root">
      <style>{CSS}</style>
      <button
        className="toggle-devops-ui"
        onClick={() => {
          uiOpen.setValue((v) => !v);
        }}
      >
        {uiOpen.value ? "Hide DevOps UI" : "Show DevOps UI"}
      </button>
      {uiOpen.value && (
        <div className="devops-ui">
          <button
            onClick={() => {
              refreshNestedIframes();
            }}
          >
            Refresh Nested Iframes
          </button>
          <button
            onClick={() => {
              logOpen.setValue((v) => !v);
            }}
          >
            {logOpen.value ? "Hide Log" : "Show Log"}
          </button>
          <br></br>
          Status: {status.value}
          <br></br>
          {logOpen.value && (
            <div className="devops-log">
              {logEntries.each((l) => (
                <div className={l.value.severity}>{l.value.text}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <iframe
        style={{ border: "none" }}
        ref={iframeRef}
        src={window.location.href}
        width={dimensions.value[0]}
        height={dimensions.value[1]}
      ></iframe>
    </div>
  );
}
