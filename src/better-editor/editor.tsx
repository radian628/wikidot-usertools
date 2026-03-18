import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import React, { useEffect, useRef, useState } from "react";
import { defaultKeymap, indentWithTab, history } from "@codemirror/commands";
import { buildParser } from "@lezer/generator";
import { parseMixed } from "@lezer/common";
import * as cssParser from "@lezer/css";
import * as htmlParser from "@lezer/html";
import * as jsParser from "@lezer/javascript";
import { ensureSyntaxTree, LRLanguage } from "@codemirror/language";
import {
  cssModuleParser,
  embeddedJSInCssFinderParser,
} from "./css-module-parser.js";
import { createWorkerWithInterface } from "../../r628/src/workerify.js";
import WorkerSource from "./better-editor-worker.ts?bpt";
import { WorkerBridge } from "./better-editor-worker-bridge.js";
import { workerifyClientIframe } from "r628";
import { IframeBridge } from "./better-editor-iframe-bridge.js";
import { preprocess } from "./preprocess.js";
import { diff } from "@codemirror/merge";
import { search, searchKeymap } from "@codemirror/search";
import {
  defaultThrottle,
  getPageId,
  getPageSource,
  setPageSource,
} from "../common/wikidot-api-utils.js";

async function getFormattedPageSource(url: string) {
  const rawPageSource = (await getPageSource(window.location.href))
    .trimStart()
    .replaceAll("\xA0", " ");
  return (await preprocess(rawPageSource, 0, false)).str;
}

export function Editor(props: {
  save: (state: string) => Promise<void>;
  replaceIframeStylesheets: (sheets: string[]) => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = rootRef.current;
    if (!div) return;

    (async () => {
      const worker = createWorkerWithInterface<typeof WorkerBridge>(
        "w1",
        `data:application/javascript,${encodeURIComponent(WorkerSource)}`,
      );

      console.log(worker);

      const extendedCSSParser = cssParser.parser.configure({
        wrap: parseMixed((node) => {
          if (node.name === "Comment")
            return { parser: embeddedJSInCssFinderParser };
          return null;
        }),
      });

      const configuredHTMLParser = htmlParser.parser.configure({
        wrap: htmlParser.configureNesting([
          {
            tag: "script",
            parser: jsParser.parser,
          },
          {
            tag: "style",
            parser: extendedCSSParser,
          },
        ]),
      });

      const embeddedCSSParser = cssModuleParser.configure({
        wrap: parseMixed((node) => {
          if (node.name === "CSSModuleContent") {
            return { parser: extendedCSSParser };
          } else if (node.name === "HTMLBlockContent") {
            return {
              parser: configuredHTMLParser,
            };
          } else if (node.name === "JSCommentContent") {
            return {
              parser: jsParser.parser,
            };
          }
          return null; // aa
        }),
      });

      const embeddedCSSLang = LRLanguage.define({
        parser: embeddedCSSParser,
      });

      let revnum = await getLatestRevisionNumber(window.location.href);

      const view = new EditorView({
        doc: await getFormattedPageSource(window.location.href),
        parent: div,
        extensions: [
          EditorView.lineWrapping,
          oneDark,
          keymap.of([
            ...defaultKeymap,
            indentWithTab,
            {
              key: "Ctrl-s",
              run: () => {
                (async () => {
                  const currDoc = view.state.sliceDoc(0, view.state.doc.length);
                  if (
                    currDoc.includes("<<<<<<<") ||
                    currDoc.includes(">>>>>>>") ||
                    currDoc.includes("=======")
                  ) {
                    window.alert(
                      "Pending merge conflicts detected! Resolve them before merging!",
                    );
                    return;
                  }
                  const revnum2 = await getLatestRevisionNumber(
                    window.location.href,
                  );
                  console.log("revs", revnum, revnum2);
                  if (revnum !== revnum2 && false) {
                    window.alert(
                      "This revision is out of date. Please merge your changes before continuing.",
                    );

                    const a = view.state.sliceDoc(0, view.state.doc.length);
                    const b = await getFormattedPageSource(
                      window.location.href,
                    );

                    const changes = diff(a, b);

                    view.dispatch({
                      changes: changes.map((ch) => {
                        const strA = a.slice(ch.fromA, ch.toA);
                        const strB = b.slice(ch.fromB, ch.toB);

                        return {
                          from: ch.fromA,
                          to: ch.toA,
                          insert: `\n<<<<<<< Your Code\n${strA}\n=======\n${strB}\n>>>>>>> Their Code\n`,
                        };
                      }),
                    });
                  } else {
                    await props.save(
                      view.state.sliceDoc(0, view.state.doc.length),
                    );
                  }

                  revnum = await getLatestRevisionNumber(window.location.href);
                })();
                return true;
              },
            },
          ]),
          lineNumbers(),
          embeddedCSSLang,
          keymap.of(searchKeymap),
          search(),
          history(),
          EditorView.updateListener.of((e) => {
            if (!e.docChanged) return;
            (async () => {
              const sheets = await worker.extractStylesheets(
                e.state.sliceDoc(0, e.state.doc.length),
              );
              props.replaceIframeStylesheets(sheets);
            })();
          }),
        ],
      });
    })();
  }, []);

  return <div ref={rootRef}></div>;
}

const getRevisions = defaultThrottle(async function (page_id, page, perpage) {
  return new Promise((resolve, reject) => {
    OZONE.ajax.requestModule(
      "history/PageRevisionListModule",
      {
        page,
        perpage,
        page_id,
        options: JSON.stringify({ all: true }),
      },
      function (e) {
        resolve(e);
      },
    );
  });
});

function formatRevisions(body: string) {
  const dom = new DOMParser().parseFromString(body, "text/html");
  return Array.from(
    dom.querySelectorAll("table.page-history > tbody > tr:not(:nth-child(1))"),
  )
    .map((i) => {
      const number = (i.children?.[0] as HTMLElement)?.innerText;
      if (!number) return;
      const id = i.id.match(/\d+/g)?.[0];
      if (!id) return;
      return {
        number,
        id,
      };
    })
    .filter((e) => e);
}

export async function getLatestRevisionNumber(url: string) {
  const pageid = await getPageId(url);
  const revs = (await getRevisions(pageid, 1, 1)) as any;
  console.log("REVISIONS", revs);
  const fmted = await formatRevisions(revs.body);
  return fmted[0]?.number ?? "0";
}

export function App() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [fract, setFract] = useState(0.5);

  const [isResizing, setIsResizing] = useState(false);

  const customCss = window.localStorage.getItem("better-editor-custom-css");

  return (
    <>
      {customCss && <style>{customCss}</style>}
      <style>{`.cm-editor { height: 100vh; }`}</style>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <div style={{ height: "100vh", width: `${100 * fract}vw` }}>
          <Editor
            save={async (c) => {
              const preprocessed = await preprocess(c, 0, true);
              await setPageSource(window.location.href, preprocessed.str);
              iframeRef.current?.contentWindow?.location.reload();
              console.log("refreshed iframe");
            }}
            replaceIframeStylesheets={(sheets) => {
              if (!iframeRef.current || !iframeRef.current.contentWindow)
                return;
              const iframeInterface = workerifyClientIframe<
                typeof IframeBridge
              >("iframe", iframeRef.current.contentWindow);
              iframeInterface.replaceStylesheets(sheets);
            }}
          ></Editor>
        </div>
        <div
          style={{
            height: "100vh",
            cursor: "col-resize",
            width: "10px",
            marginLeft: "-5px",
            marginRight: "-5px",
            position: "relative",
            zIndex: 2,
          }}
          onMouseDown={() => {
            setIsResizing(true);

            const mousemoveListener = (e: MouseEvent) => {
              setFract((fract) => fract + e.movementX / window.innerWidth);
            };

            const mouseupListener = (e: MouseEvent) => {
              document.removeEventListener("mousemove", mousemoveListener);
              document.removeEventListener("mouseup", mouseupListener);
              setIsResizing(false);
            };

            document.addEventListener("mousemove", mousemoveListener);
            document.addEventListener("mouseup", mouseupListener);
          }}
        ></div>
        <div style={{ width: `${100 * (1 - fract)}vw` }}>
          <iframe
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: isResizing ? "none" : "all",
            }}
            src={window.location.href}
            ref={iframeRef}
          ></iframe>
        </div>
      </div>
    </>
  );
}
