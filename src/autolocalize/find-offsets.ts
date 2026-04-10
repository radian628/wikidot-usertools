import { HOSTNAMES } from "./autolocalize.js";

export function findPotentialOffsetURLs(src: string) {
  const comments = src.match(/\[!--[\s\S]*?--\]/g) ?? [];

  const urls = comments
    .map((c) => c.match(/https?\:\/\/\S*/) ?? [])
    .flat(1)
    .map((u) => u.replace(/--\]$/g, ""));

  return urls;
}

export type OffsetInfo = {
  url: string;
  dom: Document;
  htmlString: string;
};

export async function getOffsetSourceFromURL(
  url: string,
  originalUrl: URL,
): Promise<OffsetInfo[]> {
  const parsedUrl = URL.parse(url);

  if (!parsedUrl || !HOSTNAMES.includes(parsedUrl.hostname)) return [];

  parsedUrl.hostname = window.location.hostname;

  let normalizedUrl = parsedUrl.href;

  const html = await fetch(normalizedUrl);

  if (!html.ok) {
    return [];
  }

  const htmlString = await html.text();
  const dom = new DOMParser().parseFromString(htmlString, "text/html");

  const finalBreadcrumbsLink = Array.from(
    dom.querySelectorAll("#breadcrumbs a"),
  ).at(-1);

  if (!finalBreadcrumbsLink) return [];

  const finalBreadcrumbsUrl = new URL(
    (finalBreadcrumbsLink as HTMLAnchorElement).href,
    normalizedUrl,
  );

  if (
    finalBreadcrumbsUrl.hostname !== originalUrl.hostname ||
    finalBreadcrumbsUrl.pathname !== originalUrl.pathname
  )
    return [];

  return [
    {
      url: normalizedUrl,
      dom,
      htmlString,
    },
  ];
}

export async function getOffsetSourcesFromURLs(
  urls: string[],
  originalUrlString: string,
): Promise<OffsetInfo[]> {
  const originalUrl = new URL(originalUrlString);
  return (
    await Promise.all(urls.map((u) => getOffsetSourceFromURL(u, originalUrl)))
  ).flat(1);
}

export async function getOffsetSources(src: string, url: string) {
  return await getOffsetSourcesFromURLs(findPotentialOffsetURLs(src), url);
}
