import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getPageRevisionRange, RevisionRow } from "../common/history.js";
import { format, getYear } from "date-fns";
import CSS from "./smart-history-ui.css?raw";
import { mutatify, NumberField } from "r628";
import { Diff } from "./diff.js";

type SmartHistoryProps = {
  pageId: string;
  revcount: number;
};

export function smartHistoryUI(props: SmartHistoryProps) {
  const elem = document.createElement("div");
  const root = createRoot(elem);
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

  return (
    <>
      <style>{CSS}</style>
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
      <br />
      <div className="sh-cmp">
        <label>Compare </label>
        <NumberFieldM
          value={cmpMin}
          setValue={setCmpMin}
        ></NumberFieldM> -&gt;{" "}
        <NumberFieldM value={cmpMax} setValue={setCmpMax}></NumberFieldM>
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
          {revs.rows.map((r) => (
            <RevisionTableRow
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
    </>
  );
}

export function RevisionTableRow(props: {
  rev: RevisionRow;
  selectedNumber: number;
}) {
  const rev = props.rev;
  return (
    <tr className={props.selectedNumber === rev.revno ? "selected" : ""}>
      <td>{rev.revno}</td>
      <td>
        {rev.byUserLink ? (
          <a href={rev.byUserLink}>{rev.byUsername}</a>
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
