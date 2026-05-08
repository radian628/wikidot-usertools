import { str2html, StringField, useGetSet } from "r628";
import { fastAsyncRequestModule } from "../common/wikidot-api-utils.js";
import React, { useEffect, useRef } from "react";
import UserInfoRecentCommentsCSS from "./user-info-recent-comments.css?raw";
import { RawDom, ShadowRooted } from "./dom-helpers.js";
import { getResourceCount, getResourceCountCacheGuess } from "./binsearch.js";
import {
  useAsyncInstantState,
  useAsyncState,
  useListAsyncSequence,
} from "../common/async-state-hook.js";

type GetCommentsRequestParams = {
  page: number;
  userId: string;
};

export async function getRecentCommentsRaw(params: GetCommentsRequestParams) {
  return await fastAsyncRequestModule("userinfo/UserRecentPostsListModule", {
    page: params.page,
    userId: params.userId,
  });
}

type CommentInfo = {
  comment: Element;
};

export async function getRecentComments(
  params: GetCommentsRequestParams,
): Promise<CommentInfo[] | undefined> {
  const raw = await getRecentCommentsRaw(params);
  if (raw.status !== "ok") return;
  const html = str2html(raw.body);
  return [...html.querySelectorAll(".thread-container > .post")].map((e) => ({
    comment: e,
  }));
}

export async function estimateCommentCount(userid: string) {
  const PAGE_SIZE = 20;
  return await getResourceCountCacheGuess(async (i) => {
    const zeroIndexed = i - 1;
    const pageZeroIndex = Math.floor(i / PAGE_SIZE);
    const indexWithinPage = zeroIndexed % PAGE_SIZE;
    const page = pageZeroIndex + 1;
    const comments = await getRecentComments({ userId: userid, page });
    return comments?.[indexWithinPage] ? true : false;
  }, `comment-count-${userid}-guess`);
}

export function UserInfoRecentComments(props: { userid: string }) {
  const comments = useListAsyncSequence(
    async (i) => {
      const page = await getRecentComments({
        page: i + 1,
        userId: props.userid,
      });

      return {
        data: page ?? [],
        hasMore: page ? page.length > 0 : false,
      };
    },
    [props.userid],
  );

  const isIntersecting = useRef(false);

  useEffect(() => {
    let keepRepeating = true;
    let pageIndex = 1;

    const interval = async () => {
      if (isIntersecting.current) {
        comments.loadMore();
      }

      if (!keepRepeating) return;

      setTimeout(interval, 100);
    };

    interval();

    return () => {
      keepRepeating = false;
    };
  }, [props.userid]);

  const commentCountEstimate = useAsyncState(
    () => estimateCommentCount(props.userid),
    [props.userid],
  );

  const search = useGetSet("");

  const searchRegex = new RegExp(RegExp.escape(search.value), "gi");

  const filteredComments = comments.value
    .map((c, i) => [c, i] as const)
    .filter(([c, i]) => c.comment.textContent.match(searchRegex));

  return (
    <ShadowRooted>
      <div className="recent-comments">
        <style>{UserInfoRecentCommentsCSS}</style>
        <div className="recent-comments-header">
          <div>
            Search: <StringField {...search}></StringField>
          </div>
          <div>
            {comments.value.length} / {commentCountEstimate.value ?? "???"}{" "}
            comments loaded
          </div>
        </div>
        <div className="comments-list">
          {filteredComments.map(([c, i]) => (
            <RawDom dom={c.comment} key={i}></RawDom>
          ))}
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
        </div>
      </div>
    </ShadowRooted>
  );
}
