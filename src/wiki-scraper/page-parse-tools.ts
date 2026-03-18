import htmlparse, { parse } from "node-html-parser";
import { Database } from "bun:sqlite";

export type PageData = { html: string; url: string }[];
export type ParsedPageData = {
  html: htmlparse.HTMLElement;
  htmlstr: string;
  url: string;
}[];

export function getParentRelationships(data: PageData): Map<string, string> {
  const map = new Map<string, string>();

  for (const page of data) {
    const parsedpage = parse(page.html);

    const breadcrumbs = parsedpage.getElementById("breadcrumbs");

    if (!breadcrumbs) continue;

    const parent = Array.from(breadcrumbs.querySelectorAll("a")).at(-1);

    if (!parent) continue;

    map.set(page.url, parent.getAttribute("href")!);
  }

  return map;
}

export function getChildren(
  parents: Map<string, string>,
): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const [k, v] of parents) {
    const list = map.get(v) ?? [];
    list.push(k);
    map.set(v, list);
  }

  return map;
}

export function getParsedPageData(data: PageData): ParsedPageData {
  return data.map((d) => ({
    htmlstr: d.html,
    url: d.url,
    html: parse(d.html),
  }));
}

export function getPageContentWordCounts(data: PageData) {
  const wordcounts = new Map<string, number>();
  let i = 0;
  for (const page of data) {
    const parsedpage = parse(page.html);
    const pageContent = parsedpage.querySelector("#page-content");

    if (!pageContent) continue;

    const licensebox = pageContent.querySelectorAll(".licensebox");

    for (const l of licensebox) l.parentNode.removeChild(l);

    for (const code of pageContent.querySelectorAll(".code")) {
      code.parentNode.removeChild(code);
    }

    // for (const e of pageContent.querySelectorAll("*")) {
    //   const style = e.getAttribute("style");
    //   if (!style) continue;
    //   if (style.match(/display\s*\:\s*none/g)) e.parentNode.removeChild(e);
    // }

    const text = pageContent.innerText;

    wordcounts.set(page.url, text.split(/\s+/g).length + 1);
    i++;
    console.log("wordcount", i);
  }

  return wordcounts;
}

export function getPageCategory(url: string): string | undefined {
  const parsed = URL.parse(url);

  if (!parsed) return;

  const category = parsed.pathname.match(/^.*?\:/g);

  if (!category) return;

  return category[0].slice(1, -1);
}

export const db = new Database("./build/wiki.db", {
  strict: true,
  readonly: true,
});

export const getAll = db.query(`
SELECT * FROM articles 
  LIMIT 100 OFFSET $offset
  `);

export const getCount = db.query(`
SELECT COUNT(*) FROM articles  
`);

export function getPageCount() {
  return (getCount.all()[0] as any)["COUNT(*)"] as number;
}

export async function streamFullDb(
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
