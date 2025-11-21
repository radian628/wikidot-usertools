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

import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { injectFunction } from "../../r628/src/inject.js";
import EditorCSS from "./editor.css?raw";

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

function App() {
  const editorRootRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <style>{EditorCSS}</style>
      <div className="minimalist-editor-root" ref={editorRootRef}>
        <div
          contentEditable
          spellCheck="false"
          ref={(e) => {
            e?.focus();
          }}
          onInput={(e) => {
            const text = e.currentTarget.innerText;
          }}
          onKeyDown={(e) => {
            let lineHeight = Number(
              getComputedStyle(e.currentTarget)
                .getPropertyValue("line-height")
                .slice(0, -2)
            );
            if (isNaN(lineHeight)) lineHeight = 36;

            const range = window.getSelection()?.getRangeAt(0);
            if (!range) return;
            const isSingleton =
              range.startContainer === range.endContainer &&
              range.startOffset === range.endOffset;
            if (!isSingleton) return;
            const selectY = (
              range.startContainer instanceof Element
                ? range.startContainer
                : range.startContainer.parentElement
            )?.getBoundingClientRect().y;
            console.log("selectY", selectY);
            if (selectY === undefined) return;

            (() => {
              if (!editorRootRef.current) return;
              if (selectY > window.innerHeight * 0.8) {
                editorRootRef.current.scrollTop += lineHeight;
              }
              if (selectY < window.innerHeight * 0.2) {
                editorRootRef.current.scrollTop -= lineHeight;
              }
            })();
          }}
          onSelect={(e) => {}}
          className="minimalist-editor"
        ></div>
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
    }
  );
})();
