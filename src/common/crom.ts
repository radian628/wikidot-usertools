export async function crom(query: string): Promise<any> {
  return await (
    await fetch("https://apiv1.crom.avn.sh/graphql", {
      body: JSON.stringify({ query }),
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}

export async function crom2(query: string): Promise<any> {
  return await (
    await fetch("https://apiv2.crom.avn.sh/graphql", {
      body: JSON.stringify({ query, operationName: null, variables: {} }),
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
  ).json();
}

export function normalizeURL(url: URL) {
  const url2 = url;
  ((url2.protocol = "http:"), (url2.hash = ""));
  url2.search = "";
  return url2;
}

export async function getAllPagesMatching(
  filter: string,
  content: string,
): Promise<any[]> {
  let cursor: string | undefined;

  const pages: any[] = [];

  while (true) {
    const query = `{
  pages(filter: ${filter}, first: 100${cursor ? `, after: "${cursor}"` : ""}) {
    edges {
      node ${content} 
    },
    pageInfo {
      hasNextPage,
      endCursor
    }
  }
}`;

    const data = await crom(query);
    pages.push(...data.data.pages.edges.map((e: any) => e.node));
    if (!data.data.pages.pageInfo.hasNextPage) break;
    cursor = data.data.pages.pageInfo.endCursor;
  }

  return pages;
}

export async function getAllPagesMatchingV2(
  filter: string,
  content: string,
): Promise<any[]> {
  let cursor: string | undefined;

  const pages: any[] = [];

  while (true) {
    const query = `{
  pages(filter: ${filter}, first: 100${cursor ? `, after: "${cursor}"` : ""}) {
    edges {
      node ${content} 
    },
    pageInfo {
      hasNextPage,
      endCursor
    }
  }
}`;

    const data = await crom2(query);
    pages.push(...data.data.pages.edges.map((e: any) => e.node));
    if (!data.data.pages.pageInfo.hasNextPage) break;
    cursor = data.data.pages.pageInfo.endCursor;
  }

  return pages;
}

export async function getPageChildrenURLs(
  parent: string,
  site?: string,
): Promise<string[]> {
  const parentURL = new URL(parent);

  const normalizedParent = normalizeURL(parentURL);

  const filter = `
  { ${site ? `url: { startsWith: "${site}" }, ` : ""} 
   wikidotInfo: { parent: { url: { eq: "${normalizedParent.href}" } } } }
  `;

  return (await getAllPagesMatching(filter, `{ url }`)).map((e) => e.url);
}
