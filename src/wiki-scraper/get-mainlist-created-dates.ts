import * as fs from "node:fs/promises";
import { getAllPagesMatching } from "../common/crom.js";

await fs.writeFile(
  "./created-by-raw.json",
  JSON.stringify(
    await getAllPagesMatching(
      `{ url: { startsWith: "http://scp-wiki.wikidot.com/scp-" } }`,
      `{ url, wikidotInfo { createdAt } }`
    )
  )
);
