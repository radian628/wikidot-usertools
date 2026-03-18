import * as fs from "node:fs/promises";

const authorData = JSON.parse(
  (await fs.readFile("./output/page-authors.json")).toString(),
);
const badHosts = (
  await fs.readFile("./output/pages-with-certain-unapproved-image-hosts.txt")
)
  .toString()
  .split("\n");

// maps URLs to author names
let attributions = new Map<string, string[]>();

for (const article of authorData) {
  attributions.set(
    article.url,
    article.attributions.map((a: any) => a.user.displayName.toLowerCase()),
  );
}

let badHostsAttributions = new Map<string, string[]>();

for (const b of badHosts) {
  let authors = attributions.get(b);
  if (!authors) authors = ["unknown"];
  for (const a of authors) {
    badHostsAttributions.set(a, (badHostsAttributions.get(a) ?? []).concat(b));
  }
}

await fs.writeFile(
  "./output/bad-host-authors.json",
  JSON.stringify(
    Object.fromEntries(badHostsAttributions.entries()),
    undefined,
    2,
  ),
);
