import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import React, { useEffect, useRef, useState } from "react";
import { getPageSource, setPageSource } from "./better-editor.user.js";
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

export function Editor(props: {
  save: (state: string) => void;
  replaceIframeStylesheets: (sheets: string[]) => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = rootRef.current;
    if (!div) return;

    (async () => {
      const worker = createWorkerWithInterface<typeof WorkerBridge>(
        "w1",
        `data:application/javascript,${encodeURIComponent(WorkerSource)}`
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

      const rawPageSource = (await getPageSource(window.location.href))
        .trimStart()
        .replaceAll("\xA0", " ");

      const view = new EditorView({
        doc: (await preprocess(rawPageSource, 0, false)).str,
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
                props.save(view.state.sliceDoc(0, view.state.doc.length));
                return true;
              },
            },
          ]),
          lineNumbers(),
          embeddedCSSLang,
          history(),
          EditorView.updateListener.of((e) => {
            if (!e.docChanged) return;
            (async () => {
              const sheets = await worker.extractStylesheets(
                e.state.sliceDoc(0, e.state.doc.length)
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

export function App() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [fract, setFract] = useState(0.5);

  const [isResizing, setIsResizing] = useState(false);

  return (
    <>
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
