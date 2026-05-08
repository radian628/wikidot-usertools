import {
  GetSet,
  SmartGetSet,
  smartGetSet,
  str2html,
  StringField,
  useAsyncSequence,
  useGetSet,
  usePiecemealMemo,
  virtualArrayController,
  VirtualArrayField,
} from "r628";
import { UsertoolPlugin } from "../combined/plugin.js";
import { asyncRequestModule } from "../common/wikidot-api-utils.js";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { format } from "date-fns";

function getForumPage(threadId: string, page: number) {
  return asyncRequestModule("forum/ForumViewThreadPostsModule", {
    pageNo: page.toString(),
    t: threadId,
    order: "",
  });
}

async function getForumPageDom(threadId: string, page: number) {
  const pageData = await getForumPage(threadId, page);
  if (!pageData.body) return;
  const dom = str2html(pageData.body);
  return dom;
}

function getForumPosts(posts: HTMLElement) {
  const postElements = Array.from(posts.children).filter((e) =>
    e.classList.contains("post-container"),
  );
  return postElements as HTMLElement[];
}

async function getForumPostById(threadId: string, postId: string) {
  const data = await asyncRequestModule("forum/ForumViewThreadPostsModule", {
    t: threadId,
    postId,
    order: "",
  });

  if (!data.body) return;

  const dom = str2html(data.body);

  const postDom = dom.querySelector("#fpc-" + postId) as HTMLElement | null;
  return postDom ? parseForumPost(postDom) : undefined;
}

function parseForumPosts(posts: HTMLElement) {
  const postElements = getForumPosts(posts);
  return postElements.map(parseForumPost).flatMap((e) => (e ? [e] : []));
}

type ForumPost = {
  id: string;
  title: string | null;
  content: Element[];
  replies: ForumPost[];
  username: string | null;
  userUrl: string | null;
  userid: string | null;
  date: Date | null;
};

function parseForumPost(postContainer: HTMLElement): ForumPost | undefined {
  const post = postContainer.children[0];
  if (!post) return;
  const title = post.querySelector(".title")?.textContent?.trim() ?? null;
  const content = Array.from(post.querySelector(".content")?.children ?? []);
  const id = post.id.slice(5);
  const userlink = post.querySelector(".info .printuser a:nth-child(2)");
  const username = userlink?.textContent.trim() ?? null;
  const userUrl = userlink?.getAttribute("href") ?? null;
  const userid = userlink?.getAttribute("onclick")?.match(/\d+/g)?.[0] ?? null;
  const datestr =
    post
      .querySelector(".info .odate")
      ?.getAttribute("class")
      ?.match(/time_\d+/g)?.[0]
      ?.slice(5) ?? null;
  const date = new Date(Number(datestr) * 1000);

  return {
    date,
    userid,
    username,
    userUrl,
    id,
    title,
    content,
    replies: parseForumPosts(postContainer),
  };
}

export const BetterForumViewPlugin: UsertoolPlugin<{}> = {
  name: "Better Forum View",
  async onPageLoad() {
    await initBetterForumView();
  },
  shouldRun: (u) => {
    return u.pathname.startsWith("/forum/");
  },
  defaultSettings: {},
};

const q = (query: string) => document.querySelector(query);

async function initBetterForumView() {
  const forumThreadBox = q("#page-content > .forum-thread-box");
  if (!forumThreadBox) return;

  const pager = q("#thread-container-posts > .pager");
  pager?.remove();

  const newForumThreadBox = document.createElement("div");

  forumThreadBox.insertAdjacentElement("beforebegin", newForumThreadBox);
  forumThreadBox.remove();

  const threadId = window.location.pathname.split("/")[2].slice(2);
  const firstForumPage = await getForumPageDom(threadId, 1);

  let pageCount = Number(
    firstForumPage
      ?.querySelector(".pager-no")
      ?.textContent.trim()
      .match(/\d+$/g)?.[0],
  );

  if (isNaN(pageCount)) pageCount = 1;

  createRoot(newForumThreadBox).render(
    // <ForumListView posts={parsedFirstForumPage}></ForumListView>,
    <ForumView pageCount={pageCount}></ForumView>,
  );
}

function postContains(post: ForumPost, str: string) {
  if (post.title?.toLowerCase()?.includes(str)) return true;
  if (post.content.some((e) => e.textContent.toLowerCase().includes(str)))
    return true;
  if (post.username?.toLowerCase()?.includes(str)) return true;
  if (post.replies.some((p) => postContains(p, str))) return true;
  return false;
}

function ForumView(props: { pageCount: number }) {
  // const posts = useGetSet<{
  //   data: ForumPost[];
  //   execIndex: number;
  //   postIndexMin: number;
  //   postIndexMax: number;
  //   hasMore: boolean;
  // }>({
  //   data: [],
  //   execIndex: 0,
  //   postIndexMin: 10,
  //   postIndexMax: 11,
  //   hasMore: true,
  // });
  // const [shouldPrependMoreRows, setShouldPrependMoreRows] = useState(false);
  // const [shouldPushMoreRows, setShouldPushMoreRows] = useState(false);

  const searchQuery = useGetSet("");

  // useEffect(() => {
  //   if ((shouldPushMoreRows || shouldPrependMoreRows) && posts.value.hasMore) {
  //     (async () => {
  //       const threadId = window.location.pathname.split("/")[2].slice(2);

  //       const nextForumPage = await getForumPageDom(
  //         threadId,
  //         posts.value.postIndexMax,
  //       );
  //       if (!nextForumPage) return;
  //       const postData = await parseForumPosts(nextForumPage.body);

  //       posts.setValue((v) => {
  //         if (v.execIndex !== posts.value.execIndex) {
  //           return v;
  //         }

  //         return {
  //           data: [...v.data, ...postData],
  //           execIndex: v.execIndex,
  //           postIndexMin: v.postIndexMin,
  //           postIndexMax: v.postIndexMax + 1,
  //           hasMore: postData.length > 0,
  //         };
  //       });
  //     })();
  //   }
  // }, [posts, shouldPushMoreRows]);

  const [showEditor, setShowEditor] = useState<boolean>(false);

  // if (!posts) {
  //   return <div>Loading...</div>;
  // }

  async function getPostPage(num: number) {
    const threadId = window.location.pathname.split("/")[2].slice(2);
    const nextForumPage = await getForumPageDom(threadId, num);
    if (!nextForumPage) return;
    const postData = await parseForumPosts(nextForumPage.body);
    return postData;
  }

  const controller = virtualArrayController({
    load: async (x) => {
      return { data: (await getPostPage(x)) ?? [] };
    },
    estimatedElementSize: 200,
    loadDependencies: [searchQuery],
    initIndex: 1,
    minOffset: 5000,
    maxOffset: 10000,
    escapeOffset: 15000,
    overscan: 2000,
    lowest: 0,
    highest: props.pageCount,
    Element: (props) => {
      return <ForumListView {...props}></ForumListView>;
    },
    refetchInterval: 250,
    startRegionSize: 1000,
    endRegionSize: 1000,
  });

  return (
    <div
      className="thread-container"
      ref={(e) => {
        if (!e) return;
        const clickListener = (e: MouseEvent) => {
          if (!(e.target instanceof HTMLElement)) return;
          if (e.target.classList.contains("collapsible-block-link")) {
            let parent = e.target.parentElement;
            if (parent?.classList.contains("collapsible-block-unfolded-link")) {
              parent = parent.parentElement;
            }
            if (!parent) return;
            if (parent.classList.contains("collapsible-block-folded")) {
              parent.style.display = "none";
              if (parent.nextElementSibling instanceof HTMLElement)
                parent.nextElementSibling.style.display = "block";
            } else {
              parent.style.display = "none";
              if (parent.previousElementSibling instanceof HTMLElement)
                parent.previousElementSibling.style.display = "block";
            }
          }
        };
        e.addEventListener("click", clickListener);
        return () => {
          e.removeEventListener("click", clickListener);
        };
      }}
    >
      <VirtualArrayField controller={controller}></VirtualArrayField>
      {!showEditor && (
        <button
          onClick={() => {
            setShowEditor(true);
          }}
        >
          Reply
        </button>
      )}
      {showEditor && (
        <ForumPostEditor
          onSave={async (title, content) => {
            const threadId = window.location.pathname.split("/")[2].slice(2);
            const res = await asyncRequestModule("Empty", {
              action: "ForumAction",
              event: "savePost",
              source: content,
              title: title,
              parentId: "",
              threadId,
            });
            if (res.status === "ok") {
              const newPost = await getForumPostById(
                threadId,
                res.postId.toString(),
              );
            } else {
              alert("Failed to create new forum post.");
            }
          }}
        ></ForumPostEditor>
      )}
    </div>
  );
}

function ForumListView(
  props: SmartGetSet<ForumPost[]> & { filter?: (p: ForumPost) => boolean },
) {
  return (
    <>
      {props.each((p) =>
        (props.filter?.(p.value) ?? true) ? (
          <ForumPostView {...p} key={p.value.id} list={props}></ForumPostView>
        ) : (
          <></>
        ),
      )}
    </>
  );
}

function ForumPostView(
  props: SmartGetSet<ForumPost> & { list: SmartGetSet<ForumPost[]> },
) {
  const post = props.value;

  const [showEditor, setShowEditor] = useState<boolean>(false);

  return (
    <div className="post-container">
      <div className="post" id={`post-${post.id}`}>
        <div className="long">
          <div className="head">
            <div className="title">{post.title ?? ""}</div>
            <div className="info">
              <span className="printuser avatarhover">
                <a>
                  {post.userid && (
                    <img
                      src={`https://www.wikidot.com/avatar.php?userid=${post.userid}&size=small`}
                      alt={post.username ?? ""}
                      className="small"
                      style={{
                        backgroundImage: `url("https://www.wikidot.com/userkarma.php?u=${post.userid}")`,
                      }}
                    />
                  )}
                </a>
                {post.userUrl && <a href={post.userUrl}>{post.username}</a>}
                {post.date && (
                  <span className="">
                    {" "}
                    {format(post.date, "d LLL y, hh:mm")}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div
            className="content"
            ref={(e) => {
              if (!post.content || !e) return;
              for (const child of post.content) {
                e.appendChild(child);
              }

              return () => {
                if (!post.content) return;
                for (const child of post.content) {
                  e.removeChild(child);
                }
              };
            }}
          ></div>
          {!showEditor && (
            <button
              onClick={() => {
                setShowEditor(true);
              }}
            >
              Reply
            </button>
          )}
          {showEditor && (
            <ForumPostEditor
              onSave={async (title, content) => {
                const threadId = window.location.pathname
                  .split("/")[2]
                  .slice(2);
                const res = await asyncRequestModule("Empty", {
                  action: "ForumAction",
                  event: "savePost",
                  source: content,
                  title: title,
                  parentId: post.id,
                  threadId,
                });
                if (res.status === "ok") {
                  const newPost = await getForumPostById(
                    threadId,
                    res.postId.toString(),
                  );
                  if (!newPost) {
                    alert("Created new forum post, but failed to find it.");
                    return;
                  }
                  props.prop("replies").setValue((rs) => [...rs, newPost]);

                  setTimeout(() => {
                    document
                      .getElementById("post-" + newPost.id)
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 250);
                } else {
                  alert("Failed to create new forum post.");
                }
              }}
            ></ForumPostEditor>
          )}
        </div>
      </div>
      <ForumListView {...props.prop("replies")}></ForumListView>
    </div>
  );
}

export function ForumPostEditor(props: {
  onSave: (title: string, content: string) => Promise<void>;
}) {
  const editorContent = useGetSet("");
  const editorTitle = useGetSet("");

  return (
    <div className="editor">
      <StringField {...editorTitle}></StringField>
      <StringField isTextarea {...editorContent}></StringField>
      <button
        onClick={() => {
          props.onSave(editorTitle.value, editorContent.value);
        }}
      >
        Post
      </button>
    </div>
  );
}
