import * as fs from "node:fs/promises";
import { Wiki } from "../wiki-article-graph/process-wiki.js";

const wiki: Wiki = JSON.parse(
  (await fs.readFile("./build/wiki.json")).toString()
);

const links = wiki
  .map(
    (n) =>
      `<a target="_parent" href="${n.node.url}"> ${n.node.url.slice(
        "http://scp-wiki.wikidot.com/".length
      )}</a>`
  )
  .join(" ");

fs.writeFile("./build/links.html", links);
