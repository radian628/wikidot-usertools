/*!
// ==UserScript==
// @name        UserInfo Better Comments View 
// @match       *://*.wikidot.com/user:info/*
// @grant       none
// @version     1.0
// @author      radian628
// @description A nicer way to view Wikidot comments. 
// ==/UserScript==
*/

import {
  listenForNoSelector,
  listenForSelector,
} from "../common/listen-for-element.js";
import { PubSub } from "../common/pubsub.js";
import { throttle, Throttled } from "../common/throttle.js";
import { waitUntil } from "../common/wait.js";
import { createWikiFilterField } from "./filter-by-wiki.js";
import { scrollDetector } from "./scroll-detector.js";

type GetUserPageResult = {
  status: "ok";
  jsInclude: unknown[];
  cssInclude: unknown[];
  callbackIndex: string;
  CURRENT_TIMESTAMP: number;
  body?: string;
};

function getUserCommentPageTextRaw(userId: string, page: number) {
  return new Promise<GetUserPageResult>((resolve, reject) => {
    OZONE.ajax.requestModule(
      "userinfo/UserRecentPostsListModule",
      {
        page,
        userId,
      },
      (result) => {
        resolve(result);
      }
    );
  });
}

async function getUserCommentPageElements(
  userId: string,
  page: number,
  getUserCommentPageText: Throttled<typeof getUserCommentPageTextRaw>
) {
  const text = await getUserCommentPageText(userId, page);
  const threadContainer = extractElementFromString(
    text.body ?? "",
    ".thread-container"
  );
  return threadContainer;
}

function extractElementFromString(
  src: string,
  selector: string
): Element | null {
  const div = document.createElement("div");
  div.innerHTML = src;
  return div.querySelector(selector);
}

export async function getCommentCount(
  userId: string,
  loadPageAt: (idx: number) => Promise<Element | null>
) {
  const isPageEmpty = async (idx: number) => {
    const page = await loadPageAt(idx);
    return !page || page.children.length === 0;
  };

  let pageCountUpperBound = 1;

  // establish an upper bound for the number of pages
  while (true) {
    const isUpperBoundEmpty = await isPageEmpty(pageCountUpperBound);
    if (isUpperBoundEmpty) {
      break;
    }
    pageCountUpperBound *= 2;
  }

  // establish a lower bound for number of pages
  let pageCountLowerBound = Math.floor(pageCountUpperBound / 2);

  // perform binary search
  while (Math.abs(pageCountUpperBound - pageCountLowerBound) > 1) {
    let mid = Math.floor((pageCountLowerBound + pageCountUpperBound) / 2);
    const isEmpty = await isPageEmpty(mid);
    if (isEmpty) {
      pageCountUpperBound = mid;
    } else {
      pageCountLowerBound = mid;
    }
  }

  // calculate number of comments based on number of pages
  return (
    Math.max(0, pageCountLowerBound - 1) * 20 +
    ((await loadPageAt(pageCountLowerBound))?.children.length ?? 0)
  );
}

// @ts-expect-error
window.getUserCommentPageElements = getUserCommentPageElements;

function recentPostsInfiniteScroll(
  recentPostsBox: HTMLDivElement,
  userId: string,
  wikiFilter: PubSub<string>
): () => void {
  let loadedPages = new Map<number, Element | null>();
  let nextPageIndex = 1;
  let doneLoadingPages = false;

  async function loadNewPage(
    userId: string,
    getUserCommentPageText: Throttled<typeof getUserCommentPageTextRaw>
  ) {
    let idx = nextPageIndex++;
    const page = await loadPageAt(userId, idx, getUserCommentPageText);
    if (!page || page?.children.length == 0) {
      doneLoadingPages = true;
    }
    return page;
  }

  async function loadPageAt(
    userId: string,
    idx: number,
    getUserCommentPageText: Throttled<typeof getUserCommentPageTextRaw>
  ) {
    if (loadedPages.has(idx)) return loadedPages.get(idx)!;
    return getUserCommentPageElements(userId, idx, getUserCommentPageText).then(
      (page) => {
        loadedPages.set(idx, page);
        return page;
      }
    );
  }

  const wikifilterUnsub = wikiFilter.subscribe((a) => {
    console.log("test", a, wikiFilter.get());
    applyWikiFilter();
  });

  function applyWikiFilter() {
    const wikiname = wikiFilter.get().trim();

    const posts = document.querySelectorAll(".forum-recent-posts-box .post");

    let someVisible = false;

    for (const post of Array.from(posts)) {
      const linkToPost = post.querySelector(
        ".info > a:nth-last-child(1)"
      ) as HTMLAnchorElement | null;

      if (!linkToPost) {
        const errorWarning = document.createElement("p");
        errorWarning.innerText =
          "Warning: Unable to identify the wiki this post originated from.";
        errorWarning.style = "color: red;";
        errorWarning.className = "delete-after-post-visibility-updates";
        post.appendChild(errorWarning);
        someVisible = true;
      } else if (
        wikiname.length === 0 ||
        linkToPost.href.includes(`://${wikiname}.wikidot.com`)
      ) {
        (post as HTMLElement).style.display = "block";
        someVisible = true;
      } else {
        (post as HTMLElement).style.display = "none";
      }
    }
  }

  const sd = scrollDetector("100vh");
  const status = document.createElement("div");
  let stop = false;
  recentPostsBox.appendChild(sd.element);
  recentPostsBox.appendChild(status);

  let commentCountStr = "???";

  let commentCountPromise = (async () => {
    const commentCount = await getCommentCount(userId, (idx) =>
      loadPageAt(
        userId,
        idx,
        throttle(getUserCommentPageTextRaw, {
          maxConcurrentRequests: 5,
          limits: [{ duration: 2, maxRequests: 6 }],
        })
      )
    );

    commentCountStr = commentCount.toString();
  })();

  (async () => {
    while (!stop && !doneLoadingPages) {
      // wait until the user has scrolled down
      await waitUntil<void>(sd.onVisible);
      status.innerText = `Loading more comments... (${
        document.querySelectorAll(".forum-recent-posts-box .post").length
      } / ${commentCountStr})`;

      // load and add a new page
      const page = await loadNewPage(
        userId,
        throttle(getUserCommentPageTextRaw, {
          maxConcurrentRequests: 3,
          limits: [{ duration: 1 / 3, maxRequests: 1 }],
        })
      );
      if (page) {
        recentPostsBox.insertBefore(page, sd.element);
        applyWikiFilter();
      }
    }
    await commentCountPromise;
    status.innerText = `All comments for this user have been loaded. (${commentCountStr} / ${commentCountStr})`;
  })();

  return () => {
    stop = true;
    wikifilterUnsub();
  };
}

(async () => {
  while (true) {
    // ensure we're on the right page
    const recentPostsBox = (await listenForSelector(
      ".forum-recent-posts-box:has(#forum-recent-posts-list)"
    )) as HTMLDivElement;

    // get user's id
    const userId =
      (
        recentPostsBox.querySelector(
          "#recent-posts-user-id"
        ) as HTMLInputElement | null
      )?.value ?? "";

    // remove old, paginated contents of the recent posts box
    for (const child of Array.from(recentPostsBox.children)) {
      child.parentElement?.removeChild(child);
    }
    const betterCommentsViewIndicator = document.createElement("div");
    betterCommentsViewIndicator.id = "better-comments-view-indicator";
    recentPostsBox.appendChild(betterCommentsViewIndicator);

    const filter = createWikiFilterField();
    if (recentPostsBox.parentElement) {
      recentPostsBox.parentElement.insertBefore(filter.element, recentPostsBox);
    }

    const stopInfiniteScroll = recentPostsInfiniteScroll(
      recentPostsBox,
      userId,
      filter.wikiFilter
    );

    await listenForNoSelector("#better-comments-view-indicator");
    stopInfiniteScroll();
    filter.unmount();
  }
})();
