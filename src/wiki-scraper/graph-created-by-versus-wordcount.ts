import * as fs from "node:fs/promises";

const createdBy = new Map(
  JSON.parse((await fs.readFile("./created-by-raw.json")).toString()).map(
    (e: any) => [e.url, e.wikidotInfo.createdAt]
  )
);

console.log(createdBy);

const wordcounts = new Map(
  Object.entries(
    JSON.parse(
      (await fs.readFile("./scpwiki-mainlist-wordcounts.json")).toString()
    )
  ).map(([k, v]) => [`http://scp-wiki.wikidot.com/scp-${k}`, v])
);

const entries: any[][] = [];

for (const [k, v] of wordcounts) {
  const cb = createdBy.get(k);

  if (!cb) continue;

  entries.push([cb, v]);
}

await fs.writeFile(
  "./scpwiki-created-versus-wordcount.csv",
  entries.map((e) => e.join(", ")).join("\n")
);
