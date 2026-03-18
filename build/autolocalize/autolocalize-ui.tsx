import React, { Fragment, useEffect, useState } from "react";
import { Action } from "../../src/autolocalize/autolocalize.user.js";

function pubsub<T>() {
  const handlers = new Set<(t: T) => void>();
  return {
    publish(t: T) {
      for (const h of handlers) h(t);
    },
    subscribe(cb: (t: T) => void) {
      handlers.add(cb);
      return () => {
        handlers.delete(cb);
      };
    },
  };
}

type Emitter<T> = {
  subscribe(cb: (t: T) => void): () => void;
};
type Status = { type: "success" | "fail" | "info"; data: string };

type RunningAction = Action & {
  events?: Emitter<Status>;
};

function StatusView(params: { status: Status }) {
  return (
    <div className={`status-${params.status.type}`}>{params.status.data}</div>
  );
}

function ActionView(params: { action: RunningAction }) {
  const a = params.action;

  useEffect(() => {
    if (!a.events) {
      return;
    }
    const unsub = a.events.subscribe((evt) => {
      setStatus(evt);
    });
    return unsub;
  }, [a]);

  const [status, setStatus] = useState<Status | undefined>();

  if (a.type === "find-replace") {
    return (
      <li className="action-container">
        <div className="action find-replace">
          <div className="category">Find/Replace Page Source</div>
          <div className="reasoning">{a.reasoning}</div>
          <div className="find">{a.find}</div>
          <div className="replace">{a.replace}</div>
        </div>
        {status && <StatusView status={status}></StatusView>}
      </li>
    );
  } else if (a.type === "upload-file") {
    return (
      <li className="action-container">
        <div className="action upload-file">
          <div className="category">Upload File</div>
          <div className="reasoning">{a.reasoning}</div>
          <div className="url">{a.oldUrl}</div>
          <div className="name">{a.newName}</div>
        </div>
        {status && <StatusView status={status}></StatusView>}
      </li>
    );
  }
}

export function AutolocalizeUI(params: { urls: string[]; actions: Action[] }) {
  const { urls } = params;

  const [runningActions, setRunningActions] = useState<
    RunningAction[] | undefined
  >(undefined);

  return (
    <div className="autolocalize-ui">
      Some files on this page are not properly localized to the SCP Wiki. The
      URLs of these files are listed below:
      <ul>
        {urls.map((u) => (
          <Fragment key={u}>
            <li>
              <a href={u} target="_blank">
                {u}
              </a>
            </li>
          </Fragment>
        ))}
      </ul>
      <br></br>
      This script may be able to fix these files automatically by performing the
      following actions:
      <ul className="actions-list">
        {(runningActions ?? params.actions).map((act) => {
          return <ActionView action={act} key={act.id}></ActionView>;
        })}
      </ul>
    </div>
  );
}

export function initAutolocalizeUI(params: {
  urls: string[];
  actions: Action[];
}) {
  const root2 = document.createElement("div");
  document.body.appendChild(root2);
  // createRoot(root2).rendedr()
  return root2;
}
