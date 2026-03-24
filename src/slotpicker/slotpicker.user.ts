import { throttle } from "r628";
import { getAllPagesMatching } from "../common/crom.js";
import Picks from "./picks.txt?raw";
import { range } from "r628";
import { asyncRequestModule, getPageId } from "../common/wikidot-api-utils.js";

const FILTER_9KCON = `{ url: { startsWith: "http://scp-wiki.wikidot.com"}, wikidotInfo: { tags: { eq: "9000" } } }`;
// @ts-expect-error
window.getRatings = async () => {
  const ratings = (await getAllPagesMatching(FILTER_9KCON, `{ url }`))
    .filter((e) => !e.url.endsWith("scp9000contesthub"))
    .map((e) => getRatingInfo(e.url));
  return await Promise.all(ratings);
};

async function getRatingInfo(url: string) {
  const id = await getPageId(url);
  const e = (await asyncRequestModule("pagerate/WhoRatedPageModule", {
    pageId: id,
  })) as any;

  const dom = new DOMParser().parseFromString(e.body, "text/html");
  const raters = dom.querySelectorAll(".printuser");

  let netRating = 0;
  let upvoteTotal = 0;
  let votes = [] as {
    username: string | undefined;
    direction: string | undefined;
  }[];

  for (const r of Array.from(raters)) {
    const username = (r.children[1] as HTMLElement | null)?.innerText?.trim();
    const rating = (
      r.nextElementSibling as HTMLElement | null
    )?.innerText?.trim();

    votes.push({ username, direction: rating });

    if (rating === "+") {
      netRating++;
      upvoteTotal++;
    } else if (rating === "-") {
      netRating--;
    } else {
      console.warn(
        `Unrecognized vote type '${rating}' for user '${username}' and page '${url}'.`,
      );
    }
  }

  return {
    url,
    netRating,
    upvoteTotal,
    votes,
  };
}

// @ts-expect-error
window.calculatePicks = async (
  rawArticles: {
    url: string;
    netRating: number;
    upvoteTotal: number;
    votes: string;
  }[],
) => {
  const articles = rawArticles.sort(
    (a, b) =>
      b.netRating * 10000 + b.upvoteTotal - a.netRating * 10000 - a.upvoteTotal,
  );

  const slotResults = new Map<
    string,
    {
      url: string;
      netRating: number;
      upvoteTotal: number;
    }
  >();

  const prefs = new Map<string, string[]>();

  const parsedPicks = Picks.split("\n\n").map((e) => {
    const lines = e.split("\n");
    const url = lines[0];
    const prefsRaw = lines.slice(1).join("\n");
    const parsedPrefs = parsePrefs(prefsRaw);
    if (parsedPrefs.invalid.length > 0) {
      console.warn(url, "had invalid preferences: ", parsedPrefs.invalid);
    }

    prefs.set(url, parsedPrefs.prefs);
  });

  for (const a of articles) {
    let preferences = prefs.get(a.url);
    if (!preferences) {
      console.warn(a.url, "has no slot preferences listed!");
      preferences = range(998)
        .map((e) => e + 9000)
        .map((e) => e.toString());
    }

    preferences = (
      await Promise.all(
        preferences.map(async (p) => {
          if (p.startsWith("9") && p.length === 4) return [p];
          const status = (await fetch(`https://scp-wiki.wikidot.com/scp-${p}`))
            .status;
          return status === 404 ? [p] : [];
        }),
      )
    ).flat();

    const firstAvailableSlot = preferences.find((x) => !slotResults.has(x));
    if (firstAvailableSlot === undefined) {
      console.warn(a.url, ": no valid slot found!");
    }
    if (firstAvailableSlot !== "no_slot" && firstAvailableSlot) {
      slotResults.set(firstAvailableSlot, {
        url: a.url,
        netRating: a.netRating,
        upvoteTotal: a.upvoteTotal,
      });
    }
  }

  return {
    table: Object.fromEntries(Array.from(slotResults.entries())),
    orderedResults: Array.from(slotResults.entries())
      .map(([k, v]) => {
        return {
          ...v,
          slot: k,
        };
      })
      .sort(
        (a, b) =>
          b.netRating * 10000 +
          b.upvoteTotal -
          a.netRating * 10000 -
          a.upvoteTotal,
      ),
  };
};

async function getDiscussionLink(url: string) {
  const pageData = await (await fetch(url)).text();
  const dom = new DOMParser().parseFromString(pageData, "text/html");
  const discussButton = dom.querySelector(
    "#discuss-button",
  ) as HTMLAnchorElement;
  return discussButton.href;
}

function doesPatternMatch(pattern: string, test: string) {
  const placeholderRegistry = new Map<string, string>();
  for (let i = 1; i < 4; i++) {
    const patternDigit = pattern[i];
    const testDigit = test[i];
    if (patternDigit.match(/\d/g)) {
      if (patternDigit !== testDigit) return false;
    } else {
      const placeholder = placeholderRegistry.get(patternDigit.toUpperCase());
      if (placeholder === undefined) {
        placeholderRegistry.set(patternDigit.toUpperCase(), testDigit);
      } else {
        if (placeholder !== testDigit) return false;
      }
    }
  }
  return true;
}

function instantiateSlots(pattern: string) {
  let options: string[] = [];

  for (let i = 9000; i <= 9998; i++) {
    let str = i.toString();

    // check raw digit matches
    if (!doesPatternMatch(pattern, str)) continue;

    options.push(str);
  }
  return options;
}

function parsePrefs(str: string): {
  prefs: string[];
  invalid: string[];
} {
  const lines = str.split("\n");

  const prefs: string[] = ["9000"];
  const invalid: string[] = [];

  for (const line of lines) {
    if (line.trim().length === 0) continue;

    const lineSplit = line.trim().split(/\s+/g);

    const rgx = /^9[0-9xXyYzZ]{3}$/g;

    if (!lineSplit[0].match(rgx)) {
      invalid.push(line);
      continue;
    }

    let slots = instantiateSlots(lineSplit[0]);

    let invalidInstructions = false;

    for (const instruction of lineSplit.slice(1)) {
      if (instruction === "highest") {
        slots.reverse();
      } else if (instruction.startsWith("not")) {
        const removeThis = instruction.slice(3);
        slots = slots.filter((s) => s !== removeThis);
      } else if (instruction === "palindrome") {
        slots = slots.filter((s) => s === s.split("").reverse().join(""));
      } else if (instruction === "no_same_digits_and_doesnt_end_with_9_or_0") {
        slots = slots.filter((s) => {
          if (s.endsWith("9")) return false;
          if (s.endsWith("0")) return false;
          return new Set(s.split("")).size === 4;
        });
      } else if (instruction === "lowest_4_and_7") {
        slots = slots.filter((s) => s.includes("4") && s.includes("7"));
      } else if (instruction === "lowest_4_or_7") {
        slots = slots.filter((s) => s.includes("4") || s.includes("7"));
      } else if (instruction === "no_slot") {
        slots = ["no_slot"];
      } else if (instruction.startsWith("custom")) {
        slots = [instruction.slice(6)];
      } else {
        invalidInstructions = true;
        invalid.push(line);
      }
    }

    if (invalidInstructions) continue;

    prefs.push(...slots);
  }

  for (let i = 9000; i <= 9998; i++) {
    prefs.push(i.toString());
  }

  return {
    prefs,
    invalid,
  };
}

// @ts-expect-error
window.parsePrefs = parsePrefs;

async function getAuthorPosts(url: string, authors: string[]) {
  const dlink = await getDiscussionLink(url);
  console.log("discussion link", dlink);
  const discussionPage = await (await fetch(dlink)).text();
  const dom = new DOMParser().parseFromString(discussionPage, "text/html");
  return Array.from(
    dom.querySelectorAll("#thread-container-posts .post"),
  ).filter((p) => {
    const usernameContainer = p.querySelector(
      ".printuser a:nth-child(2)",
    ) as HTMLElement;
    console.log(usernameContainer);
    return usernameContainer && authors.includes(usernameContainer.innerText);
  });
}

// @ts-expect-error
window.copyURLToClipboard = (url) => (target: HTMLElement) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      target.style.backgroundColor = "green";
    })
    .catch(() => {
      target.style.backgroundColor = "red";
    })
    .finally(() => {
      setTimeout(() => {
        target.style.backgroundColor = "#eee";
      }, 1000);
    });
};

// @ts-expect-error
window.getAllAuthorComments = async () => {
  const pages = await getAllPagesMatching(
    FILTER_9KCON,
    `{ url, attributions { user { name } } }`,
  );

  const authorPostsThrottled = throttle(getAuthorPosts, {
    limits: [
      {
        duration: 10,
        maxRequests: 3,
      },
    ],
    maxConcurrentRequests: 3,
  });

  console.log(pages);

  document.body.innerHTML = "";
  document.body.style = "display: flex; flex-wrap: wrap;";
  for (const page of pages) {
    const url = page.url;
    const authorPosts = await authorPostsThrottled(
      url,
      page.attributions.map((e: any) => e.user.name),
    );
    for (const ap of authorPosts) {
      const apcontent = ap.querySelector(".content");
      if (!(ap as HTMLElement).innerText.match("9")) continue;
      for (const img of Array.from(apcontent!.querySelectorAll("img"))) {
        img.parentElement!.removeChild(img);
      }
      if (!apcontent) break;
      document.body.innerHTML += `<div style="padding: 10px; margin: 10px; border: 1px solid black; width: 250px; font-family: sans-serif;">
      <p>
      <button style="max-width: 100%; font-size: 125%; word-wrap: break-word" onclick="window.copyURLToClipboard('${url}')(this)">${url}</button> 
      </p>
      ${apcontent.innerHTML}</div>`;
    }
  }
};
