import { throttle } from "r628";

export function defaultThrottle<Params extends any[], Ret>(
  fn: (...params: Params) => Promise<Ret>,
) {
  return throttle(fn, {
    maxConcurrentRequests: 10,
    limits: [{ duration: 5, maxRequests: 20 }],
  });
}

export function fastThrottle<Params extends any[], Ret>(
  fn: (...params: Params) => Promise<Ret>,
) {
  return throttle(fn, {
    maxConcurrentRequests: 20,
    limits: [{ duration: 1, maxRequests: 20 }],
  });
}

async function _asyncRequestModule(module: string, params: any) {
  // return new Promise<any>((resolve, reject) => {
  //   OZONE.ajax.requestModule(module, params, (e) => {
  //     resolve(e);
  //   });
  // });

  return await (
    await fetch("/ajax-module-connector.php", {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: new URLSearchParams({
        moduleName: module,
        ...params,
        callbackIndex: 999999999,
        // @ts-expect-error
        wikidot_token7: OZONE.utils.getCookie("wikidot_token7"),
      }),
    })
  ).json();
}

let idcache = new Map<string, string>();
export const asyncRequestModule = defaultThrottle(_asyncRequestModule);
export const fastAsyncRequestModule = fastThrottle(_asyncRequestModule);

export const getPageId = defaultThrottle(async function (url: string) {
  if (idcache.has(url)) return idcache.get(url);
  let dom: Document;
  if (url === window.location.href) {
    dom = document;
  } else {
    const text = await (await fetch(url)).text();
    dom = new DOMParser().parseFromString(text, "text/html");
  }
  const elems = dom.querySelectorAll("head script");
  for (const s of Array.from(elems) as HTMLElement[]) {
    const pageid = s.innerText.match(/WIKIREQUEST\.info\.pageId\s*\=\s*(\d+)/);
    if (pageid) {
      idcache.set(url, pageid[1]);
      return pageid[1];
    }
  }
});

export async function setPageSource(
  url: string,
  newSource: string,
  newTitle?: string,
  comment?: string,
) {
  const id = await getPageId(url);
  const slug = new URL(url).pathname.slice(1);
  const lock = (await asyncRequestModule("edit/PageEditModule", {
    page_id: id,
    mode: "page",
    wiki_page: slug,
  })) as any;
  if (lock.locked) {
    window.alert(
      "Could not save the page, as it is currently locked and being edited by another user.",
    );
  }
  const dom = new DOMParser().parseFromString(lock.body, "text/html");
  return await asyncRequestModule("Empty", {
    action: "WikiPageAction",
    comments: comment ?? "Saved page.",
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
      newTitle ??
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
