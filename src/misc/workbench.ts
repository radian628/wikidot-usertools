import * as fs from "node:fs/promises";
import { Wiki } from "../wiki-article-graph/process-wiki.js";

const wiki: Wiki = JSON.parse(
  (await fs.readFile("./build/wiki.json")).toString()
);

export function parseIncludeParameters(text: string) {
  return text
    .split("|")
    .map((e) => {
      let firstEqualsSign = [...e].indexOf("=");
      if (firstEqualsSign === -1) return;
      return [e.slice(0, firstEqualsSign), e.slice(firstEqualsSign + 1)];
    })
    .filter((e) => e);
}

export const INCLUDE_STMT_REGEX =
  /\[\[include\s+([^\s\]]+)([\s\S]*?)\]\]($|\n|\r)/g;

export const CSS_MODULE_REGEX =
  /\[\[module css\]\]([\s\S]*?)\[\[\/module\]\]/gi;

export function findIncludeStatements(src: string) {
  return [...src.matchAll(INCLUDE_STMT_REGEX)].map((e) => ({
    full: e[0],
    name: e[1],
    params: parseIncludeParameters(e[2] ? e[2] : ""),
  }));
}

let count = 0;

export function findIncludeStatement(src: string, name: string) {
  const stmts = findIncludeStatements(src);
  return stmts.find((e) => e.name === name);
}

let departments = new Set();
let articleDepartments: Record<string, Set<string>> = {};
let departmentArticles: Record<string, Set<string>> = {};

let i = 0;

for (const page of wiki) {
  if (i++ % 500 == 0) console.log(i.toString());
  const s = page.node.wikidotInfo.source;
  // if (s?.includes("content-panel") && s.includes("3law")) {
  //   console.log(page.node.url);
  // }
  // if (s?.includes("fonts.googleapis.com")) {
  //   console.log(page.node.url);
  // }

  const slug = page.node.url.slice("http://scp-wiki.wikidot.com/".length);

  const depts1 = s?.matchAll(/department\s+of\s+(\S+)/gi) ?? [];
  const depts2 = s?.matchAll(/(\S+)\s+department/gi) ?? [];
  const depts = [...depts1, ...depts2].map((e) => e[1]);

  articleDepartments[slug] = new Set();
  for (const d of depts) {
    departments.add(d.toLowerCase());
    articleDepartments[slug].add(d.toLowerCase());
    if (!departmentArticles[d.toLowerCase()]) {
      departmentArticles[d.toLowerCase()] = new Set();
    }
    departmentArticles[d.toLowerCase()].add(slug);
  }

  // const cssmodules = [...(s ?? "").matchAll(CSS_MODULE_REGEX)]
  //   .map((e) => e[1])
  //   .join("");

  // if (
  //   cssmodules.match(".scp-image-block") ||
  //   cssmodules.match(".block-left") ||
  //   cssmodules.match(".block-right")
  // ) {
  //   console.log(page.node.url);
  //   count++;
  // }

  // try {
  //   const includes = findIncludeStatements(s ?? "");
  //   if (
  //     // no css modules
  //     !s?.match(/\[\[module\s+css/gi) &&
  //     // no inline styles
  //     !s?.match(/style\=['"]/g) &&
  //     // has at least one image block
  //     includes.findIndex((s) => s.name.endsWith("component:image-block")) !==
  //       -1 &&
  //     // only includes allowed components
  //     includes.every(
  //       (s) =>
  //         s.name.endsWith("component:image-block") ||
  //         s.name.endsWith("component:license-box") ||
  //         s.name.endsWith("component:license-box-end") ||
  //         s.name.endsWith("component:license-box-backend")
  //     )
  //   ) {
  //     console.log(page.node.url);
  //     count++;
  //   }
  // } catch (e) {
  //   console.error("ERROR", e, page.node.url);
  // }
}

// console.log([...departments].join("\n"));
console.log(
  Object.entries(departmentArticles)
    .filter(([k, v]) => v.size > 0)
    .map(([k, v]) => k + "\n" + [...v].map((e) => "  " + e).join("\n"))
    .join("\n\n")
);

// console.log(count);
