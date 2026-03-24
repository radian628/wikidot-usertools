import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import CSS from "./autolocalize-ui.css?raw";
import { RunningAction, Status } from "./autolocalize-actions.js";

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

function StatusView(params: { status: Status }) {
  return (
    <div className={`status-${params.status.type}`}>{params.status.data}</div>
  );
}

function ActionView(params: { action: RunningAction }) {
  const a = params.action;

  const [status, setStatus] = useState<Status | undefined>();

  if (a.type === "find-replace") {
    return (
      <li className="action-container">
        <div className="action find-replace">
          <div className="category">Find/Replace Page Source</div>
          <div className="reasoning">{a.reasoning}</div>
          <div className="find">
            <div className="context">Find & Remove:</div>
            <span className="rm">{a.find}</span>
          </div>
          <div className="replace">
            <div className="context">Replace With:</div>
            {a.replace}
          </div>
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
          <div className="url">
            <div className="context">Fetch From:</div>
            {a.oldUrl}
          </div>
          <div className="name">
            <div className="context">Upload w/ Filename:</div>
            {a.newName}
          </div>
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
      <style>{CSS}</style>
      <p>
        Some files on this page are not properly localized to the SCP Wiki. The
        URLs of these files are listed below:
      </p>
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
      <p>
        This script may be able to fix these files automatically by performing
        the following actions:
      </p>
      <ul className="actions-list">
        {(runningActions ?? params.actions).map((act) => {
          return <ActionView action={act} key={act.id}></ActionView>;
        })}
      </ul>
      <p>
        Press the button below for this script to run the actions above on your
        behalf. Remember to always manually check the page afterwards for
        breakage!
      </p>
      <button>Run Actions</button>
    </div>
  );
}

export function initAutolocalizeUI(params: {
  urls: string[];
  actions: Action[];
}) {
  const root2 = document.createElement("div");
  document.body.appendChild(root2);
  createRoot(root2).render(
    <AutolocalizeUI {...{ ...params }}></AutolocalizeUI>,
  );
  return root2;
}
