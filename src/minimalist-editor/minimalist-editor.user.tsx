/*!
// ==UserScript==
// @name        Minimalist Wikidot Editor
// @namespace   Violentmonkey Scripts
// @grant       none
// @match *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { injectFunction } from "../../r628/src/inject.js";
import EditorCSS from "./editor.css?raw";
import { getPageSource, setPageSource } from "../common/wikidot-api-utils.js";

function initializeEditor() {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
  // @ts-expect-error
  OZONE.utils.addJavascriptUrl = () => {};
  const domRoot = document.createElement("div");
  document.body.appendChild(domRoot);
  const reactRoot = createRoot(domRoot);
  reactRoot.render(<App></App>);
}

let lastSaved: string | undefined = undefined;

function App() {
  const editorRootRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const editorHeightCheckerRef = useRef<HTMLDivElement | null>(null);
  const editorCaretCheckerRef = useRef<HTMLDivElement | null>(null);

  const [text, setText] = useState<string | undefined>(undefined);

  const [selectText, setSelectText] = useState<string>("");

  const forceScrollRef = useRef(false);

  const latestText = useRef<string | undefined>(undefined);

  useEffect(() => {
    latestText.current = text;
  }, [text]);

  const [saveNotif, setSaveNotif] = useState(false);

  async function save(onSuccess?: () => void) {
    const text = latestText.current;
    if (text === undefined || text === lastSaved) return;
    await setPageSource(window.location.href, text);
    lastSaved = text;
    onSuccess?.();
  }

  useEffect(() => {
    if (text === undefined) {
      (async () => {
        const src = await getPageSource(window.location.href);
        setText(src.trim());
        lastSaved = src;
      })();
    }
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, 60000);

    const keydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        console.log("savedd!!!!!");
        e.preventDefault();
        save(() => {
          setSaveNotif(true);

          setTimeout(() => {
            setSaveNotif(false);
          }, 2000);
        });
      }
    };

    document.addEventListener("keydown", keydown);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", keydown);
    };
  }, []);

  useEffect(() => {
    if (!editorHeightCheckerRef.current) return;
    const obs = new ResizeObserver(() => {
      if (!editorRef.current) return;
      if (!editorHeightCheckerRef.current) return;
      editorRef.current.style.height =
        editorHeightCheckerRef.current.getBoundingClientRect().height +
        60 +
        "px";
    });
    obs.observe(editorHeightCheckerRef.current);
    return () => {
      obs.disconnect();
    };
  }, [text]);

  if (text === undefined) return <div>Loading...</div>;

  return (
    <>
      <style>{EditorCSS}</style>
      <div className="minimalist-editor-root" ref={editorRootRef}>
        {saveNotif && <div className="save-notif">Saved!</div>}
        <textarea
          value={text}
          spellCheck="false"
          ref={(e) => {
            editorRef.current = e;
            e?.focus();

            let stoplooping = false;

            function loop() {
              (() => {
                if (!editorRef.current) return;
                if (!editorRootRef.current) return;
                if (!editorCaretCheckerRef.current) return;
                if (!forceScrollRef.current) return;

                setSelectText(
                  e?.value?.slice(0, editorRef.current?.selectionEnd) ?? "",
                );

                const selectY =
                  editorCaretCheckerRef.current.getBoundingClientRect().height -
                  editorRootRef.current.scrollTop +
                  window.innerHeight * 0.25;

                console.log("selectY", selectY);

                if (
                  editorRef.current.selectionStart !==
                    editorRef.current.selectionEnd ||
                  document.activeElement !== editorRef.current
                )
                  return;

                if (!editorRootRef.current) return;
                let mag;
                if (selectY > window.innerHeight * 0.8) {
                  mag = (selectY - window.innerHeight * 0.8) * 0.1;
                  editorRootRef.current.scrollTop += mag;
                }
                if (selectY < window.innerHeight * 0.2) {
                  mag = (window.innerHeight * 0.2 - selectY) * 0.1;
                  editorRootRef.current.scrollTop -= mag;
                }

                if (!mag || mag < 0.5) {
                  forceScrollRef.current = false;
                }
              })();
              if (stoplooping) return;
              requestAnimationFrame(loop);
            }
            loop();

            return () => {
              stoplooping = true;
            };
          }}
          onInput={(e) => {
            setText(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            let lineHeight = Number(
              getComputedStyle(e.currentTarget)
                .getPropertyValue("line-height")
                .slice(0, -2),
            );
            if (isNaN(lineHeight)) lineHeight = 36;
            forceScrollRef.current = true;
          }}
          className="minimalist-editor"
        ></textarea>
        <div
          style={{ visibility: "hidden" }}
          className="minimalist-editor-height-checker"
          ref={editorHeightCheckerRef}
        >
          {text}
        </div>
        <div
          style={{ visibility: "hidden" }}
          className="minimalist-editor-height-checker"
          ref={editorCaretCheckerRef}
        >
          {selectText}
        </div>
      </div>
    </>
  );
}

(async () => {
  if (window.parent !== window) return;
  await injectFunction(
    () => window?.WIKIDOT?.page?.listeners?.editClick,
    (fn) => (WIKIDOT.page.listeners.editClick = fn),
    (fn) => (fn) => {
      initializeEditor();
    },
  );
})();
