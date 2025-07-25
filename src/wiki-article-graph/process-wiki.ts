import * as fs from "node:fs/promises";

const wikiRaw = await fs.readFile("./build/wiki.json");

type Wiki = {
  node: {
    wikidotInfo: {
      source: string | null;
      children: {
        url: string;
      }[];
    };
    url: string;
  };
}[];

const wiki: Wiki = JSON.parse(wikiRaw.toString());

const TRIPLE_BRACKET_LINK_REGEX = /\[\[\[\*?([^|\]]*)(|[^\]]*)?\]\]\]/g;
const RAW_LINK_REGEX = /([^\[]|^)(https?:\/\/[^\s\]\|]+)\]*/g;
const SINGLE_BRACKET_LINK_REGEX = /[^\[]\[([^\s\]]+)[^\]]+\][^\]]/g;
const ANCHOR_TAG_REGEX = /\[\[a[\s\S]*href[\s]*=[\s]*('|")([^\'\"]*)('|")/g;

function linkToSlug(link: string) {
  return link.replaceAll("http://scp-wiki.wikidot.com", "");
}

function normalizeFullURL(link: string) {
  return link
    .toLowerCase()
    .replaceAll("www.scp-wiki.net", "scp-wiki.wikidot.com")
    .replaceAll("www.scp-wiki.wikidot.com", "scp-wiki.wikidot.com")
    .replaceAll("scpwiki.com", "scp-wiki.wikidot.com");
}

function normalizeLink(link: string) {
  if (link.startsWith("http://")) return normalizeFullURL(link);
  if (link.startsWith("https://"))
    return normalizeFullURL(link.replace("https://", "http://"));
  if (link.startsWith("/")) return `http://scp-wiki.wikidot.com/${link}`;
  let normalizedSlug = link
    .replaceAll(/\;\'\"/g, "")
    .replaceAll(/\s+/g, "-")
    .toLowerCase();

  return `http://scp-wiki.wikidot.com/${link}`;
}

let wikiLinkMap: Record<string, { links: string[]; children: string[] }> = {};

function getLinksFromWikitext(src: string) {
  const links: string[] = [];
  const tripleBracketLinks = src.matchAll(TRIPLE_BRACKET_LINK_REGEX);
  if (tripleBracketLinks) {
    links.push(...[...tripleBracketLinks].map((l) => normalizeLink(l[1])));
  }
  const rawLinks = src.matchAll(RAW_LINK_REGEX);
  if (rawLinks) {
    links.push(...[...rawLinks].map((l) => normalizeLink(l[2])));
  }
  const singleBracketLinks = src.matchAll(SINGLE_BRACKET_LINK_REGEX);
  if (singleBracketLinks) {
    links.push(...[...singleBracketLinks].map((l) => normalizeLink(l[1])));
  }
  const anchorTagLinks = src.matchAll(ANCHOR_TAG_REGEX);
  if (anchorTagLinks) {
    links.push(...[...anchorTagLinks].map((a) => normalizeLink(a[2])));
  }
  return links;
}

for (const page of wiki) {
  const links = getLinksFromWikitext(page.node.wikidotInfo.source ?? "").map(
    (l) => linkToSlug(l)
  );
  wikiLinkMap[page.node.url] = {
    links,
    children: page.node.wikidotInfo.children.map((c) => linkToSlug(c.url)),
  };
}

fs.writeFile("./build/links.json", JSON.stringify(wikiLinkMap));
