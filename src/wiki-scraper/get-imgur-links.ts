import { Database } from "bun:sqlite";
import { parse } from "node-html-parser";
import * as fs from "node:fs/promises";
import { getPageCount, streamFullDb } from "./page-parse-tools.js";

const db = new Database("./build/wiki.db", {
  strict: true,
  readonly: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  `);

// let imgurs: string[] = [];

const HOSTNAMES = [
  "scpwiki.com",
  "scp-wiki.net",
  "scp-wiki.wikidot.com",
  "www.scpwiki.com",
  "www.scp-wiki.net",
  "www.scp-wiki.wikidot.com",
  "www.wikidot.com",
  "cdn.scpwiki.com",
];

HOSTNAMES.push(...HOSTNAMES.map((o) => o.replaceAll("wikidot", "wdfiles")));

const MANUAL_EXCLUSION_PREFIXES = [
  "https://api.crom.avn.sh/pixel",
  "https://o5command-int.wdfiles.com/local--files/tech-team:graphic-templates",
  "https://scp-int.wdfiles.com/local--files/main",
  "https://wanderers-library.wdfiles.com/local--files/component%3Atheme/wl_logo.png",
  "https://scp-wiki-de.wdfiles.com/local--files/scp-foundation-in-deutschland-portal/scp-logo-dach-400.png",
];

// const BAD_URL_CSS = /url(http://)/

const badHosts: Record<
  string,
  {
    nonSCPWikiWikidotLinks: Set<string>;
    nonWikidotLinks: Set<string>;
    authors: string[];
  }
> = {};

const authorData = JSON.parse(
  (await fs.readFile("./output/page-authors.json")).toString(),
);

// maps URLs to author names
let attributions = new Map<string, string[]>();

for (const article of authorData) {
  attributions.set(
    article.url,
    article.attributions.map((a: any) => a.user.displayName.toLowerCase()),
  );
}

function initBadHost(page: { html: string; url: string }) {
  if (badHosts[page.url]) return;
  badHosts[page.url] = {
    nonSCPWikiWikidotLinks: new Set(),
    nonWikidotLinks: new Set(),
    authors: attributions.get(page.url) ?? ["unknown"],
  };
}

function testUrl(u: string, page: { html: string; url: string }) {
  const url = new URL(u, page.url);
  if (!HOSTNAMES.includes(url.hostname)) {
    if (MANUAL_EXCLUSION_PREFIXES.some((s) => u.startsWith(s))) return;
    initBadHost(page);
    if (url.origin.match(/.*.(wikidot|wdfiles).com/g)) {
      badHosts[page.url].nonSCPWikiWikidotLinks.add(u);
    } else {
      badHosts[page.url].nonWikidotLinks.add(u);
    }
  }
}

streamFullDb(getPageCount(), (page) => {
  const dom = parse(page.html);

  const imgs = dom.querySelectorAll("img");
  for (const img of Array.from(imgs)) {
    const src = img.getAttribute("src");
    if (src) {
      testUrl(src, page);
    }
    // if (
    //   src &&
    //   (src.includes("imgur") ||
    //     src.includes("deviantart") ||
    //     src.includes("wikimedia"))
    // ) {
    //   pagesWithUnapprovedHosts.add(page.url);
    // }
  }
  for (const style of Array.from(dom.querySelectorAll("style"))) {
    // if (style.innerText.match(/url\(\s*\S*(imgur|deviantart|wikimedia)/g)) {
    //   pagesWithUnapprovedHosts.add(page.url);
    // }

    const urls = [...(style.innerText.match(/url\(.*\)/g) ?? [])].map((u) =>
      u
        .slice(4, -1)
        .replace(/^("|')/g, "")
        .replace(/("|')$/g, ""),
    );

    for (const u of urls) {
    }
  }
});

fs.writeFile(
  "./output/unapproved-hosts-pages.json",
  JSON.stringify(badHosts, (k, v) => (v instanceof Set ? [...v] : v), 2),
);

// (async () => {
//   const data = getAll.all() as { html: string }[];
//   for (const page of data) {
//     const parsed = parse(page.html);
//     const imgs = parsed.querySelectorAll("img");
//     for (const img of Array.from(imgs)) {
//       const src = img.getAttribute("src");
//       if (src && src.includes("imgur")) {
//         imgurs.push();
//       }
//     }
//   }

//   fs.writeFile("./pages-with-imgur.txt", imgurs.join("\n"));
// })();
