import { Fragment, useEffect, useState } from "react";
import { compareVersions, revisionNumberToId } from "../common/history.js";
import React from "react";

export function Diff(props: { from: number; to: number; pageId: string }) {
  const [diff, setDiff] = useState<CollapsibleDiff | undefined>();

  const [diffError, setDiffError] = useState<string | undefined>();

  useEffect(() => {
    if (diff || diffError) return;

    (async () => {
      const [fromid, toid] = await Promise.all([
        revisionNumberToId(props.pageId, props.from),
        revisionNumberToId(props.pageId, props.to),
      ]);

      if (fromid.type === "error" || toid.type === "error") {
        setDiffError("Failed to fetch revision IDs.");
        return;
      }

      const diff = await compareVersions(fromid.id, toid.id);
      if (!diff) {
        setDiffError("Failed to diff revisions.");
        return;
      }

      const diffDom = new DOMParser().parseFromString(diff, "text/html");
      const diffSource = diffDom.querySelector(".inline-diff");

      if (!diffSource) {
        setDiffError("Page sources are identical between these revisions.");
        return;
      }

      setDiff(makeDiffCollapsible(diffSource as HTMLElement));
    })();
  });

  if (diffError) {
    return <div className="diff-error">{diffError}</div>;
  }

  return (
    <div className="inline-diff">
      {diff?.map((d) => (
        <DiffSection section={d} key={d.id}></DiffSection>
      ))}
    </div>
  );
}

export function DiffSection(props: { section: DiffSection }) {
  const [show, setShow] = useState(props.section.collapsible ? false : true);

  const showButton = props.section.collapsible ? (
    <>
      <button
        onClick={() => {
          setShow((x) => !x);
        }}
      >
        {show ? "Hide" : "Show"}
      </button>
      {show ? <br></br> : <></>}
    </>
  ) : (
    <></>
  );

  if (!show)
    return (
      <>
        <br></br>
        {showButton}
        <span className="sh-truncated">
          {" "}
          ... {props.section.lines.length} lines truncated ...
        </span>
        <br></br>
        <br></br>
      </>
    );

  return (
    <>
      {showButton}
      {props.section.lines.map((l, i) => (
        <Fragment key={i}>
          {l.map((v, j) => (
            <Fragment key={j}>
              {v.type === "ins" ? (
                <ins>{v.text}</ins>
              ) : v.type === "del" ? (
                <del>{v.text}</del>
              ) : (
                v.text
              )}
            </Fragment>
          ))}
          <br />
        </Fragment>
      ))}
    </>
  );
}

type DiffText = {
  type: "ins" | "del" | "same";
  text: string;
};

type DiffSection = {
  lines: DiffText[][];
  collapsible: boolean;
  id: number;
};

type CollapsibleDiff = DiffSection[];

function makeDiffCollapsible(diffElem: HTMLElement): CollapsibleDiff {
  const lines: Node[][] = [[]];

  for (let i = 0; i < diffElem.childNodes.length; i++) {
    if (
      diffElem.childNodes[i] instanceof HTMLElement &&
      (diffElem.childNodes[i] as HTMLElement).tagName.toUpperCase() === "BR"
    ) {
      lines.push([]);
    } else {
      lines.at(-1)!.push(diffElem.childNodes[i]);
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

  const diff: CollapsibleDiff = [];

  let isTruncated = false;

  for (let i = 0; i < lines.length; i++) {
    if (includeTheseLines.has(i)) {
      if (isTruncated || i === 0) {
        diff.push({
          collapsible: false,
          id: i,
          lines: [],
        });
        isTruncated = false;
      }
    } else {
      if (!isTruncated || i === 0) {
        diff.push({
          collapsible: true,
          id: i,
          lines: [],
        });
        isTruncated = true;
      }
    }
    diff.at(-1)!.lines.push(
      lines[i].map((e) => {
        const tagname =
          e instanceof HTMLElement ? e.tagName.toLowerCase() : undefined;

        if (tagname === "ins") {
          return { type: "ins", text: e.textContent ?? "" };
        } else if (tagname === "del") {
          return { type: "del", text: e.textContent ?? "" };
        } else {
          return { type: "same", text: e.textContent ?? "" };
        }
      }),
    );
  }

  return diff;
}
