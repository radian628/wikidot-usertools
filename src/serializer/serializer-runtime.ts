import { SerializedResponse } from "./net-request-serialization.js";
import SerializerInject from "./serializer-inject.ts?bpt";

declare let ENTRYPOINT: string;
declare let LOADABLE_FILES: {
  title: string;
  url: string;
}[];
declare let FILES: Record<string, string>;
declare let DELIMSTART: string;
declare let DELIMEND: string;
declare let LINKS_TO: Record<string, string[]>;
declare let NETWORK_REQUESTS_CACHE: [[any, ...any[]], SerializedResponse][];

const netRequestsCacheText = JSON.stringify(NETWORK_REQUESTS_CACHE);
const netReqsCacheBlob = new Blob([netRequestsCacheText], {
  type: "application/json",
});
const netReqsCacheUrl = URL.createObjectURL(netReqsCacheBlob);

async function loadFile(loadurl: string) {
  const linkRegex = new RegExp(
    // @ts-expect-error
    RegExp.escape(DELIMSTART) + "(.*?)" + RegExp.escape(DELIMEND),
    "g"
  );

  const objurls = new Map();

  async function localize(url: string) {
    const linksToThisFile = LINKS_TO[url];
    console.log("links to", url, linksToThisFile);
    await Promise.all(linksToThisFile.map((l) => localize(l)));
    const blob = await (await fetch(FILES[url])).blob();
    if (blob.type === "text/html" || blob.type === "text/css") {
      const oldtext = await blob.text();
      let text = oldtext.replaceAll(linkRegex, (_, r) => objurls.get(r));

      if (blob.type === "text/html") {
        let dom = new DOMParser().parseFromString(text, "text/html");
        const head = dom.querySelector("head");
        const script2 = document.createElement("script");
        script2.innerHTML = SerializerInject;
        head?.prepend(script2);

        const script1 = document.createElement("script");
        script1.innerHTML = `const NETWORK_REQUESTS_CACHE_URL = ${JSON.stringify(
          netReqsCacheUrl
        )}`;
        head?.prepend(script1);

        text =
          (dom.doctype
            ? new XMLSerializer().serializeToString(dom.doctype)
            : "") + dom.documentElement.outerHTML;
      }

      const blob2 = new Blob([text], { type: blob.type });
      objurls.set(url, URL.createObjectURL(blob2));
    } else {
      objurls.set(url, URL.createObjectURL(blob));
    }
  }

  await localize(loadurl);

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "calc(100vh - 100px)";
  iframe.style.position = "absolute";
  iframe.style.top = "100px";
  iframe.style.left = "0";
  iframe.src = objurls.get(loadurl);
  document.body.appendChild(iframe);

  return () => {
    iframe.parentElement?.removeChild(iframe);
    for (const url of objurls.values()) {
      URL.revokeObjectURL(url);
    }
  };
}

(async () => {
  let callback = () => {};

  let menu = document.createElement("div");
  menu.style.display = "flex";
  menu.style.position = "absolute";
  menu.style.width = "100%";
  menu.style.top = "0";
  menu.style.left = "0";
  menu.style.height = "100px";
  document.body.appendChild(menu);
  for (const file of LOADABLE_FILES) {
    const btn = document.createElement("button");
    menu.appendChild(btn);
    btn.innerText = file.title;
    btn.onclick = async () => {
      callback();
      callback = await loadFile(file.url);
    };
  }
  // const unsub = loadFile(ENTRYPOINT);
})();
