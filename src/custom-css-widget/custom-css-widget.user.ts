/*!
// ==UserScript==
// @name        Custom CSS Widget
// @namespace   Violentmonkey Scripts
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      radian628
// @description 5/21/2025, 12:51:38 PM
// ==/UserScript==
*/

import { parseMixed } from "@lezer/common";
import { buildParser } from "@lezer/generator";
import * as jsParser from "@lezer/javascript";
import * as cssParser from "@lezer/css";
import {
  foldAll,
  foldGutter,
  foldInside,
  foldNodeProp,
  LRLanguage,
  syntaxTree,
} from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, indentWithTab } from "@codemirror/commands";
import { search, searchKeymap } from "@codemirror/search";
import { oneDark } from "@codemirror/theme-one-dark";
import { createEvalbox, Evalbox } from "../../r628/src/evalbox.js";
import * as prettier from "prettier";
import * as prettierPostcss from "prettier/plugins/postcss.js";
import * as prettierBabel from "prettier/plugins/babel.js";
import * as prettierEstree from "prettier/plugins/estree.js";

async function makeCodemirrorEditor(container: HTMLElement) {
  const embeddedJSFinderParser = buildParser(`
  @precedence { js, normal }

  @top EitherComment {
    JSComment | NormalComment
  }

  NormalComment {
    CommentOpen !normal AnyRegular CommentClose
  }

  JSComment {
    CommentOpenJS !js AnyJS CommentClose
  }

  AnyRegular {
    Any+
  }

  AnyJS {
    Any+
  }

  @tokens {
    CommentOpen { "/*" }
    CommentOpenJS { "/*js" }
    CommentClose { "*/" }
    Any { _ }

  }
  `).configure({
    wrap: parseMixed((node) => {
      if (node.name === "AnyJS") return { parser: jsParser.parser };
      return null;
    }),
  });

  const foldedGeneratedOutputParser = buildParser(`

  @precedence { handwritten @left }

  @top Program {
    Fragment+
  }

  Fragment {
    HandWrittenFragment | GeneratedFragment
  }

  HandWrittenFragment {
    Any+ !handwritten
  }

  GeneratedFragment {
    GeneratedPrefix GeneratedContent GeneratedSuffix
  }

  GeneratedContent {
    Any+
  }

  @tokens {
    GeneratedPrefix { "/*GENERATED START*/" }
    GeneratedSuffix { "/*GENERATED END*/" }
    Any { _ }
    @precedence { GeneratedPrefix, Any }
  }
  `).configure({
    props: [
      foldNodeProp.add({
        GeneratedFragment: foldInside,
      }),
    ],
    wrap: parseMixed((node) => {
      if (node.name === "GeneratedContent") return { parser: cssParser.parser };
      return null;
    }),
  });

  const extendedCSSParser = cssParser.parser.configure({
    wrap: parseMixed((node) => {
      if (node.name === "Comment") return { parser: embeddedJSFinderParser };
      return null;
    }),
  });

  const extendedCSSWithGeneratedParser = foldedGeneratedOutputParser.configure({
    wrap: parseMixed((node) => {
      return node.type.isTop
        ? {
            parser: extendedCSSParser,
            overlay: (n) => n.name === "HandWrittenFragment",
          }
        : null;
    }),
  });

  const extendedCSSLang = LRLanguage.define({
    parser: extendedCSSWithGeneratedParser,
  });

  const foldedGeneratedOutputLang = LRLanguage.define({
    parser: foldedGeneratedOutputParser,
  });

  const initState = EditorState.create({
    doc: "a",
    extensions: [
      EditorView.lineWrapping,
      keymap.of(defaultKeymap),
      keymap.of(searchKeymap),
      search(),
      EditorView.updateListener.of((update) => {
        for (const cb of inputListeners) {
          cb(view);
        }
      }),
      keymap.of([
        indentWithTab,
        {
          key: "Ctrl-s",
          run: (view) => {
            (async () => {
              for (const cb of saveListeners) await cb(view);
              syntaxTree(view.state);
              foldAll(view);
            })();
            return true;
          },
        },
        {
          key: "Ctrl-y",
          run: (view) => {
            for (const cb of yoinkListeners) cb(view);
            return true;
          },
        },
      ]),
      extendedCSSLang,
      //css(),
      oneDark,
      lineNumbers(),
      foldGutter(),
      history(),
    ],
  });

  const view = new EditorView({
    state: initState,
    parent: container,
  });

  let inputListeners: any[] = [];

  let saveListeners: any[] = [];

  let yoinkListeners: any[] = [];

  return {
    view,
    onInput(cb: { (): void; (): void }) {
      inputListeners.push(cb);
    },
    onSave(cb: () => Promise<void>) {
      saveListeners.push(cb);
      // syntaxTree(view.state);
      // console.log("AAAAAA");
      // foldAll(view);
      // console.log("BBBBBB");
    },
    setDoc(doc: string, cursor = 0) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: doc,
        },
      });
      view.dispatch({ selection: { anchor: cursor } });
    },
    doc() {
      return view.state.sliceDoc(0, view.state.doc.length);
    },
    cursor() {
      return view.state.selection.main.head;
    },
    onYoink(cb: () => Promise<void>) {
      yoinkListeners.push(cb);
    },
  };
}

const initscript = `
window.rangeIntersects = function(a1, a2, b1, b2) {
  return !(a1 > b2 || b1 > a2);
}

window.rectIntersects = function(a, b) {
  return rangeIntersects(a.left, a.right, b.left, b.right) && rangeIntersects(a.top, a.bottom, b.top, b.bottom);
}

window.clamp = function(x, lo, hi) {
  return Math.min(Math.max(x, lo), hi);
}

window.waitABit = function() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve);
  })
}

window.range = function(hi) {
  let arr = [];
  for (let i = 0; i < hi && i < 10_000_000; i ++) {
    arr.push(i);
  }
  return arr;
}

window.sirange = function(hi, f, s="\\n") {
  const r = range(hi);
  return r.map(f).join(s);
}

window.srange = function(a, f, s="\\n") {
  return a.map(f).join(s);
}

window.r = function(n, cb) {
  const a = range(n);
  return a.map(i => {
    return cb({
      remap(lo, hi, inclEnd) {
        return i / (inclEnd ? n - 1 : n) * (hi - lo) + lo;
      },
      segment(lo, hi) {
        return [
          i / n * (hi - lo) + lo,
          (i + 1) / n * (hi - lo) + lo
        ]
      },
      slidingWindow(arr) {
        return [
          arr[i],
          arr[i + 1]
        ]
      },
      randkf() {
        if (i === 0) return 0;
        if (i === n - 1) return 100;
        const lo = i / (n - 2) * 100;
        const hi = (i + 1) / (n - 2) * 100
        return rand(lo, hi);
      },
      get(arr) {
        return arr[i];
      },
      i,
      next: i + 1
    })
  });
}

window.id = function(x) {
  return x;
}

window.sr = function(n, cb, s="\\n") {
  return srange(r(n, id), cb, s);
}

window.rand = function(lo, hi) {
  return Math.random() * (hi - lo) + lo;
}

window.pickrand = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}`;

function listChildrenBFS(e: any) {
  const q = [e];
  const result = [e];

  while (q.length > 0) {
    const e = q.shift();
    result.push(...e.children);
    q.push(...e.children);
  }
  return result;
}

async function formatAllJavascript(src: string, pos: number, evalbox: Evalbox) {
  //return (await Promise.all(src.replaceAll(/\/\*js[\s\S]+?\*\//g, s => `${s.slice(0,4)}\0${s.slice(4,-2)}\0${s.slice(-2)}`)
  //  .split("\0").map(async (e, i) => i % 2 === 1 ? " " + (await fmtjs(e, 0)).formatted + " " : e))).join("");
  const generatedFragmentRegex =
    /^\s*\/\*GENERATED START\*\/[\s\S]*?\/\*GENERATED END\*\//g;
  const fragments = [];
  let injs = false;
  const fragmentTypes = [];
  let fragment = "";
  while (src.length > 0) {
    if (src.startsWith("/*js")) {
      injs = true;
      fragments.push(fragment + "/*js");
      fragmentTypes.push("handwritten-css");
      fragment += src.slice(0, 4);
      src = src.slice(4);
      fragment = "";
    } else if (src.startsWith("*/")) {
      injs = false;
      fragments.push(fragment);
      fragmentTypes.push("handwritten-js");
      src = src.slice(2);
      fragment = "*/";
      fragments.push(fragment);
      fragmentTypes.push("handwritten-css");
      fragment = "";

      let genfragment = src.match(generatedFragmentRegex);
      if (genfragment) {
        fragments.push(genfragment[0]);
        fragmentTypes.push("generated-css");
        src = src.slice(genfragment[0].length);
        fragment = "";
      }
    } else {
      fragment += src[0];
      src = src.slice(1);
    }
  }
  fragments.push(fragment);

  let cursorUpdated = false;
  let baseIndex = 0;
  let newpos = pos;

  let deltaIndex = 0;

  let res = "";

  let pendingGeneratedFragment: string | any[] | undefined;

  function addPendingGeneratedFragment(isBeforeCursor: boolean) {
    if (!pendingGeneratedFragment) return;
    res += pendingGeneratedFragment;
    if (isBeforeCursor) deltaIndex += pendingGeneratedFragment.length;
    pendingGeneratedFragment = undefined;
  }

  for (let i = 0; i < fragments.length; i++) {
    const ftype = fragmentTypes[i];
    const isBeforeCursor =
      !cursorUpdated && pos > baseIndex + fragments[i].length;
    const shouldUpdateCursor =
      !cursorUpdated &&
      pos >= baseIndex &&
      pos < baseIndex + fragments[i].length;
    if (ftype === "handwritten-js") {
      const actualjscode = fragments[i];
      const result = await evalbox.eval(actualjscode);

      if (shouldUpdateCursor) {
        const formatted = await fmtjs(actualjscode, pos - baseIndex);
        res += formatted.formatted;
        cursorUpdated = true;
        newpos = formatted.cursorOffset + baseIndex;
      } else if (isBeforeCursor) {
        const formatted = await fmtjs(actualjscode, fragments[i].length);
        res += formatted.formatted;
        deltaIndex += formatted.cursorOffset - fragments[i].length;
      } else {
        const formatted = await fmtjs(actualjscode, fragments[i].length);
        res += formatted.formatted;
      }

      if (result.success) {
        console.log(result);
        const generatedFragment =
          `/*GENERATED START*/\n` +
          (result.data?.toString() ?? result.data) +
          `\n/*GENERATED END*/\n`;
        pendingGeneratedFragment = generatedFragment;
      }
    } else if (ftype === "handwritten-css") {
      res += fragments[i];
      addPendingGeneratedFragment(isBeforeCursor);
    } else {
      // generated css is entirely replaced so we can just ignore old generated css
      if (isBeforeCursor) deltaIndex -= fragments[i].length;
    }
    baseIndex += fragments[i].length;
  }
  addPendingGeneratedFragment(false);

  newpos += deltaIndex;

  newpos = Math.min(Math.max(newpos, 0), res.length);

  return { cursorOffset: newpos, formatted: res };
}

async function runAllJavascript(src: string, evalbox: Evalbox) {
  return (
    await Promise.all(
      src
        .replaceAll(
          /\s*\/\*GENERATED START\*\/[\s\S]*?\/\*GENERATED END\*\//g,
          ""
        )
        .replaceAll(
          /\/\*js[\s\S]+?\*\//g,
          (s: string | any[]) => `\0${s.slice(4, -2)}\0`
        )
        .split("\0")
        .map(async (e: any, i: number) => {
          if (i % 2 === 1) {
            const result = await evalbox.eval(e);
            if (result.success) return result.data;
            console.error(result.error);
            return e;
          } else {
            return e;
          }
        })
    )
  ).join("");
}

const init = async () => {
  const evalbox = await createEvalbox();
  await evalbox.eval(initscript);

  const widgetRoot = document.createElement("div");
  widgetRoot.style =
    "position: fixed; bottom: 0; right: 0; z-index: 9999999999;";

  widgetRoot.addEventListener("keydown", (e) => {
    if (e.key === "s" && e.ctrlKey) e.preventDefault();
  });

  const widgetStylesheetRoot = document.createElement("style");
  const selectStylesheetRoot = document.createElement("style");

  document.body.appendChild(widgetRoot);
  document.head.appendChild(widgetStylesheetRoot);
  document.head.appendChild(selectStylesheetRoot);

  //const editor = document.createElement("textarea");

  const widgetEditorStylesheet = document.createElement("style");
  document.head.appendChild(widgetEditorStylesheet);
  widgetEditorStylesheet.innerText = `.custom-css-widget-editor-root {
    /*width: 100%;
    height: 100%;*/
    overflow: auto;
  }

  .custom-css-widget-editor-root > div {
    min-height: 100%;
  }
  `;

  const widgetEditorRoot = document.createElement("div");
  widgetEditorRoot.className = "custom-css-widget-editor-root";

  const editor = await makeCodemirrorEditor(widgetEditorRoot);

  widgetRoot.appendChild(widgetEditorRoot);

  editor.setDoc(localStorage.getItem("radian628-css-widget-text") ?? "");
  widgetEditorRoot.style =
    "position: absolute; bottom: 0; right: 0; resize: none; font-family: monospace; z-index: 9999999998;";
  widgetRoot.appendChild(widgetEditorRoot);

  async function updatecss() {
    widgetStylesheetRoot.innerText = await runAllJavascript(
      editor.doc(),
      evalbox
    );
    localStorage.setItem("radian628-css-widget-text", editor.doc());
  }

  editor.onInput(() => {
    updatecss();
  });

  editor.onSave(async () => {
    const withFormattedJS = await formatAllJavascript(
      editor.doc(),
      editor.cursor(),
      evalbox
    );
    const css = await fmtcss(
      withFormattedJS.formatted,
      withFormattedJS.cursorOffset
    );
    console.log(css.cursorOffset);
    editor.setDoc(css.formatted, css.cursorOffset);
  });

  editor.onYoink(async () => {
    const styles = Array.from(
      document.head.querySelectorAll("style")
    ).reverse();
    let style;
    for (const s of styles) {
      if (s === widgetStylesheetRoot || s === selectStylesheetRoot) continue;
      if (s.innerText.trim().length === 0) continue;
      if (!s.innerText.includes("/*RADIAN628 CSS YOINK*/")) continue;
      style = s;
      break;
    }
    if (!style) return;
    let textToAdd = (await fmtcss(style.innerText, 0)).formatted;
    editor.setDoc(textToAdd + editor.doc(), editor.cursor() + textToAdd.length);
    style.parentElement?.removeChild(style);
    updatecss();
  });

  const handleselect = () => {
    const mainselect = editor.view.state.selection.main;
    const selection = !mainselect
      ? ""
      : editor.view.state.sliceDoc(mainselect.from, mainselect.to);
    selectStylesheetRoot.innerText = `${selection} { outline: 3px solid #88eeff; }`;
  };

  editor.onInput(handleselect);

  const resizer = document.createElement("div");
  widgetRoot.appendChild(resizer);
  resizer.style =
    "position: absolute; z-index: 9999999999; bottom: 100px; right: 100px; background-color: black; width: 20px; height: 20px; cursor: pointer; border: 2px solid white; border-radius: 50%;";
  let rx = 100;
  let ry = 100;
  let isResizing = false;

  function resizeEditor() {
    widgetEditorRoot.style.width = `${rx}px`;
    widgetEditorRoot.style.height = `${ry}px`;
  }

  resizeEditor();

  resizer.onmousedown = () => {
    isResizing = true;
    document.body.style.userSelect = "none";
  };
  document.addEventListener("mouseup", () => {
    isResizing = false;
    document.body.style.userSelect = "";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    rx -= e.movementX;
    ry -= e.movementY;
    resizer.style.bottom = `${ry}px`;
    resizer.style.right = `${rx}px`;
    resizeEditor();
  });
};

const initListener = () => {
  init();
  document.removeEventListener("click", initListener);
};

document.addEventListener("click", initListener);

async function fmtcss(css: string, pos: number) {
  try {
    return await prettier.formatWithCursor(css, {
      cursorOffset: pos,
      semi: false,
      parser: "css",
      plugins: [prettierPostcss],
    });
  } catch (err) {
    return { formatted: css, cursorOffset: pos };
  }
}

async function fmtjs(js: string, pos: number) {
  try {
    console.log(js, pos);
    let isAtEnd = pos === js.length;
    const res = await prettier.formatWithCursor(js, {
      cursorOffset: pos,
      semi: false,
      parser: "babel",
      plugins: [prettierBabel],
      printWidth: 40,
    });
    res.cursorOffset += isAtEnd ? 2 : 1;
    res.formatted = ` ${res.formatted} `;
    return res;
  } catch (err) {
    return { formatted: js, cursorOffset: pos };
  }
}
