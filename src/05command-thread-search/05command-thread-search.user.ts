/*!
// ==UserScript==
// @name        05Command Thread Search 
// @match       *://05command.wikidot.com/*
// @grant       none
// @version     0.1.0
// @author      radian628
// @description Adds search functionality to 05command. 
// ==/UserScript==
*/

import { injectElementsAt } from "r628";
import { createRoot } from "react-dom/client";
import { createSearchUI } from "./search-ui.js";

function isDescendantOf(child: Element | null, parent: Element) {
  if (!child) return false;
  if (child === parent) return true;
  return isDescendantOf(child.parentElement, parent);
}

async function getThreadURLs(url: string) {
  const sitemap = await (await fetch(url)).text();

  const sitemapDom = new DOMParser().parseFromString(sitemap, "text/xml");

  const threadSitemapUrls = Array.from(sitemapDom.querySelectorAll("loc")).map(
    (a) => a.textContent,
  );

  return threadSitemapUrls;
}

(async () => {
  const sitemap = await (await fetch("/sitemap.xml")).text();

  const sitemapDom = new DOMParser().parseFromString(sitemap, "text/xml");

  const threadSitemapUrls = Array.from(sitemapDom.querySelectorAll("loc"))
    .map((a) => a.textContent)
    .filter((t) => t.match(/sitemap_thread_\d+\.xml/g));

  const threadUrls = [
    ...new Set(
      (await Promise.all(threadSitemapUrls.map(getThreadURLs))).flat(1),
    ),
  ];

  const searchButton = document.querySelector(
    "#search-top-box input.button.btn",
  );

  const searchTopBox = document.getElementById("search-top-box");

  let isSearchOpen = false;

  searchButton?.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isSearchOpen) {
      const ui = createSearchUI({
        threads: threadUrls,
      });
      searchTopBox?.appendChild(ui.elem);
      isSearchOpen = true;

      const closeSearch = (e: MouseEvent) => {
        if (!isDescendantOf(e.target as Element, searchTopBox!)) {
          isSearchOpen = false;
          ui.root.unmount();
          ui.elem.remove();
          document.removeEventListener("click", closeSearch);
        }
      };
      setTimeout(() => {
        document.addEventListener("click", closeSearch);
      });
    }
  });
})();
