/*!
// ==UserScript==
// @name        Wikidot DevOps 
// @namespace   Violentmonkey Scripts
// @grant       none
// @match       *://*.wikidot.com/*
// @version     1.0.1
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import { waitForCond } from "r628";
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

const DEVOPS_ENTRY_POINT_DIRECTIVE = /\[\!\-\-devops:(.*?)\-\-\]/;

const HTTPUrl = z.url();
const WebsocketUrl = z.url({ protocol: /^wss?$/ });

const WikidotDevOpsManifest = z.array(
  z.object({
    pageSlug: z.string(),
    sourceTextUrl: HTTPUrl,
    fileAttachmentNamesUrl: HTTPUrl,
    filesBaseUrl: HTTPUrl,
    metadataUrl: HTTPUrl,
    changesUrl: WebsocketUrl,
  })
);

const WikidotDevOpsMetadata = z.object({
  tags: z.optional(z.array(z.string())),
  parentSlug: z.optional(z.string()),
  title: z.string(),
});

const WikidotDevOpsChange = z.union([
  z.object({
    type: z.literal("full-refresh"),
  }),
]);

const WikidotFileAttachmentNames = z.array(z.string());

function getCSSModuleStyles(e: HTMLElement) {
  return e.querySelectorAll("#internal-style ~ style");
}

async function fetchAndValidateJson<T>(endpoint: string, parser: z.ZodType<T>) {
  const jsonData = await (await fetch(endpoint)).json();
  return parser.parse(jsonData);
}
(async () => {
  await waitForCond(() => window.OZONE, 100);

  console.log("file ids", await getFileIds(WIKIREQUEST.info.pageId));

  const db = await idb.openDB(
    `wikidot-devops-cache-${window.location.pathname}`,
    1,
    {
      upgrade(db) {
        db.createObjectStore("files");
        db.createObjectStore("strings");
      },
    }
  );
  const source = await getPageSource(window.location.href);

  async function fetchAndCompareFile(url: string): Promise<{
    file: Blob;
    needsUpdating: boolean;
  }> {
    const [localFile, remoteFile] = await Promise.all([
      db.get("files", url),
      fetch(url).then((r) => r.blob()),
    ]);
    await db.put("files", remoteFile, url);
    return {
      file: remoteFile,
      needsUpdating:
        !(localFile instanceof Blob) ||
        !compareBytes(
          new Uint8Array(await localFile.arrayBuffer()),
          new Uint8Array(await remoteFile.arrayBuffer())
        ),
    };
  }

  async function fetchAndCompareString(url: string) {
    const [localString, remoteString] = await Promise.all([
      db.get("strings", url),
      fetch(url).then((r) => r.text()),
    ]);
    await db.put("strings", remoteString, url);
    return {
      string: remoteString,
      needsUpdating: localString !== remoteString,
    };
  }

  async function fetchAndCompareJsonString<T>(
    url: string,
    parser: z.ZodType<T>
  ) {
    const [localString, remoteString] = await Promise.all([
      db.get("strings", url),
      fetch(url).then((r) => r.text()),
    ]);
    await db.put("strings", remoteString, url);
    return {
      json: parser.parse(JSON.parse(remoteString)),
      needsUpdating: localString !== remoteString,
    };
  }

  const devops = source.match(DEVOPS_ENTRY_POINT_DIRECTIVE);

  if (!devops) return;

  const DEVOPS_STORAGE_ITEM =
    "r628-wd-devops-enabled-" + window.location.pathname;

  if (!localStorage.getItem(DEVOPS_STORAGE_ITEM)) {
    console.warn(
      `DevOps directive present but ignored, as DevOps has not explicitly been enabled on this page. To enable it for this page, define the "${DEVOPS_STORAGE_ITEM}" localStorage item.`
    );
    return;
  }

  const devopsUrl = devops[1];

  const devOpsManifest = await fetchAndValidateJson(
    devopsUrl,
    WikidotDevOpsManifest
  );

  async function onTryChange() {
    let changed = false;

    let filesChanged = false;
    let metadataChanged = false;
    let sourceTextChanged = false;

    await Promise.all(
      devOpsManifest.map(async (d) => {
        const pageUrl = window.location.origin + "/" + d.pageSlug;
        const pageid: string = (await getPageId(pageUrl)) as string;
        return await Promise.all([
          (async () => {
            const filesList = await fetchAndValidateJson(
              d.fileAttachmentNamesUrl,
              WikidotFileAttachmentNames
            );
            await Promise.all(
              filesList.map(async (f) => {
                const fileUrl = `${d.filesBaseUrl.replace(/\/*$/g, "")}/${f}`;
                const { file, needsUpdating } =
                  await fetchAndCompareFile(fileUrl);
                if (needsUpdating) {
                  changed = true;
                  filesChanged = true;
                  console.log("Updating file", f);
                  await replaceFile(f, file, pageid);
                }
              })
            );
          })(),
          (async () => {
            const sourceText = await fetchAndCompareString(d.sourceTextUrl);
            const metadata = await fetchAndCompareJsonString(
              d.metadataUrl,
              WikidotDevOpsMetadata
            );

            if (metadata.needsUpdating) metadataChanged = true;
            if (sourceText.needsUpdating) sourceTextChanged = true;

            if (sourceText.needsUpdating || metadata.needsUpdating) {
              console.log("Updating source text or title.");
              changed = true;
              await setPageSource(
                pageUrl,
                sourceText.string,
                metadata.json.title
              );
            }

            if (metadata.needsUpdating) {
              console.log("Updating metadata.");
              changed = true;
              await Promise.all([
                asyncRequestModule("Empty", {
                  pageId: pageid,
                  tags: (metadata.json.tags ?? [])?.join(" "),
                  action: "WikiPageAction",
                  event: "saveTags",
                }),
                metadata.json.parentSlug !== undefined
                  ? asyncRequestModule("Empty", {
                      pageId: pageid,
                      parentName: metadata.json.parentSlug,
                      action: "WikiPageAction",
                      event: "setParentPage",
                    })
                  : Promise.resolve(),
              ]);
            }
          })(),
        ]);
      })
    );

    if (changed) {
      // special case for hot-reloading #page-content and styles
      if (sourceTextChanged && !metadataChanged && !filesChanged) {
        const html = await (await fetch(window.location.href)).text();
        const dom = new DOMParser().parseFromString(html, "text/html");
        const pageContent = document.getElementById("page-content");

        if (pageContent) {
          const replacementPageContent = dom.getElementById("page-content");
          if (replacementPageContent) {
            pageContent?.parentElement?.replaceChild(
              replacementPageContent,
              pageContent
            );
          }
        }

        const styles = getCSSModuleStyles(document.head);
        for (const s of Array.from(styles)) s.parentElement?.removeChild(s);

        for (const s of Array.from(getCSSModuleStyles(dom.head))) {
          document.head.appendChild(s);
        }

        for (const s of Array.from(document.querySelectorAll("head style"))) {
          s.innerHTML = s.innerHTML + `/*${Math.random()}*/`;
        }
      } else {
        window.location.reload();
      }
    }
  }

  onTryChange();

  const changeListeners = new Set(devOpsManifest.map((d) => d.changesUrl));

  for (const c of changeListeners) {
    const socket = new WebSocket(c);
    socket.addEventListener("message", () => {
      onTryChange();
    });
  }
})();
