// import sqlite3import from "sqlite3";
// const sqlite3 = sqlite3import.verbose();

// const db = new sqlite3.Database("./build/wiki.db");

// db.serialize(() => {
// })

import express from "express";
import cors from "cors";
import sqlite, { Database } from "bun:sqlite";
import { z } from "zod";
import * as fs from "node:fs/promises";
import { Wiki } from "../wiki-article-graph/process-wiki.js";

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: 2 ** 30,
  })
);

const WikiArticle = z.object({
  html: z.string(),
  url: z.string(),
});

type WikiArticleWithoutId = z.infer<typeof WikiArticle>;

type WikiArticleWithId = WikiArticleWithoutId & { id: number };

const db = new Database("./build/wiki.db", {
  strict: true,
});

db.exec(`
CREATE TABLE IF NOT EXISTS all_urls (
  id INTEGER PRIMARY KEY,
  url VARCHAR
); 
`);

db.exec(`
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY,
  html VARCHAR,
  url VARCHAR
);
`);

const insertAllUrls = db.query(`
INSERT INTO all_urls (id, url) VALUES ($id, $url) 
ON CONFLICT DO NOTHING;
  `);

const wiki: Wiki = JSON.parse(
  (await fs.readFile("./build/wiki.json")).toString()
);

let wikiLinks = wiki.map((w, i) => w.node.url).map((url, id) => ({ id, url }));

db.transaction(() => {
  for (const l of wikiLinks) {
    insertAllUrls.all(l);
  }
})();

const insert = db.query(
  `
INSERT INTO articles (html, url) VALUES (
  $html, $url
);
      `
);

const select = db.query(`
SELECT * FROM articles WHERE url = $url 
  `);

const getAllRemaining = db.query(`
SELECT * FROM all_urls WHERE url NOT IN (SELECT url FROM articles); 
  `);

// console.log("remaining", getAllRemaining.all());

function normalizeUrl(originalUrl: string) {
  const urlparsed = new URL(originalUrl);
  urlparsed.hash = "";
  urlparsed.search = "";
  return urlparsed
    .toString()
    .replace("https://", "http://")
    .replace(/\/$/g, "")
    .replace(/\/comments\/show$/, "");
}

app.post("/wikidot-cors-endpoint", (req, res) => {
  const article = WikiArticle.safeParse(req.body);
  if (article.data) {
    insert.all({
      html: article.data.html,
      url: normalizeUrl(article.data.url),
    });
    console.log("received", article.data.url);
    res.end("success");
  } else {
    res.status(400);
    res.end(z.treeifyError(article.error).errors.join("\n"));
  }
});

app.get("/:url/exists", (req, res) => {
  const url = normalizeUrl(decodeURIComponent(req.params.url));
  const result = select.all({ url });
  res.contentType("application/json");
  res.end(JSON.stringify(result.length > 0));
});

app.get("/remaining", (req, res) => {
  const result = getAllRemaining.all();
  res.contentType("application/json");
  res.end(JSON.stringify(result));
});

app.listen(8080);

/*
await (await fetch(
  "http://localhost:8080/wikidot-cors-endpoint", 
  { method: "post", body: `{ "a": "b" }` }
)).text();
*/
