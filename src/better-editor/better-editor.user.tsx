/*!
// ==UserScript==
// @name        Better Wikidot Editor
// @namespace   Violentmonkey Scripts
// @grant       none
// @match *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import { throttle, workerifyServerIframe } from "r628";
import { injectFunction } from "../../r628/src/inject.js";
import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./editor.js";
import { IframeBridge } from "./better-editor-iframe-bridge.js";

function defaultThrottle(fn: Parameters<typeof throttle>[0]) {
  return throttle(fn, {
    maxConcurrentRequests: 5,
    limits: [{ duration: 5, maxRequests: 10 }],
  });
}

function _asyncRequestModule(module: string, params: any) {
  return new Promise<any>((resolve, reject) => {
    OZONE.ajax.requestModule(module, params, (e) => {
      resolve(e);
    });
  });
}

let idcache = new Map<string, string>();
const getPageId = defaultThrottle(async function (url: string) {
  if (idcache.has(url)) return idcache.get(url);
  const text = await (await fetch(url)).text();
  const dom = new DOMParser().parseFromString(text, "text/html");
  const elems = dom.querySelectorAll("head script");
  for (const s of Array.from(elems) as HTMLElement[]) {
    const pageid = s.innerText.match(/WIKIREQUEST\.info\.pageId\s*\=\s*(\d+)/);
    if (pageid) {
      idcache.set(url, pageid[1]);
      return pageid[1];
    }
  }
});

const asyncRequestModule = defaultThrottle(_asyncRequestModule);

export async function setPageSource(url: string, newSource: string) {
  const id = await getPageId(url);
  const slug = new URL(url).pathname.slice(1);
  const lock = (await asyncRequestModule("edit/PageEditModule", {
    page_id: id,
    mode: "page",
    wiki_page: slug,
    force_lock: "yes",
  })) as any;
  const dom = new DOMParser().parseFromString(lock.body, "text/html");
  await asyncRequestModule("Empty", {
    action: "WikiPageAction",
    comments: "Antivandalism script: Blanked page.",
    event: "savePage",
    lock_id: lock.lock_id,
    lock_secret: lock.lock_secret,
    mode: "page",
    page_id: id,
    recaptcha_challenge_field: "",
    recaptcha_response_field: "",
    revision_id: lock.page_revision_id,
    source: newSource,
    title:
      (dom.getElementById("edit-page-title") as HTMLInputElement)?.value ??
      "No Title",
    wiki_page: slug,
  });
}

export async function getPageSource(url: string): Promise<string> {
  const id = await getPageId(url);
  const res = (await asyncRequestModule("viewsource/ViewSourceModule", {
    page_id: id,
  })) as any;
  return (
    (
      new DOMParser()
        .parseFromString(res.body, "text/html")
        .querySelector(".page-source") as HTMLElement
    )?.innerText ?? ""
  );
}

function initializeEditor() {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
  // @ts-expect-error
  OZONE.utils.addJavascriptUrl = () => {};
  const domRoot = document.createElement("div");
  document.body.appendChild(domRoot);
  const reactRoot = createRoot(domRoot);
  reactRoot.render(<App></App>);
}

(async () => {
  await injectFunction(
    () => window?.WIKIDOT?.page?.listeners?.editClick,
    (fn) => (WIKIDOT.page.listeners.editClick = fn),
    (fn) => (fn) => {
      initializeEditor();
    }
  );
})();

window.addEventListener("load", () => {
  function forceRefreshAllCSS() {
    for (const style of Array.from(document.querySelectorAll("style"))) {
      style.parentElement?.removeChild(style);
      const style2 = document.createElement("style");
      style2.innerText = style.innerText;
      document.head.appendChild(style2);
    }
  }

  forceRefreshAllCSS();
});

if (window.parent !== window) {
  workerifyServerIframe("iframe", IframeBridge, window.parent);
}
