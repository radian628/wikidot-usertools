import { Database } from "bun:sqlite";
import { parse } from "node-html-parser";
import * as fs from "node:fs/promises";

const db = new Database("./build/wiki.db", {
  strict: true,
  readonly: true,
});

const getAll = db.query(`
SELECT * FROM articles 
  `);

let imgurs: string[] = [];

(async () => {
  const data = getAll.all() as { html: string }[];
  for (const page of data) {
    const parsed = parse(page.html);
    const imgs = parsed.querySelectorAll("img");
    for (const img of Array.from(imgs)) {
      const src = img.getAttribute("src");
      if (src && src.includes("deviantart")) {
        imgurs.push(src);
      }
    }
  }

  fs.writeFile("./deviantart-links.txt", imgurs.join("\n"));
})();
