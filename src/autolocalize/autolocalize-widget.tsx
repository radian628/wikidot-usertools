import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { getAllFileInfo, uploadFile } from "../common/file-io.js";
import { getPageSource, setPageSource } from "../common/wikidot-api-utils.js";
import CSS from "./autolocalize-widget.css?raw";
import { EnumField, NumberField } from "r628";
import { getResized, imageResizePopup } from "./image-resize-widget.js";
import { generateLicensebox, LicenseboxEntry } from "./generate-licensebox.js";
import { OffsetInfo } from "./find-offsets.js";
import { isGifAnimated, isWebpAnimated } from "./image-parsing.js";
import { performActionsLogic } from "./action-logic.js";

export type Action =
  | {
      type: "localize";
      url: string;
      newName: string;
      findInSource: string;
      replaceInSourceBase: string;
      info: string;
      id: number;
    }
  | {
      type: "find-replace";
      findInSource: string;
      replaceInSource: string;
      info: string;
      id: number;
    };

export type RunStatus = "in-progress" | "success" | "fail" | "not-started";

export type RunAction = {
  action: Action;
  status: RunStatus;
  statusText: string;
  enabled: boolean;
};

function filename(urlstring: string) {
  const url = new URL(urlstring, window.location.href);
  return url.pathname.split("/").at(-1);
}

function ActionWidget(props: {
  action: RunAction;
  setAction: (f: RunAction) => void;
}) {
  return (
    <li>
      <input
        className="enable-disable-toggle"
        type="checkbox"
        checked={props.action.enabled}
        onChange={(e) => {
          props.setAction({
            ...props.action,
            enabled: e.currentTarget.checked,
          });
        }}
      ></input>
      {props.action.action.type === "localize" ? (
        <div className="action-info">
          Re-upload{" "}
          <a href={props.action.action.url} target="_blank">
            {filename(props.action.action.url)}
          </a>{" "}
          to Wikidot
        </div>
      ) : (
        <div className="action-info">
          Replace '{props.action.action.findInSource}' with '
          {props.action.action.replaceInSource}'
        </div>
      )}
      <div className="reasoning">{props.action.action.info}</div>
      <div className={`status status-${props.action.status}`}>
        {props.action.statusText}
      </div>
    </li>
  );
}

const isArtPage =
  window.location.pathname.startsWith("/art:") ||
  document.querySelector(".page-tags a[href*=artwork]") ||
  document.querySelector(".page-tags a[href*=artist]");

function AutoLocalizeWidget(props: {
  done: () => void;
  actions: Action[];
  pageId: string;
  close: () => void;
  offsets: OffsetInfo[];
}) {
  const [actions, setActions] = useState<Map<number, RunAction>>(
    new Map(
      props.actions.map((a) => {
        return [
          a.id,
          {
            status: "not-started",
            statusText: "Not started.",
            action: a,
            enabled: true,
          },
        ];
      }),
    ),
  );

  const [runStatus, setRunStatus] = useState<RunStatus>("not-started");

  async function runActions() {
    await performActionsLogic({
      actions,
      setActions,
      setRunStatus,
      setLicenseboxContent,
      pageId: props.pageId,
      autoResize,
      autoResizeWidth,
      offsets: props.offsets,
    });
  }

  const [autoResize, setAutoResize] = useState<"auto" | "manual" | "none">(
    "auto",
  );
  const [autoResizeWidth, setAutoResizeWidth] = useState(
    isArtPage ? 1600 : 800,
  );

  const [autoResizeSizeThreshold, setAutoResizeSizeThreshold] = useState(800);

  const [licenseboxContent, setLicenseboxContent] = useState("");

  return (
    <>
      <h1>SCP Wiki Image Localizer Tool</h1>
      {window.location.pathname.startsWith("/fragment:") ? (
        <p style={{ color: "#b00" }}>
          Warning: This seems to be a <code>fragment:</code> page. If you are
          attempting to localize images within one or more{" "}
          <code>fragment:</code> pages that correspond to a parent page, use
          this tool on the parent page instead, not on the fragment pages
          individually. This tool will automatically identify, scan, and update
          all fragment pages associated with a parent page.
        </p>
      ) : (
        <></>
      )}
      <p>
        Some images on your page are not properly localized. Use this tool to
        fix them.
      </p>
      <h2>Proposed Changes</h2>
      <p>
        Below is a list of changes this tool can automatically make to the page
        to fix the improperly localized files.
      </p>
      <ul className="autolocalize-action-list">
        {[...actions.entries()].map(([id, a], i) => (
          <ActionWidget
            key={a.action.id}
            action={a}
            setAction={(newAct) => setActions(new Map(actions).set(id, newAct))}
          ></ActionWidget>
        ))}
      </ul>
      <h2>Affected Pages</h2>
      <p>Below is a list of pages that will be modified by this tool:</p>
      <ul>
        <li>
          <a target="_blank" href={window.location.href}>
            {window.location.href}
          </a>{" "}
          (This page)
        </li>
        {props.offsets.map((o) => (
          <li key={o.url}>
            <a target="_blank" href={o.url}>
              {o.url}
            </a>{" "}
            (Fragment)
          </li>
        ))}
      </ul>
      <p>
        Note that in addition to the page you are currently on, if this page has
        any associated fragments, their URLs should also appear in the list
        above. If a fragment does not appear in the list above, ensure that (1)
        it is parented to the page you are currently on, and (2), its URL is
        placed within a Wikidot comment wthin the parent page's Page Source.
        Note that both of the above are{" "}
        <a
          target="_blank"
          href="https://scp-wiki.wikidot.com/technical-content-policy#toc1"
        >
          required by the Technical Content Policy
        </a>
        .
      </p>
      <p>
        <em>
          You do <em>not</em> need to run this tool individually on each
          fragment &mdash; you need only run it on the parent page.
        </em>
      </p>
      <h2>Settings</h2>
      <p>Image resize options (note: GIFs and SVGs will not be resized):</p>
      <div className="settings">
        <EnumField
          value={autoResize}
          setValue={setAutoResize}
          variants={[
            ["none", "None"],
            ["manual", "Manual"],
            ["auto", "Auto"],
          ]}
        ></EnumField>
        {
          {
            none: <></>,
            manual: (
              <>
                Prompt to resize all files greater than{" "}
                <NumberField
                  value={autoResizeSizeThreshold}
                  setValue={setAutoResizeSizeThreshold}
                ></NumberField>{" "}
                kB in size.
              </>
            ),
            auto: (
              <>
                Automatically downsize all files to at most
                <NumberField
                  value={autoResizeWidth}
                  setValue={setAutoResizeWidth}
                ></NumberField>{" "}
                pixels in width.
              </>
            ),
          }[autoResize]
        }
      </div>
      <h2>Actions</h2>
      <p>Press the button below to apply all selected changes.</p>
      <button
        className="run-button"
        onClick={() => {
          if (runStatus === "not-started") {
            runActions();
          }
        }}
        style={{
          opacity: runStatus === "not-started" ? 1 : 0.6,
        }}
      >
        Apply Changes
      </button>
      <div className={`status-text status-${runStatus}`}>
        Status:{" "}
        {
          {
            "not-started": "Not Started",
            "in-progress": "Running...",
            success:
              "All operations were successful! Refresh the page and see if the images look correct.",
            fail: "Some or all operations failed. See above.",
          }[runStatus]
        }
      </div>
      <h2>License Box</h2>
      <p>
        Once images are uploaded, their corresponding license box contents will
        appear here.{" "}
        <em>
          Make sure to check the output from this tool to ensure it is fully
          filled-in; it is only able to automatically fill in the "Author" and
          "License" fields for certain image sources (e.g. Wikimedia Commons)
        </em>
        :
      </p>
      <textarea readOnly value={licenseboxContent}></textarea>
    </>
  );
}

function LicenseboxWidget(props: { actions: Action[] }) {
  const [licenseboxContent, setLicenseboxContent] = useState("");

  return (
    <div>
      <h1>SCP Wiki License Box Creator Tool</h1>
      <p>
        This tool will create a partially-filled-out license box by examining
        the files hotlinked to this page.
      </p>
      <h2>License Box</h2>
      <p>
        Press the button below to generate a license box, the text for which
        will appear in the box below that.
      </p>
      <br></br>
      <button
        onClick={async () => {
          setLicenseboxContent(
            await generateLicensebox(
              props.actions.flatMap((a) => {
                if (a.type === "find-replace") {
                  return [];
                } else {
                  return [
                    {
                      sourceLink: a.url,
                      oldFilename: a.newName,
                    },
                  ];
                }
              }),
            ),
          );
        }}
      >
        Generate License Box Code
      </button>
      <br></br>
      <textarea readOnly value={licenseboxContent}></textarea>
    </div>
  );
}

function AutoLocalizePopup(props: {
  done: () => void;
  actions: Action[];
  pageId: string;
  close: () => void;
  offsets: OffsetInfo[];
}) {
  const [mode, setMode] = useState<"licensebox" | "localize">("localize");

  return (
    <div className="autolocalize-widget">
      <style>{CSS}</style>
      <button onClick={() => props.close()}>Close</button>
      <br></br>
      <EnumField
        value={mode}
        setValue={setMode}
        variants={[
          ["licensebox", "Generate Licensebox"],
          ["localize", "Localize and Generate Licensebox"],
        ]}
      ></EnumField>
      {mode === "localize" ? (
        <AutoLocalizeWidget {...props}></AutoLocalizeWidget>
      ) : (
        <LicenseboxWidget actions={props.actions}></LicenseboxWidget>
      )}
    </div>
  );
}

export function autolocalizePopup(
  actions: Action[],
  pageId: string,
  offsets: OffsetInfo[],
) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  const reactRoot = createRoot(root);

  return new Promise<void>((resolve, reject) => {
    reactRoot.render(
      <AutoLocalizePopup
        actions={actions}
        done={resolve}
        close={() => {
          reactRoot.unmount();
          document.body.removeChild(root);
          resolve();
        }}
        pageId={pageId}
        offsets={offsets}
      ></AutoLocalizePopup>,
    );
  });
}
