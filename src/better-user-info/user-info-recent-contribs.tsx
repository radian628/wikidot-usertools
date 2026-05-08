import {
  EnumField,
  GetSet,
  groupBy,
  groupByNoCreateByDefault,
  str2html,
  str2int,
  StringField,
  useGetSet,
} from "r628";
import {
  asyncRequestModule,
  fastAsyncRequestModule,
} from "../common/wikidot-api-utils.js";
import { createContext, useContext, useEffect, useRef } from "react";
import {
  compareAsc,
  compareDesc,
  differenceInDays,
  format,
  interval,
} from "date-fns";
import React from "react";
import UserInfoRecentContribsCSS from "./user-info-recent-contribs.css?raw";
import { HighlightSubstring } from "./highlight-substsring.js";
import { getResourceCount, getResourceCountCacheGuess } from "./binsearch.js";
import { ShadowRooted } from "./dom-helpers.js";
import {
  useAsyncInstantState,
  useAsyncState,
  useListAsyncSequence,
} from "../common/async-state-hook.js";
import { mdiFlashAlert } from "@mdi/js";

type GetContribsRequestParams = {
  page: number;
  perPage: number;
  userId: string;
  options: {
    all?: boolean;
    source?: boolean;
    title?: boolean;
    move?: boolean;
    files?: boolean;
    new?: boolean;
    meta?: boolean;
  };
};

export async function getRecentContribsRaw(params: GetContribsRequestParams) {
  return await fastAsyncRequestModule("userinfo/UserChangesListModule", {
    page: params.page.toString(),
    perpage: params.perPage.toString(),
    userId: params.userId,
    options: JSON.stringify(params.options),
  });
}

export async function estimateContribCount(userid: string) {
  console.log("ESTIMATE CONTRIB COUNT");
  async function doesContribExist(n: number) {
    const rows = await getRecentContribs({
      page: n,
      perPage: 1,
      userId: userid,
      options: { all: true },
    });
    if (!rows || rows.length === 0) {
      return false;
    }
    return true;
  }
  return await getResourceCountCacheGuess(
    doesContribExist,
    `contrib-count-${userid}-guess`,
  );
}

export async function getRecentContribs(params: GetContribsRequestParams) {
  const res = await getRecentContribsRaw(params);
  if (res.status !== "ok") {
    return;
  }
  return parseChangesListItems(str2html(res.body).body);
}

export type ChangesListItem = {
  site: string | undefined;
  sitelink: string | undefined;
  pagelink: string | undefined;
  pagetitle: string | undefined;
  flags: string | undefined;
  date: Date | undefined;
  revno: number | undefined;
  comments: string | undefined;
};

function elemprop(
  root: HTMLElement,
  selector: string,
  prop: string,
): string | undefined {
  const e = root.querySelector(selector) as HTMLElement | null;
  if (e)
    return (
      (prop === "innerText" ? e.innerText : e.getAttribute(prop)) ?? undefined
    );
  return undefined;
}

function elempropwith<V>(
  root: HTMLElement,
  selector: string,
  prop: string,
  cb: (p: string) => V,
): V | undefined {
  const e = root.querySelector(selector) as HTMLElement | null;
  const attr = prop === "innerText" ? e?.innerText : e?.getAttribute(prop);
  if (attr) return cb(attr);
  return undefined;
}

export function parseChangesListItem(cli: HTMLElement): ChangesListItem {
  return {
    site: elemprop(cli, ".site a", "innerText")?.trim(),
    sitelink: elemprop(cli, ".site a", "href"),
    pagetitle: elemprop(cli, ".title a", "innerText")?.trim(),
    pagelink: elemprop(cli, ".title a", "href"),
    flags: elemprop(cli, ".flags", "innerText")?.trim(),
    date:
      elempropwith(
        cli,
        ".mod-date .odate",
        "class",
        (e) =>
          new Date(1000 * Number(e.match(/time_\d+/g)?.[0]?.slice(5) ?? "0")),
      ) ?? undefined,
    revno: elempropwith(cli, ".revision-no", "innerText", (e) => {
      const num = Number(e.match(/\d+/g)?.[0]);
      if (isNaN(num)) {
        return undefined;
      }
      return num;
    }),
    comments: elemprop(cli, ".comments", "innerText")?.trim(),
  };
}

export function parseChangesListItems(clis: HTMLElement): ChangesListItem[] {
  return (
    Array.from(clis.querySelectorAll(".changes-list-item")) as HTMLElement[]
  ).map(parseChangesListItem);
}

const searchRegexContext = createContext<RegExp | undefined>(undefined);

export function UserInfoRecentContribs(props: { userid: string }) {
  const contribs = useListAsyncSequence<ChangesListItem>(
    async (i) => {
      const revs = await loadMoreRevisions(i + 1);
      if (!revs)
        return {
          hasMore: false,
          data: [],
        };
      return {
        hasMore: revs.length > 0,
        data: revs,
      };
    },
    [props.userid],
  );

  const revCountEstimate = useAsyncState(
    () => estimateContribCount(props.userid),
    [props.userid],
  );
  console.log("revcount", revCountEstimate);

  async function loadMoreRevisions(page: number) {
    return await getRecentContribs({
      page,
      perPage: 200,
      userId: props.userid,
      options: { all: true },
    });
  }

  const displayMode = useGetSet<"in-order" | "per-page">("in-order");

  const search = useGetSet<string>("");

  const searchRegex =
    search.value.length > 0
      ? new RegExp(RegExp.escape(search.value), "gi")
      : undefined;

  const filteredContribs = contribs.value.filter((c) => {
    if (!searchRegex) return true;
    if (c.site?.match(searchRegex)) return true;
    if (c.pagetitle?.match(searchRegex)) return true;
    if (c.comments?.match(searchRegex)) return true;
    return false;
  });

  const filterAmountLoaded =
    search.value.length > 0 ? (
      <span className="comments">
        ({filteredContribs.length} / {contribs.value.length} match)
      </span>
    ) : (
      <></>
    );

  return (
    <ShadowRooted>
      <searchRegexContext.Provider value={searchRegex}>
        <div className="recent-contribs">
          <style>{UserInfoRecentContribsCSS}</style>
          <div className="recent-contribs-header">
            <div>
              Search: <StringField {...search}></StringField>{" "}
              {filterAmountLoaded}
            </div>
            <div>
              Chronological Order:
              <EnumField
                {...displayMode}
                variants={[
                  ["in-order", "Per-Edit"],
                  ["per-page", "Per-Page"],
                ]}
              ></EnumField>
            </div>
            {displayMode.value === "per-page" && (
              <div>
                <button
                  onClick={() => {
                    contribs.loadMore();
                  }}
                >
                  Load More Revisions
                </button>{" "}
                ({contribs.value.length} / {revCountEstimate.value ?? "???"}{" "}
                loaded)
              </div>
            )}
            {displayMode.value === "in-order" && (
              <div>
                {contribs.value.length} / {revCountEstimate.value ?? "???"}{" "}
                revisions loaded
              </div>
            )}
          </div>
          <div className="recent-contribs-list">
            {displayMode.value === "per-page" && (
              <RecentContribsByPageList
                contribs={filteredContribs}
              ></RecentContribsByPageList>
            )}
            {displayMode.value === "in-order" && (
              <RecentContribsInOrderList
                contribs={filteredContribs}
                getMore={async () => {
                  await contribs.loadMore();
                }}
                userid={props.userid}
              ></RecentContribsInOrderList>
            )}
          </div>
        </div>
      </searchRegexContext.Provider>
    </ShadowRooted>
  );
}

function SearchRes(props: { children: string | undefined }) {
  const rgx = useContext(searchRegexContext);
  return (
    <HighlightSubstring highlight={rgx}>{props.children}</HighlightSubstring>
  );
}

function groupByContiguous<T>(
  arr: T[],
  sameGroup: (a: T, b: T) => boolean,
): [T, ...T[]][] {
  let groups: [T, ...T[]][] = [];
  if (arr.length === 0) return groups;

  groups.push([arr[0]]);
  for (const e of arr.slice(1)) {
    const lastGroup = groups.at(-1)!;
    const lastElem = lastGroup.at(-1)!;
    if (sameGroup(lastElem, e)) {
      lastGroup.push(e);
    } else {
      groups.push([e]);
    }
  }
  return groups;
}

function PageSubheaderContents(props: {
  title: string | undefined;
  link: string | undefined;
}) {
  const site = props.link
    ? URL.parse(props.link, window.location.href)?.hostname.split(".")?.[0]
    : undefined;

  return (
    <>
      <a className="" href={props.link}>
        <SearchRes>{props.title}</SearchRes>
      </a>{" "}
      <a className="comments" href={props.link + "?withRevisionOpen=0"}>
        (Rev.0)
      </a>{" "}
      {props.link && (
        <span className="comments">
          <SearchRes>{site}</SearchRes>
        </span>
      )}
    </>
  );
}

function DateSubheaderContents(props: { date: Date | undefined }) {
  return (
    <span className="date">{props.date && format(props.date, "d LLL y")}</span>
  );
}

function RecentContribRowContents(props: { edit: ChangesListItem }) {
  const { edit } = props;
  return (
    <>
      <a
        className="revno"
        href={edit.pagelink + "?withRevisionOpen=" + (edit.revno ?? 0)}
      >
        {edit.revno ?? "0"}
      </a>
      <span className="date">{edit.date && format(edit.date, "HH:mm:ss")}</span>
      <span className="comments">
        <SearchRes>{edit.comments ?? ""}</SearchRes>
      </span>
    </>
  );
}

function RecentContribsInOrderList(props: {
  contribs: ChangesListItem[];
  getMore: () => Promise<void>;
  userid: string;
}) {
  const isIntersecting = useRef(false);

  useEffect(() => {
    let keepRepeating = true;

    let lastLoad = 0;

    const interval = async () => {
      if (isIntersecting.current && performance.now() - lastLoad > 500) {
        props.getMore();
        lastLoad = performance.now();
      }

      if (!keepRepeating) return;
      setTimeout(interval, 0);
    };

    interval();

    return () => {
      keepRepeating = false;
    };
  }, [props.userid]);

  const recentContribsOrdered = groupByContiguous(
    [...props.contribs].sort((a, b) =>
      compareDesc(a.date ?? new Date(0), b.date ?? new Date(0)),
    ),
    (a, b) =>
      (a.date ? differenceInDays(a.date, new Date(1900, 1, 1)) : 0) ===
      (b.date ? differenceInDays(b.date, new Date(1900, 1, 1)) : 0),
  ).map((order) =>
    groupByContiguous(order, (a, b) => a.pagelink === b.pagelink),
  );

  return (
    <>
      <ul className="recent-contribs-top-level-list">
        {recentContribsOrdered.map((editsPerDay, i) => {
          const edit = editsPerDay[0][0];
          return (
            <li key={i}>
              <div className="date subheader">
                <DateSubheaderContents date={edit.date}></DateSubheaderContents>
              </div>
              <ul>
                {editsPerDay.map((editsPerPage, i) => {
                  const edit = editsPerPage[0];
                  return (
                    <li key={i}>
                      <div className="subheader subheader2">
                        <PageSubheaderContents
                          title={edit.pagetitle}
                          link={edit.pagelink}
                        ></PageSubheaderContents>
                      </div>
                      <ul>
                        {editsPerPage.map((edit) => (
                          <li
                            key={edit.revno ?? -1}
                            className="recent-contrib-row"
                          >
                            <RecentContribRowContents
                              edit={edit}
                            ></RecentContribRowContents>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div
        style={{
          marginTop: "-150vh",
          height: "150vh",
        }}
        ref={(e) => {
          if (!e) return;
          const o = new IntersectionObserver((records) => {
            for (const r of records) {
              isIntersecting.current = r.isIntersecting;
            }
          });
          o.observe(e);
          return () => {
            o.disconnect();
          };
        }}
      ></div>
    </>
  );
}

function RecentContribsByPageList(props: { contribs: ChangesListItem[] }) {
  const { contribs } = props;

  const editsByPage = groupByNoCreateByDefault(contribs, (c) => c.pagelink);

  const sortedEditsByPage = [...editsByPage]
    .map(([pagelink, e]) => {
      const sortedEdits = e.sort((a, b) =>
        compareDesc(a.date ?? new Date(0), b.date ?? new Date(0)),
      );

      return {
        pagelink,
        title: sortedEdits[0].pagetitle,
        edits: groupByNoCreateByDefault(sortedEdits, (e) =>
          e.date ? differenceInDays(e.date, new Date(1900, 1, 1)) : 0,
        ),
        lastEdited: sortedEdits[0].date,
      };
    })
    .sort((a, b) =>
      compareDesc(a.lastEdited ?? new Date(0), b.lastEdited ?? new Date(0)),
    );

  return (
    <ul className="recent-contribs-top-level-list">
      {sortedEditsByPage.map((e) => (
        <li key={e.pagelink}>
          <div className="subheader">
            <PageSubheaderContents
              title={e.title}
              link={e.pagelink}
            ></PageSubheaderContents>
          </div>
          <ul>
            {[...e.edits].map(([_, editList], i) => {
              return (
                <li key={i}>
                  <div className="subheader subheader2">
                    <DateSubheaderContents
                      date={editList[0].date}
                    ></DateSubheaderContents>
                  </div>
                  <ul>
                    {editList.map((edit, i) => (
                      <li key={i} className="recent-contrib-row">
                        <RecentContribRowContents
                          edit={edit}
                        ></RecentContribRowContents>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
