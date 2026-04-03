import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { getPageRevisionRange, RevisionRow } from "../common/history.js";
import { format, getYear } from "date-fns";
import CSS from "./smart-history-ui.css?raw";
import { eventEmitter, mutatify, NumberField, StringField } from "r628";
import { Diff } from "./diff.js";
import { asyncRequestModule } from "../common/wikidot-api-utils.js";

type SmartHistoryProps = {
  pageId: string;
  revcount: number;
};

export function smartHistoryUI(props: SmartHistoryProps) {
  const elem = document.createElement("div");
  const shadow = elem.attachShadow({ mode: "open" });
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(CSS);
  shadow.adoptedStyleSheets = [stylesheet];
  const root = createRoot(shadow);
  root.render(<SmartHistoryUI {...props}></SmartHistoryUI>);
  return elem;
}

const NumberFieldM = mutatify(NumberField);

const PAGESIZE = 50;
const SHOW_ABOVE_JUMPTO = 10;

export function SmartHistoryUI(props: SmartHistoryProps) {
  const [revs, setRevs] = useState<{
    rows: RevisionRow[];
    pageIndex: number;
    execIndex: number;
    jumpTo: number;
  }>({
    rows: [],
    pageIndex: 0,
    execIndex: 0,
    jumpTo: props.revcount,
  });

  const [shouldPushMoreRows, setShouldPushMoreRows] = useState(false);

  useEffect(() => {
    if (shouldPushMoreRows && revs.rows.at(-1)?.revno !== 0) {
      (async () => {
        const pageOffset = Math.max(
          Math.floor((props.revcount - revs.jumpTo) / PAGESIZE - 1),
          0,
        );

        const revrange = (
          await getPageRevisionRange(
            props.pageId,
            revs.pageIndex + pageOffset + 1,
            PAGESIZE,
          )
        )?.filter((p) => p.revno < revs.jumpTo + SHOW_ABOVE_JUMPTO);
        if (!revrange) return;
        setRevs((oldrevs) => {
          if (oldrevs.execIndex !== revs.execIndex) return oldrevs;
          return {
            rows: [...oldrevs.rows, ...revrange],
            pageIndex: oldrevs.pageIndex + 1,
            execIndex: oldrevs.execIndex,
            jumpTo: oldrevs.jumpTo,
          };
        });
      })();
    }
  }, [revs, shouldPushMoreRows]);

  const [cmpMin, setCmpMin] = useState(0);
  const [cmpMax, setCmpMax] = useState(0);

  const [cmp, setCmp] = useState<{ from: number; to: number } | undefined>();

  const [authorFilter, setAuthorFilter] = useState("");

  const [shownSource, setShownSource] = useState("");

  const [shownSourceIndex, setShownSourceIndex] = useState<number>();

  const shownSourceText = useMemo(() => {
    const dom = new DOMParser().parseFromString(shownSource, "text/html");

    const src =
      (dom.querySelector(".page-source") as HTMLElement)?.innerText ?? "";
    return src.slice(1);
  }, [shownSource]);

  const pageSourceAreaRef = useRef<HTMLDivElement | null>(null);

  return (
    <div id="smart-history-root">
      <div className="page-source-area" ref={pageSourceAreaRef}>
        {shownSourceIndex !== undefined && (
          <>
            <div className="page-source-area-header">
              <h2>Source of Rev. {shownSourceIndex}</h2>
              <button
                onClick={() => {
                  setShownSourceIndex(undefined);
                }}
              >
                Close
              </button>
            </div>
            <div className="page-source">{shownSourceText}</div>
          </>
        )}
      </div>
      <style>{CSS}</style>
      <h2>Page History</h2>
      {cmp && <Diff from={cmp.from} to={cmp.to} pageId={props.pageId}></Diff>}
      <div>
        <label>Jump To </label>
        <NumberFieldM
          min={0}
          max={props.revcount}
          value={revs.jumpTo}
          setValue={(cb) => {
            setRevs((oldrevs) =>
              oldrevs.jumpTo === cb(oldrevs.jumpTo)
                ? oldrevs
                : {
                    rows: [],
                    execIndex: oldrevs.execIndex + 1,
                    jumpTo: cb(oldrevs.jumpTo),
                    pageIndex: 0,
                  },
            );
          }}
          step={1}
        ></NumberFieldM>
        {revs.jumpTo !== props.revcount ? (
          <button
            onClick={() => {
              setRevs((oldrevs) => ({
                rows: [],
                execIndex: oldrevs.execIndex + 1,
                jumpTo: props.revcount,
                pageIndex: 0,
              }));
            }}
          >
            X
          </button>
        ) : (
          <></>
        )}
      </div>
      {revs.rows.length > 0 && revs.rows[0].revno !== props.revcount ? (
        <p className="sh-note">
          (Note: Some newer revisions are not listed, as you have jumped to an
          earlier revision)
        </p>
      ) : (
        <></>
      )}
      <div className="sh-cmp">
        <label>Compare </label>
        <NumberFieldM
          value={cmpMin}
          setValue={setCmpMin}
        ></NumberFieldM> -&gt;{" "}
        <NumberFieldM value={cmpMax} setValue={setCmpMax}></NumberFieldM>{" "}
        <button
          onClick={() => {
            setCmp({
              from: cmpMin,
              to: cmpMax,
            });
          }}
        >
          Compare Revisions
        </button>
      </div>
      <div className="sh-author-filter">
        <label>Filter Author</label>{" "}
        <StringField
          value={authorFilter}
          setValue={setAuthorFilter}
        ></StringField>
      </div>
      <table className="smart-history-table">
        <tbody>
          <tr>
            <th>#</th>
            <th>By</th>
            <th>Flags</th>
            <th>Date</th>
            <th>Time</th>
            <th>Comments</th>
          </tr>
          {revs.rows
            .filter(
              (r) =>
                r.byUsername
                  .toLowerCase()
                  .includes(authorFilter.toLowerCase()) ||
                r.byUserId?.includes(authorFilter),
            )
            .map((r) => (
              <RevisionTableRow
                showSource={(src) => {
                  setShownSource(src);
                  setShownSourceIndex(r.revno);
                  setTimeout(() => {
                    pageSourceAreaRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  });
                }}
                revcount={props.revcount}
                key={r.revno}
                rev={r}
                selectedNumber={revs.jumpTo}
              ></RevisionTableRow>
            ))}
        </tbody>
      </table>
      <div
        style={{
          height: "50vh",
          transform: "translateY(-50%)",
          position: "relative",
          zIndex: -1,
        }}
        ref={(e) => {
          if (!e) return;

          const observer = new IntersectionObserver(async (x) => {
            for (const [n, e] of x.entries()) {
              if (e.isIntersecting) {
                setShouldPushMoreRows(true);
              } else {
                setShouldPushMoreRows(false);
              }
            }
          });

          observer.observe(e);

          return () => {
            observer.disconnect();
          };
        }}
      ></div>
    </div>
  );
}

export function RevisionTableRow(props: {
  rev: RevisionRow;
  selectedNumber: number;
  revcount: number;
  showSource: (src: string) => void;
}) {
  const rev = props.rev;
  return (
    <tr className={props.selectedNumber === rev.revno ? "selected" : ""}>
      <td>
        {rev.revno}
        <div className="options">
          <button
            onClick={() => {
              // @ts-expect-error
              window.showVersion(Number(rev.revid));
            }}
          >
            View
          </button>
          <button
            onClick={async () => {
              const res = await asyncRequestModule("history/PageSourceModule", {
                revision_id: rev.revid,
              });

              if (res.status !== "ok") {
                alert("Failed to fetch revision.");
              }

              props.showSource(res.body);
            }}
          >
            Source
          </button>
          {props.rev.flags.includes("source") &&
            rev.revno !== props.revcount && (
              <button
                onClick={(event) => {
                  // wikidot has to check the HTML to generate the revert confirmation dialog
                  // this HTML doesn't exist so we have to recreate it
                  const dummyid = `revision-row-${rev.revid}`;
                  if (!document.getElementById(dummyid)) {
                    const dummy = document.createElement("div");
                    dummy.style.display = "none";
                    const dummy2 = document.createElement("td");
                    dummy.appendChild(dummy2);
                    dummy2.innerText = rev.revno?.toString() ?? "";
                    dummy.id = dummyid;
                    document.body.appendChild(dummy);
                  }

                  // @ts-expect-error
                  WIKIDOT.modules.PageHistoryModule.listeners.revert(
                    event.nativeEvent,
                    Number(rev.revid),
                  );
                }}
              >
                Revert
              </button>
            )}
        </div>
      </td>
      <td>
        {rev.byUserLink ? (
          <a href={rev.byUserLink}>
            {rev.byUsername === "AdminBright" ? "TheDuckMan" : rev.byUsername}
          </a>
        ) : (
          <span>{rev.byUserId} (deleted)</span>
        )}
      </td>
      <td>{rev.flags.join(", ")}</td>
      <td className="sh-date">{format(rev.date, "d LLL y")}</td>
      <td>{format(rev.date, "hh:mm:ss")}</td>
      <td className="sh-comments">{rev.comments}</td>
    </tr>
  );
}
