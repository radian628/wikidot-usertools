import { Database } from "bun:sqlite";
import { parse } from "node-html-parser";
import * as fs from "node:fs/promises";
import { PageData } from "./page-parse-tools.js";
const db = new Database("./build/wiki.db", {
  strict: true,
  readonly: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  LIMIT 100 OFFSET $offset
  `);

const getCount = db.query(`
SELECT COUNT(*) FROM articles  
`);

const url2html = new Map<string, string>();

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

function getPageCount() {
  return (getCount.all()[0] as any)["COUNT(*)"] as number;
}

const COUNT = getPageCount();

const counts: Record<any, any> = {};

streamFullDb(COUNT, (data) => {
  const dom = parse(data.html);

  const ratingElem = dom.querySelector("#pagerate-button span");

  if (ratingElem) {
    counts[data.url] = Number(ratingElem.innerText);
  } else {
    counts[data.url] = null;
  }
});

await fs.writeFile(
  "output/ratings-from-scrape.json",
  JSON.stringify(counts, null, 2),
);
