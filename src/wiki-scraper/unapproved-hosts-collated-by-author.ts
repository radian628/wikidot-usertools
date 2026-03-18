import * as fs from "node:fs/promises";

(async () => {
  const unapprovedHosts = (
    await fs.readFile("./output/pages-with-certain-unapproved-image-hosts.txt")
  )
    .toString()
    .split("\n");

  const wikijson = JSON.parse(
    (await fs.readFile("./build/wiki.json")).toString(),
  );

  console.log(wikijson[1]);
})();
