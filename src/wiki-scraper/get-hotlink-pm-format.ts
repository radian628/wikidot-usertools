import * as fs from "node:fs/promises";

const badFiles = new Map(
  Object.entries(
    JSON.parse(
      (await fs.readFile("./output/unapproved-hosts-pages.json")).toString(),
    ),
  ),
);

let authorFiles = new Map<
  string,
  {
    url: string;
    nonSCPWikiWikikdotLinks: string[];
    nonWikidotLinks: string[];
    authors: string[];
  }[]
>();

for (const [url, value] of badFiles as Map<
  string,
  {
    nonSCPWikiWikidotLinks: string[];
    nonWikidotLinks: string[];
    authors: string[];
  }
>) {
  for (const author of (value as any).authors as string[]) {
    authorFiles.set(
      author,
      (authorFiles.get(author) ?? []).concat([
        {
          url,
          nonSCPWikiWikikdotLinks: value.nonSCPWikiWikidotLinks,
          nonWikidotLinks: value.nonWikidotLinks,
          authors: value.authors,
        },
      ]),
    );
  }
}

let pms: any[] = [];

for (const [author, articles] of authorFiles) {
  const body = `Hello, [[*user ${author}]]!
    
Some of your articles currently contain image files which are not hosted on the SCP Wiki. As per the [https://scp-wiki.wikidot.com/technical-content-policy SCP Wiki Technical Content Policy], all image files should be hosted on the SCP Wiki. Note that some hosts such as DeviantArt, Imgur, and SCP Wiki Sandbox sites, were allowed at one point in the past, but are no longer allowed now, so you will need to re-upload those images as well.

Here is a full list of articles and files that we found need localizing:  

${articles
  .map(
    (a) => `
[[div class="blockquote"]]  
**URL:** ${a.url}${a.nonSCPWikiWikikdotLinks.length > 0 ? "\n\n**Files in Sandboxes:**\n" : ""}${a.nonSCPWikiWikikdotLinks.map((a) => `* ${a}`).join("\n")}${a.nonWikidotLinks.length > 0 ? `\n\n**Non-Wikidot Files:**\n` : ""}${a.nonWikidotLinks.map((a) => `* ${a}`).join("\n")}
[[/div]]
`,
  )
  .join("")}

The above list was compiled using an automated script using data from several months ago, so please let us know if we got anything wrong. If you find that you cannot fix the images on any of your pages, please let us know so we can do it on your behalf. 

Thank you,
The SCP Wiki Technical Team
    \n\n`;
  const to = author;
  const title =
    "SCP Wiki Staff Notice: Some of your articles' images need fixing";

  pms.push({ body, to, title });
}

await fs.writeFile(
  "./output/hotlink-pm-list.json",
  JSON.stringify(pms, null, 2),
);
