import postcss from "postcss";
import * as valueParser from "postcss-value-parser";
import { BatchInterceptor } from "@mswjs/interceptors";
import { XMLHttpRequestInterceptor } from "@mswjs/interceptors/XMLHttpRequest";
import { FetchInterceptor } from "@mswjs/interceptors/fetch";
import { ArrayMap, workerifyClientIframe, workerifyServerIframe } from "r628";
import SerializerRuntime from "./serializer-runtime.ts?bpt";
import { networkInterfaces } from "os";
import {
  defaultCacheHttpRequest,
  SerializedResponse,
} from "./net-request-serialization.js";

/*!
// ==UserScript==
// @name        Serializer 
// @grant       none
// @version     1.0
// @author      radian628
// @description serialize and archive webpages 
// ==/UserScript==
*/

function tryJsonParse(str: string) {
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (err) {
    return undefined;
  }
}
// @ts-expect-error
window.makeFileBundleHTML = async function (
  corsify: (str: string) => string,
  files: string[]
) {
  let fileCache = new Map<string, string>();
  let linksToCache = new Map<string, Set<string>>();
  let netReqCache = new ArrayMap<any, SerializedResponse>();

  function normalizeUrl(url: string, base?: string) {
    const parsedURL = URL.parse(url, base);
    if (!parsedURL) return "";

    if (parsedURL.protocol === "http:") parsedURL.protocol = "https:";
    if (parsedURL.hash) parsedURL.hash = "";

    return parsedURL.toString();
  }

  const linkDelimStart = "LINKSTART{{{{{{{{{{";
  const linkDelimEnd = "}}}}}}}}}}LINKEND";

  files = files.map((f) => normalizeUrl(f));

  await Promise.all(
    files.map(async (f) => {
      await makeFileBundle(
        f,
        undefined,
        {
          networkRequestsCache: netReqCache,
          corsify,
          normalizeUrl,
          fileCache,
          linkDelimStart,
          linkDelimEnd,
          alreadyCachedList: new Set(),
          linksToCache,
          cacheHttpRequest: defaultCacheHttpRequest,
        },
        5,
        "text/html"
      );
    })
  );

  const json = JSON.stringify(Object.fromEntries(fileCache.entries()));

  return `
<!DOCTYPE html>
<html>
  <head></head>
  <body>
  <script>
    const ENTRYPOINT = ${JSON.stringify(files[0])}
    const FILES = ${json};
    const LOADABLE_FILES = ${JSON.stringify(
      files.map((f) => ({ title: f, url: f }))
    )}
    const DELIMSTART = ${JSON.stringify(linkDelimStart)};
    const DELIMEND = ${JSON.stringify(linkDelimEnd)};
    const LINKS_TO = ${JSON.stringify(
      Object.fromEntries(
        linksToCache.entries().map(([k, v]) => [k, Array.from(v)] as const)
      )
    )}
    const NETWORK_REQUESTS_CACHE = ${JSON.stringify(netReqCache.serialize())}
  </script>
  <script>
    ${SerializerRuntime}
  </script>
  </body>
</html> 
  
  `;
};

type BundleContext = {
  corsify: (str: string) => string;
  normalizeUrl: (url: string, base?: string) => string;
  cacheHttpRequest: (request: Request) => Promise<[any, ...any[]]>;
  fileCache: Map<string, string>;
  linksToCache: Map<string, Set<string>>;
  linkDelimStart: string;
  linkDelimEnd: string;
  alreadyCachedList: Set<string>;
  networkRequestsCache: ArrayMap<any, SerializedResponse>;
};

function blobToBase64Url(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}

function textToBase64(text: string, type: string) {
  return blobToBase64Url(new Blob([text], { type }));
}

async function makeFileBundle(
  originalurl: string,
  prevurl: string | undefined,
  ctx: BundleContext,
  depthRemaining: number,
  overrideContentType?: string
) {
  if (depthRemaining === 0) return;
  originalurl = ctx.normalizeUrl(originalurl, prevurl);
  if (ctx.alreadyCachedList.has(originalurl)) return;
  ctx.alreadyCachedList.add(originalurl);
  ctx.linksToCache.set(originalurl, new Set());

  try {
    function makeLinkPlaceholder(link: string) {
      const n = ctx.normalizeUrl(link, originalurl);
      ctx.linksToCache.get(originalurl)!.add(n);
      return ctx.linkDelimStart + n + ctx.linkDelimEnd;
    }

    function handleCSSValue(stringvalue: string, links: string[]) {
      const value = valueParser.default(stringvalue);
      console.log("css value", value);
      value.walk((n) => {
        if (n.type === "function" && n.value === "url") {
          for (const urlParam of n.nodes) {
            if (urlParam.type === "string" || urlParam.type === "word") {
              links.push(urlParam.value);
              urlParam.value = makeLinkPlaceholder(urlParam.value);
            }
          }
        }
      });

      return valueParser.stringify(value.nodes);
    }

    function handleCSS(text: string, links: string[]): string {
      const parsed = postcss.parse(text);
      console.log(parsed);
      parsed.walk((node) => {
        if (node.type === "decl") {
          const value = valueParser.default(node.value);
          console.log(value);
          node.value = handleCSSValue(node.value, links);
        } else if (node.type === "atrule") {
          node.params = handleCSSValue(node.params, links);
        }
      });

      return parsed.toString();
    }

    ctx.fileCache.set(
      originalurl,
      await (async (): Promise<string> => {
        const url =
          originalurl.startsWith("data:") || originalurl.startsWith("blob:")
            ? originalurl
            : ctx.corsify(originalurl);
        const blob = await (
          await fetch(url, {
            credentials: "omit",
          })
        ).blob();

        let contentType = overrideContentType ?? blob.type;
        if (originalurl.endsWith(".css")) contentType = "text/css";
        console.log(contentType);
        const links: string[] = [];
        if (contentType === "text/html") {
          const text = await blob.text();
          const dom = new DOMParser().parseFromString(text, "text/html");
          console.log("dom", dom);
          const linkElements = dom.querySelectorAll("link");
          for (const l of Array.from(linkElements)) {
            if (l.rel === "stylesheet") {
              links.push(l.href);
              l.href = makeLinkPlaceholder(l.href);
            }
          }

          const styleElements = dom.querySelectorAll("style");
          for (const s of Array.from(styleElements)) {
            s.innerHTML = handleCSS(s.innerHTML, links);
          }

          const scriptElements = dom.querySelectorAll("script");
          for (const s of Array.from(scriptElements)) {
            if (s.src) {
              links.push(s.src);
              s.src = makeLinkPlaceholder(s.src);
            }
          }

          const imageElements = dom.querySelectorAll("img");
          for (const i of Array.from(imageElements)) {
            if (i.src) {
              links.push(i.src);
              i.src = makeLinkPlaceholder(i.src);
            }
          }

          let reqs = sniffRequests(originalurl);

          await Promise.all([
            ...links.map((l) =>
              makeFileBundle(l, originalurl, ctx, depthRemaining - 1)
            ),
          ]);

          for (const req of await reqs) {
            const r = new Request(req.url, {
              body: req.body,
              headers: req.headers,
              method: req.method,
            });
            ctx.networkRequestsCache.set(
              await ctx.cacheHttpRequest(r),
              req.response
            );
          }

          return textToBase64(
            (dom.doctype
              ? new XMLSerializer().serializeToString(dom.doctype)
              : "") + dom.documentElement.outerHTML,
            contentType
          );
        } else if (contentType === "text/css") {
          const css = handleCSS(await blob.text(), links);
          await Promise.all(
            links.map((l) =>
              makeFileBundle(l, originalurl, ctx, depthRemaining - 1)
            )
          );
          return textToBase64(css, "text/css");
        } else {
          const b64 = await blobToBase64Url(blob);
          return b64;
        }
      })()
    );
  } catch (e) {
    console.error("caught", e);
  }
}

const interceptor = new BatchInterceptor({
  name: "interceptor",
  interceptors: [new XMLHttpRequestInterceptor(), new FetchInterceptor()],
});

interceptor.apply();

const requests: {
  url: string;
  body?: Uint8Array;
  headers: ReturnType<Headers["toJSON"]>;
  method: string;
  response: SerializedResponse;
}[] = [];

interceptor.on("response", async ({ request, response }) => {
  if (window.parent !== window)
    console.log(
      "interceptor received request",
      request,
      "title",
      document.title
    );

  const responseBody = await blobToBase64Url(await response.blob());

  requests.push({
    url: request.url,
    body: (await request.body?.getReader().read())?.value,
    method: request.method,
    headers:
      typeof request.headers.toJSON === "function"
        ? request.headers.toJSON()
        : {},
    response: {
      status: response.status,
      body: responseBody,
      headers:
        typeof request.headers.toJSON === "function"
          ? request.headers.toJSON()
          : {},
    },
  });
});

const networkSnifferInterface = {
  getRequests() {
    return requests;
  },
};

window.addEventListener("load", () => {
  if (window.parent !== window) {
    const server = workerifyServerIframe(
      "sniffer",
      networkSnifferInterface,
      window.parent
    );
  } else {
  }
});

function sniffRequests(url: string) {
  return new Promise<typeof requests>((resolve, reject) => {
    const snifftest = document.createElement("iframe");
    snifftest.style.userSelect = "none";
    snifftest.style.opacity = "0";
    snifftest.style.pointerEvents = "none";
    snifftest.style.position = "fixed";

    // @ts-expect-error
    snifftest.credentialless = "true";
    document.body.prepend(snifftest);
    snifftest.addEventListener("load", async () => {
      setTimeout(async () => {
        console.log("a");
        if (!snifftest.contentWindow) return;
        console.log("b");
        const sniffer = workerifyClientIframe<typeof networkSnifferInterface>(
          "sniffer",
          snifftest.contentWindow
        );
        const requests = await sniffer.getRequests();
        resolve(requests);
        snifftest.parentElement?.removeChild(snifftest);
      }, 1000);
    });
    snifftest.src = url;
  });
}
