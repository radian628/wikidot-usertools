import { crom } from "../common/crom.js";
import { throttle } from "../common/throttle.js";
import * as fs from "node:fs/promises";

const slowcrom = throttle(crom, {
  maxConcurrentRequests: 5,
  limits: [
    {
      maxRequests: 19,
      duration: 10,
    },
  ],
});

async function getPagesAfter(id: string | undefined) {
  const pages = await slowcrom(`
 {
  pages(filter: {
    url: {
      startsWith: "http://scp-wiki."
    }}${id ? `, after: "${id}"` : ""}
  ) {
    edges {
      node {
        wikidotInfo {
          source,
          children {
            url
          },
          title
        },
        url
      }
    }
    
    pageInfo {
      startCursor,
      endCursor,
      hasPreviousPage,
      hasNextPage
    }
  }
} 
  `);
  return pages;
}

let pageArray = [];

const initPages = await getPagesAfter(undefined);
pageArray.push(...initPages.data.pages.edges);
let cursor = initPages.data.pages.pageInfo.endCursor;

let urls = new Set<string>();

let index = 0;

while (true) {
  if (!initPages.data.pages.pageInfo.hasNextPage) break;
  const pages = await getPagesAfter(cursor);
  cursor = pages.data.pages.pageInfo.endCursor;
  pageArray.push(...pages.data.pages.edges);
  if (pages.data.pages.edges.some((p: any) => urls.has(p.node.url))) break;
  for (const page of pages.data.pages.edges) {
    urls.add(page.node.url);
  }
  console.log(index++, pageArray.at(-1)?.node.url);
}

fs.writeFile("build/wiki.json", JSON.stringify(pageArray));
