/*!
// ==UserScript==
// @name        Wikidot Draft Backup 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     1.0
// @author      radian628
// @description Automatically generate backups of your Wikidot drafts. 
// ==/UserScript==
*/

import React, { memo, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { openDB, deleteDB, wrap, unwrap, DBSchema } from "idb";
import { Duration } from "luxon";
import { ChangeObject, diffChars } from "diff";
import {
  getLinesAndCols,
  interleave,
  injectElementsAt,
  injectFunction,
} from "r628";

interface BackupsDB extends DBSchema {
  backups: {
    value: {
      id?: number;
      url: string;
      timestamp: number;
      content: string;
      beforeUnload: boolean;
    };
    key: number;
    indexes: {
      byTimestamp: number;
      byUrl: string;
    };
  };
  draftNames: {
    key: string;
    value: {
      url: string;
    };
  };
}

type ChangeRange = {
  type: "added" | "removed" | "same";
  str: string;
};

function splitByLine(
  diff: ChangeObject<string>[],
  lac: [number, number][],
): (ChangeObject<string> & { line: number })[] {
  let i = 0;
  return diff.flatMap((d) => {
    let currLine = lac[i][0];
    let result = [{ ...d, value: "", line: currLine }];
    for (const char of d.value) {
      if (lac[i][0] !== currLine) {
        currLine = lac[i][0];
        result.push({ ...d, value: "", line: currLine });
      }
      result.at(-1)!.value += char;
      i++;
    }
    return result;
  });
}

function getDiffChangeRanges(
  diff: ChangeObject<string>[],
  options: {
    // number of surrounding lines to show
    context: number;
  },
): ChangeRange[][] {
  const str = diff.map((d) => d.value).join("");
  const lac = getLinesAndCols(str);
  const splitdiff = splitByLine(diff, lac);

  const changeRanges: ChangeRange[][] = [];

  let linesToDisplay = new Map<number, boolean>();

  let pos = 0;
  for (const l of diff) {
    if (l.added || l.removed) {
      let startLine = lac[pos][0];
      let endLine = lac[pos + l.value.length][0];
      for (
        let i = startLine - options.context;
        i <= endLine + options.context;
        i++
      ) {
        linesToDisplay.set(i, true);
      }
    }

    pos += l.value.length;
  }

  changeRanges.push([]);
  for (const d of splitdiff) {
    let shouldInclude = linesToDisplay.get(d.line);
    if (shouldInclude) {
      changeRanges.at(-1)!.push({
        type: d.added ? "added" : d.removed ? "removed" : "same",
        str: d.value,
      });
    } else if (changeRanges.at(-1)!.length !== 0) {
      changeRanges.push([]);
    }
  }

  return changeRanges;
}

function DiffDisplay(props: { oldstr: string; newstr: string }) {
  const diff = useMemo(
    () =>
      getDiffChangeRanges(diffChars(props.oldstr, props.newstr), {
        context: 2,
      }),
    [props.oldstr, props.newstr],
  );

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
      <div
        style={{
          whiteSpace: "pre-wrap",
          padding: "0.5em",
          border: "1px solid #9996",
          margin: "0.5em",
          marginBottom: "2em",
          maxHeight: expanded ? "unset" : "100px",
          overflow: "hidden",
        }}
      >
        {interleave(
          diff.map((d, i) => (
            <span>
              {d.map((s) => (
                <span
                  style={{
                    color: { added: "green", removed: "red", same: "inherit" }[
                      s.type
                    ],
                  }}
                >
                  {s.str}
                </span>
              ))}
            </span>
          )),
          (a, b) => (
            <span
              style={{
                display: "inline-block",
                width: "100%",
                fontSize: "200%",
                marginBottom: "0.4lh",
              }}
            >
              ...
            </span>
          ),
        ).map((e, i) => (
          <React.Fragment key="i">{e}</React.Fragment>
        ))}
      </div>
    </>
  );
}

(async () => {
  const db = await openDB<BackupsDB>("r628-local-backups", 1, {
    upgrade(db) {
      const backups = db.createObjectStore("backups", {
        keyPath: "id",
        autoIncrement: true,
      });
      backups.createIndex("byTimestamp", "timestamp");
      backups.createIndex("byUrl", "url");

      const draftNames = db.createObjectStore("draftNames", {
        keyPath: "url",
        autoIncrement: true,
      });
    },
  });

  function normalizeURL(url: string) {
    const u = new URL(url);
    u.protocol = "http:";
    u.search = "";
    u.hash = "";
    u.pathname = u.pathname.split("/").slice(0, 2).join("/");
    return u.href;
  }

  function formatDuration(dur: Duration) {
    const d = dur.shiftToAll();
    const units = [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ] as const;

    let str = "";

    let i = 0;
    for (const u of units) {
      if (d[u] > 0) {
        str += `${d[u]} ${u}${
          ["hours", "weeks"].includes(u)
            ? `, ${d[units[i + 1]]} ${units[i + 1]}`
            : ""
        }`;
        break;
      }
      i++;
    }

    return str;
  }

  function BackupsView() {
    const [expanded, setExpanded] = useState(false);

    const [backups, setBackups] = useState<
      BackupsDB["backups"]["value"][] | undefined
    >([]);

    useEffect(() => {
      if (backups) return;
      (async () => {
        const b = await db.getAllFromIndex(
          "backups",
          "byUrl",
          normalizeURL(window.location.href),
        );
        setBackups(b.sort((a, b) => b.timestamp - a.timestamp));
      })();
    }, [backups]);

    if (!expanded)
      return (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            setBackups(undefined);
          }}
        >
          Show Backups
        </button>
      );

    return (
      <div>
        <button
          onClick={() => {
            setExpanded(false);
          }}
          type="button"
        >
          Hide Backups
        </button>{" "}
        <button
          onClick={async () => {
            await makeBackup(false);
            setBackups(undefined);
          }}
          type="button"
        >
          Create Backup
        </button>
        <ul style={{ listStyle: "none" }}>
          {backups
            ? backups.map((b, i) => {
                const dur = Duration.fromMillis(Date.now() - b.timestamp);

                const prevBackupContent = backups[i + 1]?.content ?? "";
                return (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => {
                        const editor = document.getElementById(
                          "edit-page-textarea",
                        ) as HTMLTextAreaElement | null;
                        if (!editor) return;
                        editor.value = b.content;
                      }}
                    >
                      Apply
                    </button>
                    {formatDuration(dur)} ago
                    <DiffDisplay
                      oldstr={prevBackupContent}
                      newstr={b.content}
                    ></DiffDisplay>
                  </li>
                );
              })
            : "Loading..."}
        </ul>
      </div>
    );
  }

  // @ts-expect-error
  window.wikidotDraftBackupFallbackDeleteBackups = () => {
    deleteDB("r628-local-backups");
  };

  injectElementsAt("#edit-page-textarea", "beforebegin", () => {
    const root = document.createElement("div");
    const reactRoot = createRoot(root);

    reactRoot.render(<BackupsView></BackupsView>);

    return {
      element: root,
      unmount: () => {
        reactRoot.unmount();
      },
    };
  });

  let lastBackupContent: string | undefined = undefined;

  async function makeBackup(beforeUnload: boolean) {
    const edit = document.getElementById(
      "edit-page-textarea",
    ) as HTMLTextAreaElement;
    if (!edit) return;
    if (edit.value === lastBackupContent) return;

    await db.add("backups", {
      url: normalizeURL(window.location.href),
      timestamp: Date.now(),
      content: edit.value,
      beforeUnload,
    });
    lastBackupContent = edit.value;
  }

  setInterval(() => {
    makeBackup(false);
  }, 60000);

  window.addEventListener("beforeunload", (e) => {
    makeBackup(true);
    const edit = document.getElementById("edit-page-textarea");
    if (edit && !noConfirmationDialog) {
      e.preventDefault();
    }
  });

  const b = (
    await db.getAllFromIndex(
      "backups",
      "byUrl",
      normalizeURL(window.location.href),
    )
  ).sort((a, b) => b.timestamp - a.timestamp);

  const outdated = b.slice(10);
  for (const o of outdated) {
    db.delete("backups", o.id!);
  }
})();

let noConfirmationDialog = false;

injectFunction<any[], any>(
  () =>
    window?.WIKIDOT?.modules?.PageEditModule?.listeners?.save?.bind(
      window?.WIKIDOT.modules.PageEditModule.listeners,
    ),
  (fn) => (window.WIKIDOT.modules.PageEditModule.listeners.save = fn),
  (f) =>
    (...args) => {
      noConfirmationDialog = true;
      return f(...args);
    },
);

injectFunction<any[], any>(
  () =>
    window.WIKIDOT?.modules?.PageEditModule?.listeners?.cancel?.bind(
      window?.WIKIDOT.modules.PageEditModule.listeners,
    ),
  (fn) => (window.WIKIDOT.modules.PageEditModule.listeners.cancel = fn),
  (f) =>
    (...args) => {
      noConfirmationDialog = true;
      return f(...args);
    },
);
