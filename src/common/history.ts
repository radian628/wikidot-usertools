import { z } from "zod";
import { asyncRequestModule } from "./wikidot-api-utils.js";

export function parseRevisionRow(row: HTMLTableRowElement) {
  const tableData = row.querySelectorAll("td");
  const revnoElem = tableData[0];
  const flagsElem = tableData[2];
  const byElem = tableData[4];
  const dateElem = tableData[5];
  const commentsElem = tableData[6];

  const revid = row.id.match(/\d+/g)?.[0];

  const revno = Number(revnoElem.innerText.slice(0, -1));

  const flags = Array.from(flagsElem.querySelectorAll("span"))
    .map((s) => s.innerText)
    .map(
      (s) =>
        ({
          A: "tags",
          M: "metadata",
          S: "source",
          T: "title",
          N: "newpage",
        })[s] ?? "unknown",
    );

  const byUserId =
    byElem.querySelector("a")?.getAttribute("onclick")?.match(/\d+/g)?.[0] ??
    byElem.querySelector("span")?.getAttribute("data-id") ??
    null;

  const byUsername =
    (byElem.querySelector("a:nth-child(2)") as HTMLElement)?.innerText ??
    byElem.querySelector("span")?.innerText ??
    null;

  const byUserLink = byElem.querySelector("a")?.getAttribute("href");

  const date = new Date(
    Number(
      dateElem
        .querySelector("span")
        ?.className?.match(/time_\d+/g)?.[0]
        .slice(5),
    ) * 1000,
  );

  const comments = commentsElem.innerText;

  return {
    revid,
    revno,
    flags,
    byUserId,
    byUsername,
    byUserLink,
    date,
    comments,
  };
}

export async function getPageRevisionRange(
  pageId: string,
  page: number,
  count: number,
) {
  const raw = await getPageRevisionsRaw(
    pageId,
    page.toString(),
    count.toString(),
  );

  if (raw.status !== "ok" || typeof raw.body !== "string") return;

  const dom = new DOMParser().parseFromString(raw.body, "text/html");

  const rows = Array.from(
    dom.querySelectorAll(".page-history tr:not(:nth-child(1))"),
  ) as HTMLTableRowElement[];

  return rows.map(parseRevisionRow);
}

export type RevisionRow = ReturnType<typeof parseRevisionRow>;

export async function revisionNumberToId(
  pageId: string,
  revisionNumber: number,
): Promise<PageRevision> {
  const rev = await getPageRevisions(pageId, 1, 1);
  if (!rev[0])
    return {
      type: "error",
      reason: `Unable to find first page revision to convert revision number to ID for pageId=${pageId} and revisionNumber=${revisionNumber}.`,
      data: rev,
    };
  if (rev[0].type === "error") return rev[0];
  const totalRevisionCount = rev[0].number;

  const pageToGet = totalRevisionCount - revisionNumber + 1;
  const foundRev = await getPageRevisions(pageId, pageToGet, 1);

  if (!foundRev[0])
    return {
      type: "error",
      reason: `Unable to find page revision number ${revisionNumber} for page ${pageId}.`,
      data: foundRev,
    };

  return foundRev[0];
}

export async function compareVersions(
  from: string,
  to: string,
): Promise<string | undefined> {
  const res = await asyncRequestModule("history/PageDiffModule", {
    from_revision_id: from,
    to_revision_id: to,
    show_type: "inline",
  });
  if (res.status === "ok") {
    return res.body;
  }
}

export const WikidotResponseWithBody = z.object({
  body: z.string(),
  status: z.literal("ok"),
});

export async function getPageRevisions(
  page_id: string,
  page: number,
  perpage: number,
): Promise<PageRevision[]> {
  const revs = await getPageRevisionsRaw(
    page_id,
    page.toString(),
    perpage.toString(),
  );
  const revs2 = WikidotResponseWithBody.safeParse(revs);
  if (!revs2.data)
    return [
      {
        type: "error",
        reason: `Unrecognized data format for page revisions [${(page - 1) * perpage}, ${page * perpage}). Note that this is on a reverse-chronological basis -- i.e. these numbers are not Wikidot revision numbers.`,
        data: revs,
      },
    ];

  const dom = new DOMParser().parseFromString(revs2.data.body, "text/html");

  return Array.from(
    dom.querySelectorAll("table.page-history > tbody > tr:not(:nth-child(1))"),
  ).map((rev): PageRevision => {
    const number = nanToUndefined(
      parseInt(
        (rev.children?.[0] as HTMLElement | null)?.innerText?.slice(0, -1) ??
          "",
      ),
    );

    const id = rev.id.match(/\d+/g)?.[0];

    if (number === undefined || id === undefined) {
      return {
        type: "error",
        reason: `Revision missing the following fields: ${[
          [number, "number"],
          [id, "id"],
        ]
          .filter((e) => e[0] === undefined)
          .map((e) => e[1])
          .join(", ")}`,
        data: { number, id },
      };
    }

    return {
      type: "revision",
      number,
      id,
    };
  });
}
function nanToUndefined(x: number): number | undefined {
  if (isNaN(x)) return undefined;
  return x;
}
export async function unpaginate<T>(
  getPage: (index: number) => Promise<{
    hasMore: boolean;
    data: T[];
  }>,
): Promise<T[]> {
  let pageIndex = 0;
  const out = [] as T[];
  while (true) {
    const { data, hasMore } = await getPage(pageIndex);
    out.push(...data);
    if (!hasMore) return out;
  }
}

export function getUserRevisionsRaw(
  userId: string,
  page: string,
  count: number,
) {
  return asyncRequestModule("userinfo/UserChangesListModule", {
    page,
    userId,
    options: JSON.stringify({ all: true }),
    perpage: count,
  });
}

export type UserRevision =
  | {
      type: "revision";
      timestamp: number;
      pageUrl: string;
      revisionNumber: number;
    }
  | {
      type: "error";
      reason: string;
      data: any;
    };
export async function revertToRevision(
  pageId: string,
  revisionId: string,
): Promise<{ success: boolean }> {
  const result = await asyncRequestModule("Empty", {
    pageId,
    action: "WikiPageAction",
    event: "revert",
    revisionId,
    force: true,
  });

  return {
    success: typeof result === "object" && result?.status === "ok",
  };
}

export async function revertToRevisionByNumber(
  pageId: string,
  revisionNumber: number,
) {}

export async function getPageRevisionsRaw(
  page_id: string,
  page: string,
  perpage: string,
) {
  return await asyncRequestModule("history/PageRevisionListModule", {
    page,
    perpage,
    page_id,
    options: JSON.stringify({ all: true }),
  });
}

type PageRevision =
  | {
      type: "revision";
      number: number;
      id: string;
    }
  | {
      type: "error";
      reason: string;
      data: any;
    };
