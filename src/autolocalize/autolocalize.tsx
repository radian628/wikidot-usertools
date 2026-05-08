import React from "react";
import { PluginHooks, UsertoolPlugin } from "../combined/plugin.js";
import {
  getPageId,
  getPageSource,
  setPageSource,
} from "../common/wikidot-api-utils.js";
import { Action, autolocalizePopup } from "./autolocalize-widget.js";
import { getOffsetSources } from "./find-offsets.js";
import { Icon } from "@mdi/react";
import { mdiImageMove } from "@mdi/js";

export const HOSTNAMES = [
  // window.location.hostname,
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

const main = async (hooks: PluginHooks) => {
  const infobox = document.createElement("div");
  document.body.appendChild(infobox);
  infobox.style = `
  z-index: 99;
  color: black;
  font-family: monospace;
  background-color: white;
  border: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
`;
  function pushInfoLine(line: string) {
    const text = new Text(line);
    infobox.appendChild(text);
    infobox.appendChild(document.createElement("br"));
  }
  const parentPageId = await getPageId(window.location.href);
  if (!parentPageId) return;

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

  async function loadUrlsFrom(dom: Document, pageUrl: string) {
    let urlInfo: {
      url: string;
      hostType: HostType;
    }[] = [];

    const pageSource = (await getPageSource(pageUrl)).replaceAll("\u00a0", " ");

    const imgs = dom.querySelectorAll("#page-content img");
    for (const img of Array.from(imgs)) {
      const src = img.getAttribute("src");
      if (src) {
        urlInfo.push({
          hostType: testUrl(src, pageUrl),
          url: src,
        });
      }
    }

    function findUrlsInCSS(css: string) {
      const urls = [...(css.match(/url\(\S*\)/g) ?? [])].map((u) =>
        u
          .slice(4, -1)
          .replace(/^("|')/g, "")
          .replace(/("|')$/g, "")
          .replace("&amp;", "&"),
      );

      urlInfo.push(
        ...urls.map((u) => ({
          url: u,
          hostType: testUrl(u, pageUrl),
        })),
      );
    }

    for (const style of Array.from(dom.querySelectorAll("style"))) {
      findUrlsInCSS(style.innerText);
    }

    for (const css of pageSource.match(
      /\[\[code.*?\]\][\s\S]*?\[\[\/code\]\]/g,
    ) ?? []) {
      findUrlsInCSS(css);
    }

    // make urls unique
    urlInfo = [...new Map(urlInfo.map((u) => [u.url, u])).values()];

    // filter out ones not in page source
    urlInfo = urlInfo.filter((u) => pageSource.includes(u.url));

    return urlInfo;
  }

  pushInfoLine("Fetching page source...");

  const parentPageSource = await getPageSource(window.location.href);

  pushInfoLine("Fetching offsets (if any exist)...");

  const offsetSources = await getOffsetSources(
    parentPageSource,
    window.location.href,
  );

  pushInfoLine("Finding hotlinked image URLs in all pages...");

  const offsetUrls = (
    await Promise.all(
      offsetSources.map(async (o) => await loadUrlsFrom(o.dom, o.url)),
    )
  ).flat(1);

  let urlInfo: {
    url: string;
    hostType: HostType;
  }[] = [
    ...(await loadUrlsFrom(document, window.location.href)),
    ...offsetUrls,
  ];

  infobox.remove();

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
    hooks.toast(
      () => (
        <>
          Some images on this page are not localized. See the menu in the bottom
          left.
        </>
      ),
      10000,
      "warning",
    );
    return autolocalizePopup(actions, parentPageId, offsetSources);
  }
};

export const AutoLocalizePlugin: UsertoolPlugin<{}> = {
  name: "AutoLocalize",
  defaultSettings: {},
  shouldRun: () => true,
  async onPageLoad(hooks, settings) {
    await hooks.waitForPageLoad();
    const Menu = await main(hooks);
    if (Menu) {
      hooks.addMenu({
        icon: () => <Icon path={mdiImageMove}></Icon>,
        menu: () => <Menu></Menu>,
      });
    }
  },
  settingsMenu: (props) => <div>(no settings available for this plugin)</div>,
};
