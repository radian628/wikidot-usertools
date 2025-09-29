import sqlite, { Database } from "bun:sqlite";
import htmlparse, { parse } from "node-html-parser";
import * as fs from "node:fs/promises";

const db = new Database("./build/wiki.db", {
  strict: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  `);

type PageLinks<T> = {
  wikiwalk: T;
  licensebox: T;
  other: T;
  breadcrumbs: T;
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
    })
  );
}

function getOtherLinks(element: htmlparse.HTMLElement): string[] {
  if (
    element.classList.contains("footer-wikiwalk-nav") ||
    element.classList.contains("licensebox")
  ) {
    return [];
  }

  if (element.tagName === "A") {
    const href = element.getAttribute("href");
    if (href) return [href];
    return [];
  }

  return [...element.children].flatMap((e) => getOtherLinks(e));
}

function getWikiwalkLinks(element: htmlparse.HTMLElement): string[] {
  return [...element.querySelectorAll(".footer-wikiwalk-nav a")]
    .map((a) => a.getAttribute("href"))
    .filter((e) => e) as string[];
}

function getLicenseboxLinks(element: htmlparse.HTMLElement): string[] {
  return [...element.querySelectorAll(".licensebox a")]
    .map((a) => a.getAttribute("href"))
    .filter((e) => e) as string[];
}

function getBreadcrumbsLinks(element: htmlparse.HTMLElement): string[] {
  return [...element.querySelectorAll("#breadcrumbs a")]
    .map((a) => a.getAttribute("href"))
    .filter((e) => e) as string[];
}

function getRawLinks(str: string): PageLinks<string[]> {
  const dom = parse(str);
  const pagecontent = dom.querySelector("#page-content");
  if (!pagecontent) {
    return { wikiwalk: [], other: [], licensebox: [], breadcrumbs: [] };
  }

  return {
    wikiwalk: getWikiwalkLinks(pagecontent),
    other: getOtherLinks(pagecontent),
    licensebox: getLicenseboxLinks(pagecontent),
    breadcrumbs: getBreadcrumbsLinks(dom),
  };
}

function getLinks(
  urlbase: string,
  str: string
): PageLinks<Set<string>> & { url: string } {
  const links = getRawLinks(str);
  return {
    wikiwalk: normalizeLinks(urlbase, links.wikiwalk),
    other: normalizeLinks(urlbase, links.other),
    licensebox: normalizeLinks(urlbase, links.licensebox),
    breadcrumbs: normalizeLinks(urlbase, links.breadcrumbs),
    url: urlbase,
  };
}

const out: any[] = [];

(async () => {
  const data = getAll.all();
  let i = 0;
  for (const d of data) {
    // @ts-expect-error
    out.push(getLinks(d.url, d.html));

    console.log(i++);
  }

  fs.writeFile(
    "./build/crosslinksv2.json",
    JSON.stringify(out, (a, e) => (e instanceof Set ? Array.from(e) : e))
  );
})();
