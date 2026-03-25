/*!
// ==UserScript==
// @name        SCP Wiki AutoLocalize 
// @match       *://*.wikidot.com/user:info/*
// @grant       none
// @version     1.0
// @author      radian628
// @description Automatically localize SCP Wiki images. 
// ==/UserScript==
*/

import { createRoot } from "react-dom/client";
import { getAllFileInfo, getFileInfo, uploadFile } from "../common/file-io.js";
import {
  getPageId,
  getPageSource,
  setPageSource,
} from "../common/wikidot-api-utils.js";
import { imageResizePopup } from "./image-resize-widget.js";
import { Action, autolocalizePopup } from "./autolocalize-widget.js";

(async () => {
  const HOSTNAMES = [
    window.location.hostname,
    "scpwiki.com",
    "scp-wiki.net",
    "scp-wiki.wikidot.com",
    "www.scpwiki.com",
    "www.scp-wiki.net",
    "www.scp-wiki.wikidot.com",
    "www.wikidot.com",
    "cdn.scpwiki.com",
    "fonts.bunny.net",
    "d3g0gp89917ko0.cloudfront.net",
    "scp-wiki-cdn.nyc3.cdn.digitaloceanspaces.com",
  ];

  HOSTNAMES.push(...HOSTNAMES.map((o) => o.replaceAll("wikidot", "wdfiles")));

  const MANUAL_EXCLUSION_PREFIXES = [
    "https://api.crom.avn.sh/pixel",
    "https://o5command-int.wdfiles.com/local--files/tech-team:graphic-templates",
    "https://scp-int.wdfiles.com/local--files/main",
    "https://wanderers-library.wdfiles.com/local--files/component%3Atheme/wl_logo.png",
    "https://scp-wiki-de.wdfiles.com/local--files/scp-foundation-in-deutschland-portal/scp-logo-dach-400.png",
  ];

  type HostType = "local" | "other-wikidot" | "other";

  function testUrl(u: string, url_: string): HostType {
    const url = new URL(u, url_);
    if (!HOSTNAMES.includes(url.hostname)) {
      if (MANUAL_EXCLUSION_PREFIXES.some((s) => u.startsWith(s)))
        return "local";
      if (url.protocol === "data:") return "local";
      if (url.origin.match(/.*.(wikidot|wdfiles).com/g)) {
        return "other-wikidot";
      } else {
        return "other";
      }
    } else {
      return "local";
    }
  }

  let urlInfo: {
    url: string;
    hostType: HostType;
  }[] = [];

  const imgs = document.querySelectorAll("#page-content img");
  for (const img of Array.from(imgs)) {
    const src = img.getAttribute("src");
    if (src) {
      urlInfo.push({
        hostType: testUrl(src, window.location.href),
        url: src,
      });
    }
  }
  for (const style of Array.from(document.querySelectorAll("style"))) {
    const urls = [...(style.innerText.match(/url\(\S*\)/g) ?? [])].map((u) =>
      u
        .slice(4, -1)
        .replace(/^("|')/g, "")
        .replace(/("|')$/g, "")
        .replace("&amp;", "&"),
    );

    console.log("urls", urls);

    urlInfo.push(
      ...urls.map((u) => ({
        url: u,
        hostType: testUrl(u, window.location.href),
      })),
    );
  }

  // make urls unique
  urlInfo = [...new Map(urlInfo.map((u) => [u.url, u])).values()];

  // filter out ones not in page source
  const pageId = await getPageId(window.location.href);
  if (!pageId) return;
  const pageSource = (await getPageSource(window.location.href)).replaceAll(
    "\u00a0",
    " ",
  );
  urlInfo = urlInfo.filter((u) => pageSource.includes(u.url));

  const actions: Action[] = [];

  let actionid = 0;

  if (
    urlInfo.some(
      (u) =>
        new URL(u.url, window.location.href).hostname ===
        "fonts.googleapis.com",
    )
  ) {
    actions.push({
      type: "find-replace",
      findInSource: "fonts.googleapis.com",
      replaceInSource: "fonts.bunny.net",
      info: `Switch use of Google Fonts to privacy-preserving mirror Bunny Fonts.`,
      id: actionid++,
    });
  }

  for (const { url, hostType } of urlInfo) {
    if (hostType !== "local") {
      const parsedUrl = new URL(url, window.location.href);

      if (parsedUrl.hostname !== "fonts.googleapis.com") {
        const newFilename = parsedUrl.pathname
          .replace(/\/+$/g, "")
          .split("/")
          .at(-1)!;
        const slug = window.location.pathname.split("/")[1];

        actions.push({
          type: "localize",
          url: url,
          newName: newFilename,
          info: `Upload non-local file to Wikidot and change URLs in Page Source.`,
          findInSource: url,
          replaceInSourceBase: `https://${window.location.hostname}/local--files/${slug}/`,
          id: actionid++,
        });
      }
    }
  }

  if (actions.length > 0) {
    autolocalizePopup(actions, pageId);
  }
})();
