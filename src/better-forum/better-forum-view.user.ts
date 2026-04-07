/*!
// ==UserScript==
// @name        Wikidot Better Forum View 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     1.0
// @author      radian628
// @description A nicer way to view Wikidot comments. 
// ==/UserScript==
*/

import {
  alterElements,
  listenForNoSelector,
  listenForSelector,
  memo,
  throttle,
  waitFor,
  waitUntil,
} from "r628";
import { scrollDetector } from "../better-comments-view/scroll-detector.js";

type GetForumPageResult = {
  status: "ok";
  jsInclude: unknown[];
  cssInclude: unknown[];
  callbackIndex: string;
  CURRENT_TIMESTAMP: number;
  body?: string;
};

function getForumPageRaw(threadId: string, page: number) {
  return new Promise<GetForumPageResult>((resolve, reject) => {
    OZONE.ajax.requestModule(
      "forum/ForumViewThreadPostsModule",
      {
        pageNo: page.toString(),
        t: threadId,
      },
      (result) => {
        resolve(result);
      },
    );
  });
}

const getForumPage = throttle(memo(getForumPageRaw), {
  maxConcurrentRequests: 5,
  limits: [{ duration: 1 / 3, maxRequests: 1 }],
});

function forumInfiniteScroll(threadId: string, container: HTMLElement) {
  let nextPageIndex = 1;
  let doneLoadingPages = false;
  let stop = false;

  async function loadPage(index: number) {
    const page = await getForumPage(threadId, index);
    return page;
  }

  function loadNextPage() {
    return loadPage(nextPageIndex++);
  }

  const sd = scrollDetector("100vh");
  container.appendChild(sd.element);

  (async () => {
    while (!stop && !doneLoadingPages) {
      await waitUntil<void>(sd.onVisible);
      const page = await loadNextPage();

      if (page.body) {
        const pageRoot = document.createElement("div");
        pageRoot.innerHTML = page.body;
        for (const child of Array.from(pageRoot.querySelectorAll(".pager"))) {
          child.parentElement?.removeChild(child);
        }
        if (pageRoot.querySelectorAll(".post-container").length === 0) {
          doneLoadingPages = true;
        }
        container.insertBefore(pageRoot, sd.element);
        WIKIDOT.page.init();
      }
    }
  })();

  return () => {
    stop = true;
  };
}

alterElements("#new-post-form-container", (formContainer) => {
  const newPostButton = document.querySelector(":has(> #new-post-button)");
  if (newPostButton) {
    formContainer.parentElement?.removeChild(formContainer);
    newPostButton.parentElement?.insertBefore(formContainer, newPostButton);
  }
  return () => {};
});

(async () => {
  while (true) {
    // wait for forum to be ready
    const forumRoot = await listenForSelector(".forum-thread-box");
    const threadId = await waitFor(() => WIKIDOT.forumThreadId);

    // get rid of old forum content
    const forumPosts = forumRoot.querySelector("#thread-container-posts");
    if (!forumPosts) continue;
    for (const child of Array.from(forumPosts.children)) {
      child.parentElement?.removeChild(child);
    }

    const newPostButton = forumRoot.querySelector(":has(> #new-post-button)");

    newPostButton?.parentElement?.removeChild(newPostButton);

    if (newPostButton)
      forumRoot
        .querySelector(".options")
        ?.insertAdjacentElement("afterend", newPostButton);

    const unsub = forumInfiniteScroll(
      threadId.toString(),
      forumPosts as HTMLElement,
    );

    await listenForNoSelector("#thread-container");
  }
})();
