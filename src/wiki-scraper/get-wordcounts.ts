import { Database } from "bun:sqlite";
import { parse } from "node-html-parser";
import * as fs from "node:fs/promises";
import {
  getChildren,
  getPageCategory,
  getPageContentWordCounts,
  getParentRelationships,
  getParsedPageData,
  PageData,
} from "./page-parse-tools.js";

const db = new Database("./build/wiki.db", {
  strict: true,
  readonly: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  LIMIT 100 OFFSET $offset
  `);

const url2html = new Map<string, string>();

async function getFullDB(atMost?: number) {
  let offset = 0;
  let database: PageData = [];

  while (true) {
    console.log(offset);
    const entries = getAll.all({ offset }) as PageData;
    database.push(...entries);
    if (entries.length < 100 || offset > (atMost ?? Infinity)) {
      return database;
    }
    offset += 100;
  }
}

function getMainlistWordCounts(
  wordcounts: Map<string, number>,
  children: Map<string, string[]>
) {
  let mainlistWordCounts: Record<string, number> = {};

  for (let i = 1; i < 10000; i++) {
    const num = i.toString().padStart(3, "0");

    const url = `http://scp-wiki.wikidot.com/scp-${num}`;

    const wordcount = wordcounts.get(url);
    if (!wordcount) continue;

    const fragments = (
      children.get(URL.parse(url)?.pathname ?? "")?.slice(1) ?? []
    )
      ?.filter((x) => getPageCategory(x) === "fragment")
      .reduce((prev, curr) => prev + (wordcounts.get(curr) ?? 0), 0);

    // console.log(i, fragments);

    mainlistWordCounts[num] = wordcount + fragments;
  }

  return mainlistWordCounts;
}

(async () => {
  // const data = await getFullDB();

  // console.log("getting parents...");
  // const parents = getParentRelationships(data);

  // const children = getChildren(parents);

  // console.log("getting wordcounts...");
  // const wordcounts = getPageContentWordCounts(data);

  // fs.writeFile(
  //   "./scpwiki-raw-word-counts.json",
  //   JSON.stringify(Object.fromEntries(wordcounts.entries()), undefined, 2)
  // );
  // fs.writeFile(
  //   "./scpwiki-parents.json",
  //   JSON.stringify(Object.fromEntries(parents.entries()), undefined, 2)
  // );
  // fs.writeFile(
  //   "./scpwiki-children.json",
  //   JSON.stringify(Object.fromEntries(children.entries()), undefined, 2)
  // );

  const wordcounts = new Map<string, number>(
    Object.entries(
      JSON.parse(
        (await fs.readFile("./scpwiki-raw-word-counts.json")).toString()
      ) as any
    )
  );
  const children = new Map<string, string[]>(
    Object.entries(
      JSON.parse((await fs.readFile("./scpwiki-children.json")).toString())
    ) as any
  );

  console.log(children.get("/scp-001"));

  const counts = getMainlistWordCounts(wordcounts, children);

  fs.writeFile(
    "./scpwiki-mainlist-wordcounts.json",
    JSON.stringify(counts, undefined, 2)
  );

  fs.writeFile(
    "./scpwiki-mainlist-wordcounts.csv",
    Object.entries(counts)
      .map((e) => e.join(", "))
      .join("\n")
  );

  // console.log(counts);
})();
