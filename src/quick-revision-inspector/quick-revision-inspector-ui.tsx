import { StringField } from "r628";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CSS from "./quick-revision-inspector.css?raw";
import {
  compareVersions,
  getPageRevisions,
  revisionNumberToId,
} from "../see-no-evil/wikidot-api.js";
import { getPageId } from "../common/wikidot-api-utils.js";

export function quickRevisionInspectorUI() {
  const elem = document.createElement("div");
  const root = createRoot(elem);
  root.render(<QuickRevisionInspectorUI></QuickRevisionInspectorUI>);
  return {
    elem,
    root,
  };
}

function QuickRevisionInspectorUI() {
  const [revnos, setRevnos] = useState<string>("");

  const [revInfo, setRevInfo] = useState<
    {
      ins: string[];
      del: string[];
      fromNum: number;
      toNum: number;
      dom: Document;
    }[]
  >([]);

  const [revsLoaded, setRevsLoaded] = useState<number>(0);
  const [revsTotal, setRevsTotal] = useState<number>(0);

  async function updateRevInfo() {
    const numbers = revnos
      .split(/,/g)
      .map((r) => r.trim())
      .map((r) => Number(r))
      .filter((r) => !isNaN(r))
      .filter((r) => r !== 0);

    numbers.sort((a, b) => a - b);

    const pageid = await getPageId(window.location.href);

    if (!pageid) {
      window.alert("Unable to determine Page ID.");
      return;
    }

    let revRanges: { fromNum: number; toNum: number }[] = [];

    let i = 0;
    while (i < numbers.length) {
      let fromNum = numbers[i];
      let j = 0;
      while (true) {
        let isDiscontiguous =
          i + j >= numbers.length ||
          (j !== 0 && numbers[i + j] - numbers[i] !== j);
        if (isDiscontiguous) {
          revRanges.push({
            fromNum,
            toNum: numbers[i + j - 1],
          });
          i += j;
          break;
        }
        j++;
      }
    }

    console.log(revRanges);

    setRevsTotal(revRanges.length);
    setRevsLoaded(0);

    const revdata = (
      await Promise.all(
        revRanges.map(async ({ fromNum, toNum }) => {
          const [revid1, revid2] = await Promise.all([
            revisionNumberToId(pageid, fromNum - 1),
            revisionNumberToId(pageid, toNum),
          ]);

          if (revid1.type === "error" || revid2.type === "error") {
            setRevsLoaded((i) => i + 1);
            return;
          }

          const diff = await compareVersions(revid1.id, revid2.id);
          setRevsLoaded((i) => i + 1);

          return {
            data: diff,
            fromNum,
            toNum,
          };
        }),
      )
    )
      .flatMap((e) => (e && e.data ? [e] : []))
      .map((e) => ({
        dom: new DOMParser().parseFromString(e.data as string, "text/html"),
        fromNum: e.fromNum,
        toNum: e.toNum,
      }))
      .map((e) => ({
        dom: e.dom,
        ins: Array.from(e.dom.querySelectorAll("ins")).map((e) => e.innerText),
        del: Array.from(e.dom.querySelectorAll("del")).map((e) => e.innerText),
        fromNum: e.fromNum,
        toNum: e.toNum,
      }));

    setRevInfo(revdata);
  }

  return (
    <div className="qri">
      <style>{CSS}</style>
      <label>Revision Numbers</label>
      <br />
      {revsTotal > 0 && `${revsLoaded} / ${revsTotal}`}
      <br />
      <StringField value={revnos} setValue={setRevnos}></StringField>
      <button onClick={updateRevInfo}>Retrieve Revisions</button>
      {revInfo.map((r) => (
        <SingleRevision {...r}></SingleRevision>
      ))}
    </div>
  );
}

export function SingleRevision(r: {
  fromNum: number;
  toNum: number;
  ins: string[];
  del: string[];
  dom: Document;
}) {
  const [showFullDiff, setShowFullDiff] = useState(false);

  return (
    <div className="revision-info" key={r.fromNum}>
      {r.fromNum === r.toNum ? (
        <div className="revision-range">
          Changes made during revision {r.fromNum}
        </div>
      ) : (
        <div className="revision-range">
          Changes made during revisions {r.fromNum}-{r.toNum}
        </div>
      )}
      <div
        className="inline-diff-truncated"
        ref={(e) => {
          if (e) e.innerHTML = "";
          const diff = r.dom.querySelector(".inline-diff");
          if (!diff) return;
          e?.appendChild(truncateInlineDiff(diff as HTMLElement));
        }}
      ></div>
      <button
        onClick={() => {
          setShowFullDiff((v) => !v);
        }}
      >
        {showFullDiff ? "Hide" : "Show"} Full Diff
      </button>
      {showFullDiff && (
        <div
          className="source"
          ref={(e) => {
            if (e) e.innerHTML = "";
            const diff = r.dom.querySelector(".inline-diff");
            if (!diff) return;
            e?.appendChild(diff);
          }}
        ></div>
      )}
    </div>
  );
}

function truncateInlineDiff(diff: HTMLElement) {
  const lines: Node[][] = [[]];

  for (let i = 0; i < diff.childNodes.length; i++) {
    if (
      diff.childNodes[i] instanceof HTMLElement &&
      (diff.childNodes[i] as HTMLElement).tagName.toUpperCase() === "BR"
    ) {
      lines.push([]);
    } else {
      lines.at(-1)!.push(diff.childNodes[i]);
    }
  }

  const includeTheseLines = new Set();

  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].some(
        (e) =>
          e instanceof HTMLElement &&
          (e.tagName.toUpperCase() === "INS" ||
            e.tagName.toUpperCase() === "DEL"),
      )
    ) {
      for (let j = -2; j < 3; j++) {
        includeTheseLines.add(i + j);
      }
    }
  }

  const newDiff = document.createElement("div");
  newDiff.className = "inline-diff page-source";

  let lastIsEllipsis = false;

  for (let i = 0; i < lines.length; i++) {
    if (includeTheseLines.has(i)) {
      for (const e of lines[i]) newDiff.appendChild(e);
      newDiff.appendChild(document.createElement("br"));
      lastIsEllipsis = false;
    } else {
      if (!lastIsEllipsis) {
        const ellipsis = document.createElement("span");
        ellipsis.innerText = "...";
        ellipsis.style.color = "#777";
        newDiff.appendChild(ellipsis);
        newDiff.appendChild(document.createElement("br"));
        lastIsEllipsis = true;
      }
    }
  }

  return newDiff;
}
