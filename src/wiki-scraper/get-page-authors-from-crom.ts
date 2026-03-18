import { getAllPagesMatchingV2 } from "../common/crom.js";
import * as fs from "node:fs/promises";

const matching = await getAllPagesMatchingV2(
  `{ url: { startsWith: "http://scp-wiki.wikidot" } }`,
  `{ url, attributions { user { id, displayName } } }`,
);

await fs.writeFile("./output/page-authors.json", JSON.stringify(matching));
