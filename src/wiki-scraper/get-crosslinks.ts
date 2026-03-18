import sqlite, { Database } from "bun:sqlite";
import htmlparse, { parse } from "node-html-parser";
import * as fs from "node:fs/promises";
import { PageData } from "./page-parse-tools.js";

const db = new Database("./build/wiki.db", {
  strict: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  LIMIT 100 OFFSET $offset
  `);

type PageLinks<T> = {
  wikiwalk: T;
  licensebox: T;
  other: T;
  breadcrumbs: T;
  moreBy: T;
  wikimodule: T;
  info: T;
};

const ORIGINS = [
  "scpwiki.com",
  "scp-wiki.net",
  "scp-wiki.wikidot.com",
  "www.scpwiki.com",
  "www.scp-wiki.net",
  "www.scp-wiki.wikidot.com",
];

function normalizeLink(base: string, link: string): string | null {
  const url = URL.parse(link, base);
  if (!url) return url;
  if (!ORIGINS.includes(url.host)) return null;
  url.hash = "";
  url.search = "";
  url.protocol = "http:";
  url.host = "scp-wiki.wikidot.com";
  url.pathname = url.pathname.split("/").slice(0, 2).join("/");
  return url.toString();
}

function normalizeLinks(base: string, links: string[]): Set<string> {
  return new Set(
    links.flatMap((l) => {
      const link = normalizeLink(base, l);
      if (link) return [link];
      return [];
    }),
  );
}

// function getOtherLinks(element: htmlparse.HTMLElement): string[] {
//   if (
//     // exclude wikiwalk
//     element.classList.contains("footer-wikiwalk-nav") ||
//     // exclude licensebox
//     element.classList.contains("licensebox") ||
//     // exclude component:wikimodule
//     element.querySelector(
//       "> .collapsible-block-folded > .collapsible-block-link",
//     )?.innerText === `More From This Author`
//   ) {
//     return [];
//   }

//   if (element.tagName === "A") {
//     const href = element.getAttribute("href");
//     if (href) return [href];
//     return [];
//   }

//   return [...element.children].flatMap((e) => getOtherLinks(e));
// }

// function getWikiwalkLinks(element: htmlparse.HTMLElement): string[] {
//   return [...element.querySelectorAll(".footer-wikiwalk-nav a")]
//     .map((a) => a.getAttribute("href"))
//     .filter((e) => e) as string[];
// }

// function getLicenseboxLinks(element: htmlparse.HTMLElement): string[] {
//   return [...element.querySelectorAll(".licensebox a")]
//     .map((a) => a.getAttribute("href"))
//     .filter((e) => e) as string[];
// }

// function getBreadcrumbsLinks(element: htmlparse.HTMLElement): string[] {
//   return [...element.querySelectorAll("#breadcrumbs a")]
//     .map((a) => a.getAttribute("href"))
//     .filter((e) => e) as string[];
// }

const NO_LINKS: PageLinks<[]> = {
  wikiwalk: [],
  other: [],
  licensebox: [],
  breadcrumbs: [],
  moreBy: [],
  wikimodule: [],
  info: [],
};

function combineLinks<T>(links: PageLinks<T[]>[]): PageLinks<T[]> {
  return links.reduce(
    (p, c) => ({
      wikiwalk: p.wikiwalk.concat(c.wikiwalk),
      other: p.other.concat(c.other),
      licensebox: p.licensebox.concat(c.licensebox),
      breadcrumbs: p.breadcrumbs.concat(c.breadcrumbs),
      moreBy: p.moreBy.concat(c.moreBy),
      wikimodule: p.wikimodule.concat(c.wikimodule),
      info: p.info.concat(c.info),
    }),
    NO_LINKS as PageLinks<T[]>,
  );
}

type GetRawLinksCtx = {
  type:
    | "other"
    | "wikiwalk"
    | "licensebox"
    | "breadcrumbs"
    | "wikimodule"
    | "moreBy"
    | "info";
};

function getRawLinksFromChildren(
  e: htmlparse.HTMLElement,
  ctx: GetRawLinksCtx,
): PageLinks<string[]> {
  return combineLinks(
    [...e.children].flatMap((c) => getRawLinksFromElem(c, ctx)),
  );
}

function isCollapsibleWithTexts(
  e: htmlparse.HTMLElement,
  targetTexts: string[],
) {
  if (!e.classList.contains("collapsible-block")) return false;
  const text = e.querySelector(
    "> .collapsible-block-folded > .collapsible-block-link",
  )?.innerText;
  if (!text) return false;
  return targetTexts.includes(text.replaceAll(/\s+|\&nbsp\;/g, " "));
}

function getRawLinksFromElem(
  e: htmlparse.HTMLElement,
  ctx: GetRawLinksCtx,
): PageLinks<string[]> {
  if (e.classList.contains("footer-wikiwalk-nav")) {
    return getRawLinksFromChildren(e, { type: "wikiwalk" });
  }

  if (e.classList.contains("licensebox")) {
    return getRawLinksFromChildren(e, { type: "licensebox" });
  }

  if (e.id === "breadcrumbs" || e.classList.contains(".pseudocrumbs")) {
    return getRawLinksFromChildren(e, { type: "breadcrumbs" });
  }

  if (
    e.classList.contains("collection") &&
    e
      .querySelector(
        "> .collapsible-block > .collapsible-block-folded > .collapsible-block-link",
      )
      ?.innerText?.replaceAll(/\s+|\&nbsp\;/g, " ") === "More From This Author"
  ) {
    return getRawLinksFromChildren(e, { type: "wikimodule" });
  }

  if (
    e.classList.contains("info-container") ||
    e.classList.contains("creditRate")
  ) {
    return getRawLinksFromChildren(e, { type: "info" });
  }

  if (
    isCollapsibleWithTexts(e, [
      // https://scp-wiki.wikidot.com/more-by:billith
      "a billith affair",
      // https://scp-wiki.wikidot.com/more-by:calibold
      "+ More by Calibold +",
      // https://scp-wiki.wikidot.com/more-by:lordxvnv
      "More by LORDXVNV",
      // https://scp-wiki.wikidot.com/more-by:notgull
      "More by notgull",
      // https://scp-wiki.wikidot.com/more-by:weizhong
      "+ More articles by weizhong",
      "+ All Tales by weizhong",
      "+ GOI formats by weizhong",
      "+ All coauthored articles featuring weizhong",
      // https://scp-wiki.wikidot.com/more-by:tstaffor
      "□ More by Tstaffor □",
    ])
  ) {
    return getRawLinksFromChildren(e, { type: "moreBy" });
  }

  /* not accounted for
  just links to author pages:
  https://scp-wiki.wikidot.com/more-by:a-random-day 
  https://scp-wiki.wikidot.com/more-by:croquembouche
  https://scp-wiki.wikidot.com/more-by:mortos
  https://scp-wiki.wikidot.com/more-by:qntm

  not in collapsible:
  https://scp-wiki.wikidot.com/more-by:deadly-bread
  https://scp-wiki.wikidot.com/more-by:lt-flops
  https://scp-wiki.wikidot.com/more-by:placeholder-mcd
  https://scp-wiki.wikidot.com/more-by:s-d-locke

  bro it literally just links to his twitter lmao:
  https://scp-wiki.wikidot.com/more-by:rounderhouse
  */

  if (e.tagName === "A") {
    const href = e.getAttribute("href");
    return {
      ...NO_LINKS,
      [ctx.type]: href ? [href] : [],
    };
  }

  return getRawLinksFromChildren(e, ctx);
}

function getTags(dom: htmlparse.HTMLElement) {
  return [...dom.querySelectorAll("#main-content > .page-tags a")].map(
    (e) => e.innerText,
  );
}

function getRawLinks(dom: htmlparse.HTMLElement): PageLinks<string[]> {
  const pagecontent = dom.querySelector("#page-content");
  if (!pagecontent) {
    return NO_LINKS;
  }

  return getRawLinksFromElem(pagecontent, { type: "other" });

  // return {
  //   wikiwalk: getWikiwalkLinks(pagecontent),
  //   other: getOtherLinks(pagecontent),
  //   licensebox: getLicenseboxLinks(pagecontent),
  //   breadcrumbs: getBreadcrumbsLinks(dom),
  // };
}

function getRating(dom: htmlparse.HTMLElement) {
  const ratingElem = dom.querySelector("#pagerate-button span");

  if (ratingElem) {
    return Number(ratingElem.innerText);
  } else {
    return null;
  }
}

function getLinks(
  urlbase: string,
  str: string,
): PageLinks<Set<string>> & {
  url: string;
  tags: string[];
  isNonHubFiction: boolean;
  isNonHubNonfiction: boolean;
  ratingRaw: number | null;
  rating: number;
} {
  const dom = parse(str);
  const links = getRawLinks(dom);
  const tags = getTags(dom);
  const rating = getRating(dom);
  return {
    wikiwalk: normalizeLinks(urlbase, links.wikiwalk),
    other: normalizeLinks(urlbase, links.other),
    licensebox: normalizeLinks(urlbase, links.licensebox),
    breadcrumbs: normalizeLinks(
      urlbase,
      links.breadcrumbs.concat(
        [
          ...dom
            .querySelectorAll("#breadcrumbs a")
            .map((a) => a.getAttribute("href")),
        ].filter((a) => a) as string[],
      ),
    ),
    moreBy: normalizeLinks(urlbase, links.moreBy),
    wikimodule: normalizeLinks(urlbase, links.wikimodule),
    info: normalizeLinks(urlbase, links.info),
    url: urlbase,
    tags,
    isNonHubFiction:
      tags.includes("scp") ||
      tags.includes("tale") ||
      tags.includes("goi-format") ||
      tags.includes("supplement") ||
      (tags.includes("site") && !tags.includes("hub")),
    isNonHubNonfiction: tags.includes("guide") || tags.includes("essay"),
    ratingRaw: rating,
    rating: rating ?? 0,
  };
}

const out: any[] = [];

async function streamFullDb(
  atMost: number,
  callback: (data: PageData[number]) => void,
) {
  let offset = 0;

  while (true) {
    console.log(`${((offset / atMost) * 100).toFixed(3)}% Done!`);
    const entries = getAll.all({ offset }) as PageData;

    for (const e of entries) callback(e);

    if (entries.length < 100 || offset > (atMost ?? Infinity)) {
      return;
    }
    offset += 100;
  }
}

const getCount = db.query(`
SELECT COUNT(*) FROM articles  
`);

function getPageCount() {
  return (getCount.all()[0] as any)["COUNT(*)"] as number;
}

const COUNT = getPageCount();

await streamFullDb(COUNT, (d) => {
  out.push(getLinks(d.url, d.html));
});

await fs.writeFile(
  "./build/crosslinksv3.json",
  JSON.stringify(out, (a, e) => (e instanceof Set ? Array.from(e) : e), 2),
);
