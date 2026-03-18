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

import { getAllFileInfo, getFileInfo, uploadFile } from "../common/file-io.js";
import {
  getPageId,
  getPageSource,
  setPageSource,
} from "../common/wikidot-api-utils.js";
import { imageResizePopup } from "./image-resize-widget.js";

export type Action =
  | {
      id: number;
      type: "find-replace";
      find: string;
      replace: string;
      reasoning: string;
    }
  | {
      id: number;
      type: "upload-file";
      oldUrl: string;
      newName: string;
      reasoning: string;
    };
function promiseQueue() {
  let prev: Promise<any> = Promise.resolve();

  return {
    enqueue<T>(p: () => Promise<T>): Promise<T> {
      const myPrev = prev;
      const res = (async () => {
        await myPrev;
        return await p();
      })();
      prev = res;
      return res;
    },
  };
}

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

  const root = document.createElement("div");
  document.body.appendChild(root);
  root.style = `
position: fixed;
z-index: 999;
bottom: 0;
right: 0;
color: black;
background-color: white;
box-shadow: 0 0 10px black;
border-top: 1px solid black;
border-left: 1px solid black;
padding: 10px;
font-family: sans-serif;
max-width: 50%;
max-height: 50%;
overflow: auto;
transition: transform 0.25s;
`;

  const showHide = document.createElement("button");
  root.appendChild(showHide);
  showHide.innerText = "Show/Hide";
  let show = true;
  showHide.onclick = () => {
    show = !show;
    if (show) {
      root.style.transform = "";
      root.style.overflow = "";
    } else {
      root.style.transform = "translateY(calc(100% - 40px))";
      root.scrollTop = 0;
      root.style.overflow = "hidden";
    }
  };

  {
    const br = document.createElement("br");
    root.appendChild(br);
  }

  if (!urlInfo.some((a) => a.hostType !== "local")) {
    root.parentElement?.removeChild(root);
    return;
  }

  root.appendChild(
    new Text(
      `Some images on this page are not localized. Here is a list of all improperly-localized URLs:`,
    ),
  );

  const ul = document.createElement("ul");
  root.appendChild(ul);

  for (const { url, hostType } of urlInfo) {
    if (hostType !== "local") {
      const li = document.createElement("li");
      ul.appendChild(li);

      const a = document.createElement("a");
      li.appendChild(a);
      a.href = url;
      a.target = "_blank";
      a.innerText = url;
    }
  }

  root.appendChild(
    new Text("To fix this, the following actions are suggested:"),
  );

  const ul2 = document.createElement("ul");
  root.appendChild(ul2);

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
      find: "fonts.googleapis.com",
      replace: "fonts.bunny.net",
      reasoning: `Switch use of Google Fonts to privacy-preserving mirror Bunny Fonts.`,
      id: actionid++,
    });
  }

  const fileInfo = await getAllFileInfo(pageId);

  const usedFilenames = new Set<string>(
    [...fileInfo.info.values()].map((f) => f.name),
  );

  const extRegex = /\.[a-zA-Z-_]+$/g;

  function pickUniqueFilename(name: string) {
    let candidate = name;
    let i = 2;
    while (true) {
      if (!usedFilenames.has(candidate)) {
        usedFilenames.add(candidate);
        return candidate;
      }
      let ext = name.match(extRegex)?.[0] ?? "";

      candidate = name.replace(extRegex, "") + i + ext;
      i++;
    }
  }

  for (const { url, hostType } of urlInfo) {
    if (hostType !== "local") {
      const parsedUrl = new URL(url, window.location.href);

      if (parsedUrl.hostname !== "fonts.googleapis.com") {
        const newFilename = pickUniqueFilename(
          url.replace(/\/+$/g, "").split("/").at(-1)!,
        );

        const slug = window.location.pathname.split("/")[1];

        actions.push({
          type: "upload-file",
          oldUrl: url,
          newName: newFilename,
          reasoning: `Upload non-local file.`,
          id: actionid++,
        });
        actions.push({
          type: "find-replace",
          find: url,
          replace: `https://${window.location.hostname}/local--files/${slug}/${newFilename}`,
          reasoning: `Upload non-local file.`,
          id: actionid++,
        });
      }
    }
  }

  for (const ac of actions) {
    const li = document.createElement("li");
    ul2.appendChild(li);
    if (ac.type === "find-replace") {
      li.appendChild(
        new Text(
          `Page Source: Replace '${ac.find}' with '${ac.replace}' (${ac.reasoning})`,
        ),
      );
    } else {
      li.appendChild(
        new Text(
          `Files: Upload file with name '${ac.newName}' from '${ac.oldUrl}' (${ac.reasoning})`,
        ),
      );
    }
  }

  root.appendChild(
    new Text(
      "Press the button to below to perform all actions listed above automatically:",
    ),
  );

  const popupQueue = promiseQueue();

  const br = document.createElement("br");
  root.appendChild(br);

  const applyButton = document.createElement("button");
  root.appendChild(applyButton);
  applyButton.innerText = "Perform Listed Actions";

  applyButton.onclick = () => {
    let src = pageSource;

    msg("Replacing text in Page Source...", "info");

    for (const a of actions) {
      if (a.type === "find-replace") {
        src = src.replaceAll(a.find, a.replace);
      }
    }

    msg("Uploading updated Page Source...", "info");

    (async () => {
      let allgood = true;
      await Promise.all([
        ...actions.flatMap((a) => {
          if (a.type === "upload-file") {
            let corsUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(a.oldUrl)}`;
            if (new URL(a.oldUrl).hostname.endsWith("wikimedia.org"))
              corsUrl = a.oldUrl;
            msg(`Fetching '${a.oldUrl}' via CORS proxy...`, "info");
            return fetch(corsUrl)
              .then((res) => {
                return res.blob();
              })
              .catch((err) => {
                console.error(err);
                msg(`Failed to fetch '${a.oldUrl}'.`, "bad");
                allgood = false;
              })
              .then(async (blob) => {
                msg(`Uploading '${a.oldUrl}' to Wikidot...`, "info");
                if (!blob || !pageId) throw new Error();

                let resizedBlob = blob;
                if (
                  resizedBlob.size > 800_000 &&
                  resizedBlob.type.startsWith("image") &&
                  resizedBlob.type != "image/svg+xml"
                ) {
                  resizedBlob = await popupQueue.enqueue(() =>
                    imageResizePopup(blob),
                  );
                }

                return uploadFile(
                  a.newName,
                  resizedBlob,
                  `Uploaded via auto-localizer script.`,
                  pageId,
                );
              })
              .catch((err) => {
                console.error(err);
                msg(
                  `Failed to upload '${a.oldUrl}' to Wikidot as '${a.newName}'.`,
                  "bad",
                );
                allgood = false;
              })
              .then((res) => {
                if (!res) {
                  return;
                }
                msg(
                  `Successfully uploaded '${a.oldUrl}' to Wikidot as '${a.newName}'`,
                  "good",
                );
              });
          } else {
            return [];
          }
        }),
      ]);
      await setPageSource(window.location.href, src)
        .then(() => {
          msg("Page Source successfully updated!", "good");
        })
        .catch(() => {
          msg("Failed to update text in Page Source.", "bad");
          allgood = false;
        });

      if (allgood) {
        msg(
          `All actions have succeeded! Try force-refreshing the page with Ctrl-Shift-R to see if the new images work.`,
          "good",
        );
      } else {
        msg(
          `Failed to run some actions. Manual uploads and revisions are likely necessary.`,
          "bad",
        );
      }
    })();
  };

  const actionLog = document.createElement("div");
  actionLog.style = `border: 1px solid black;`;
  root.appendChild(actionLog);

  const msg = (m: string, type: "good" | "bad" | "info") => {
    const div = document.createElement("div");
    actionLog.appendChild(div);
    div.innerText = m;
    div.style.color =
      type === "info" ? "#666" : type === "good" ? "#0b0" : "#b00";
  };

  console.log("actions", actions);
})();
