/*!
// ==UserScript==
// @name        Wikidot Automatic HTTP File Uploads 
// @namespace   Violentmonkey Scripts
// @grant       none
// @match *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import { registerStorageItem, waitForCond } from "r628";
import { getPageSource } from "../common/wikidot-api-utils.js";

const AUTOHTTP_DIRECTIVE = /\!\!\!AUTOHTTP (\S+) (\S+)\!\!\!/g;
const BUILDPOLL_DIRECTIVE = /\!\!\!AUTOHTTP_BUILDPOLL (\S+)\!\!\!/g;

function uploadFile(name: string, file: Blob, comments: string) {
  const formdata = new FormData();
  formdata.append("action", "FileAction");
  formdata.append("event", "uploadFile");
  formdata.append("page_id", WIKIREQUEST.info.pageId);
  formdata.append("MAX_FILE_SIZE", "209715200");
  formdata.append("userfile", file);
  formdata.append("dfilename", name);
  formdata.append("comments", comments);
  return fetch(window.location.origin + "/default--flow/files__UploadTarget", {
    method: "post",
    body: formdata,
  });
}

const requestModuleAsync = async (str: string, payload: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    return OZONE.ajax.requestModule(str, payload, (result) => {
      resolve(result);
    });
  });
};

async function getFiles() {
  const table = await requestModuleAsync("files/PageFilesModule", {
    page_id: WIKIREQUEST.info.pageId,
  });
  const dom = new DOMParser().parseFromString(table.body, "text/html");

  let idmap = new Map();

  for (const row of Array.from(dom.querySelectorAll("tbody tr"))) {
    const filename = row.children[0].querySelector("a")!.innerText;
    const id = row.id.match(/\d+$/g)![0];
    idmap.set(filename, id);
  }

  return { ids: idmap };
}

async function deleteFile(id: string) {
  await requestModuleAsync("Empty", {
    file_id: id,
    action: "FileAction",
    event: "deleteFile",
  });
}

async function replaceFile(name: string, file: Blob) {
  const { ids } = await getFiles();
  const id = ids.get(name);
  if (id) {
    await deleteFile(id);
  }
  await uploadFile(name, file, "");
}

function compareBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getFileLink(filename: string) {
  return (
    window.location.origin +
    "/local--files/" +
    window.location.pathname.split("/")[1] +
    "/" +
    filename
  );
}

const autohttpLocalStorage = registerStorageItem<Record<string, boolean>>(
  "autohttp-enabled",
  {}
);

async function attemptFileRefetch(
  cache: Cache,
  source: string,
  directives: RegExpMatchArray[]
) {
  const results = await Promise.all(
    Array.from(directives).map(async ([_, link, filename]) => {
      console.log(`Found file '${filename}' to be served from '${link}'.`);

      const req = new Request(link);
      const reqFromWikidot = new Request(getFileLink(filename));
      let hadToGetFromWikidot = false;
      const [localFile, wikidotFile] = await Promise.all([
        await (await fetch(req)).bytes(),
        await (await cache.match(req))?.bytes(),
      ]);

      console.log(`Fetched '${filename}' from local cache.`);

      // file is already up-to-date; nothing is to be done
      if (wikidotFile && compareBytes(localFile, wikidotFile)) {
        console.log(
          `Current version of '${filename}' is up-to-date; no update needed.`
        );
        return false;
      }

      console.log(
        `Current version of '${filename}' is outdated! Reuploading...`
      );

      // reupload file + update cache
      await Promise.all([
        cache.put(req, new Response(localFile)),
        replaceFile(filename, new Blob([localFile])),
      ]);

      console.log(`Reuploaded '${filename}' to Wikidot.`);

      return true;
    })
  );

  if (results.some((e) => e)) {
    console.log(`Files uploaded; refreshing...`);
    window.location.reload();
  }
}

(async () => {
  await waitForCond(() => window.OZONE, 100);

  const [cache, source] = [
    await caches.open("wikidot-autohttp"),
    await getPageSource(window.location.href),
  ];

  const directives = Array.from(source.matchAll(AUTOHTTP_DIRECTIVE));
  const buildpoll = Array.from(source.matchAll(BUILDPOLL_DIRECTIVE));
  let buildpollMap = new Map<string, string>();

  const autohttpEnabled = autohttpLocalStorage.get()[window.location.href];

  if (directives.length > 0 || buildpoll.length > 0) {
    const btn = document.createElement("button");
    btn.innerText = autohttpEnabled
      ? "Disable AutoHTTP"
      : "AutoHTTP Directives Found! Enable AutoHTTP for this page?";
    btn.onclick = () => {
      autohttpLocalStorage.set({
        ...autohttpLocalStorage.get(),
        [window.location.href]: !autohttpEnabled,
      });
      window.location.reload();
    };
    btn.style = `position: fixed; bottom: 0; left: 0;`;
    document.body.appendChild(btn);
  } else {
    console.log("No AutoHTTP directives detected.");
    return;
  }
  if (!autohttpEnabled) {
    console.log("AutoHTTP disabled for this page.");
    return;
  }

  console.log("AutoHTTP enabled for this page.");

  await attemptFileRefetch(cache, source, directives);

  // poll to see if any new versions of files are here
  async function pollBuildVersions() {
    for (const [_, link] of buildpoll) {
      const res = await (await fetch(link)).text();

      // if we found a new version whilst build polling, refresh automatically
      if (buildpollMap.get(link) && buildpollMap.get(link) !== res) {
        await attemptFileRefetch(cache, source, directives);
      }
      buildpollMap.set(link, res);
    }

    setTimeout(pollBuildVersions, 300);
  }

  pollBuildVersions();
})();
