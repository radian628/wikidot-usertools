import { throttle } from "r628";

export function defaultThrottle(fn: Parameters<typeof throttle>[0]) {
  return throttle(fn, {
    maxConcurrentRequests: 5,
    limits: [{ duration: 5, maxRequests: 10 }],
  });
}
function _asyncRequestModule(module: string, params: any) {
  return new Promise<any>((resolve, reject) => {
    window.OZONE.ajax.requestModule(module, params, (e) => {
      resolve(e);
    });
  });
}

let idcache = new Map<string, string>();
export const asyncRequestModule = defaultThrottle(_asyncRequestModule);

export const getPageId = defaultThrottle(async function (url: string) {
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

export async function setPageSource(url: string, newSource: string) {
  const id = await getPageId(url);
  const slug = new URL(url).pathname.slice(1);
  const lock = (await asyncRequestModule("edit/PageEditModule", {
    page_id: id,
    mode: "page",
    wiki_page: slug,
  })) as any;
  if (lock.locked) {
    window.alert(
      "Could not save the page, as it is currently locked and being edited by another user."
    );
  }
  const dom = new DOMParser().parseFromString(lock.body, "text/html");
  await asyncRequestModule("Empty", {
    action: "WikiPageAction",
    comments: "Saved page.",
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
