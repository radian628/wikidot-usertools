import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getAllFileInfo, uploadFile } from "../common/file-io.js";
import { getPageSource, setPageSource } from "../common/wikidot-api-utils.js";
import CSS from "./autolocalize-widget.css?raw";
import { EnumField, NumberField, variantUI } from "r628";
import { getResized, imageResizePopup } from "./image-resize-widget.js";

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

type RunStatus = "in-progress" | "success" | "fail" | "not-started";

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

function promiseQueue() {
  let prev: Promise<any> = Promise.resolve();

  return {
    enqueue<T>(p: () => Promise<T>): Promise<T> {
      const myPrev = prev;
      const res = (async () => {
        await myPrev;
        return await p();
      })();
      prev = res;
      return res;
    },
  };
}

function AutoLocalizeWidget(props: {
  done: () => void;
  actions: Action[];
  pageId: string;
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

  function trigger<T>(): Promise<T> & { trigger(t: T): void } {
    let res: (t: T) => void;
    let settled = false;

    const p = new Promise<T>((resolve, reject) => {
      res = resolve;
    });
    // @ts-expect-error
    p.trigger = (t) => {
      if (!settled) res(t);
      settled = true;
    };
    // @ts-expect-error
    return p;
  }

  async function runActions() {
    const fileInfo = await getAllFileInfo(props.pageId);

    const usedFilenames = new Set<string>(
      [...fileInfo.info.values()].map((f) => f.name),
    );

    const extRegex = /\.[a-zA-Z-_]+$/g;

    function pickUniqueFilename(name: string) {
      let candidate = name;
      let i = 2;
      while (true) {
        if (!usedFilenames.has(candidate)) {
          usedFilenames.add(candidate);
          return candidate;
        }
        let ext = name.match(extRegex)?.[0] ?? "";

        candidate = name.replace(extRegex, "") + i + ext;
        i++;
      }
    }
    setRunStatus("in-progress");
    const promises: Promise<void>[] = [];

    const updatePageSourcePromises: Promise<
      | {
          find: string;
          replace: string;
        }
      | undefined
    >[] = [];

    const licenseboxEntries: {
      filename: string;
      sourceLink: string;
      oldFilename: string;
    }[] = [];

    const pageSourceStartedUpdatingTrigger = trigger<void>();
    const pageSourceUpdatedTrigger = trigger<boolean>();

    let allgood = true;

    const popupQueue = promiseQueue();

    for (const [id, { action, status, statusText, enabled }] of actions) {
      if (!enabled) continue;

      function updateStatusText(s: string, status: RunAction["status"]) {
        if (status === "fail") {
          allgood = false;
        }
        setActions((a) =>
          a.set(id, {
            ...a.get(id)!,
            status,
            statusText: s,
          }),
        );
      }
      const pageSourceTrigger = trigger<
        { find: string; replace: string } | undefined
      >();
      updatePageSourcePromises.push(pageSourceTrigger);
      promises.push(
        (async () => {
          if (action.type === "find-replace") {
            updateStatusText("Waiting to update Page Source...", "in-progress");
            pageSourceTrigger.trigger({
              find: action.findInSource,
              replace: action.replaceInSource,
            });
          } else {
            updateStatusText("Fetching file...", "in-progress");
            let corsUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(action.url)}`;
            if (new URL(action.url).hostname.endsWith("wikimedia.org"))
              corsUrl = action.url;
            const res = await (await fetch(corsUrl)).blob().catch();
            if (!res) {
              updateStatusText("Failed to fetch file.", "fail");
              return;
            }

            let file: Blob | null = res;
            let newFileName = action.newName;
            if (
              file.type.startsWith("image") &&
              file.type !== "image/gif" &&
              autoResize !== "none"
            ) {
              updateStatusText("Parsing image...", "in-progress");
              if (autoResize === "auto") {
                const bmp = await createImageBitmap(file);
                const scaleFactor =
                  Math.min(autoResizeWidth, bmp.width) / bmp.width;
                const newWidth = Math.round(bmp.width * scaleFactor);
                const newHeight = Math.round(bmp.height * scaleFactor);
                updateStatusText("Resizing image...", "in-progress");
                file = await getResized(bmp, newWidth, newHeight, 0.9, "webp");
                newFileName = newFileName.replace(/\..+?$/g, ".webp");
              } else if (autoResize === "manual") {
                file = await imageResizePopup(file);
                newFileName = newFileName.replace(
                  /\..+?$/g,
                  {
                    "image/png": ".png",
                    "image/jpeg": ".jpg",
                    "image/webp": ".webp",
                  }[file.type] as string,
                );
              }
            }

            if (!file) {
              updateStatusText("Failed to resize image.", "fail");
              return;
            }

            newFileName = pickUniqueFilename(newFileName);

            updateStatusText("Uploading file to Wikidot...", "in-progress");
            const uploadResult = await uploadFile(
              newFileName,
              file,
              "Uploaded via auto-localizer script.",
              props.pageId,
            )
              .then(() => true)
              .catch(() => false);

            if (!uploadResult) {
              updateStatusText("Failed to upload file to Wikidot.", "fail");
              return;
            }

            licenseboxEntries.push({
              oldFilename: action.newName,
              filename: newFileName,
              sourceLink: action.url,
            });

            updateStatusText("Waiting to update Page Source...", "in-progress");
            pageSourceTrigger.trigger({
              find: action.findInSource,
              replace: action.replaceInSourceBase + newFileName,
            });
          }

          await pageSourceStartedUpdatingTrigger;
          updateStatusText("Updating Page Source...", "in-progress");
          const pageSourceUpdated = await pageSourceUpdatedTrigger;
          if (!pageSourceUpdated) {
            updateStatusText("Failed to update Page Source.", "fail");
            return;
          }

          updateStatusText("Updated Page Source!", "success");
        })().finally(() => {
          pageSourceTrigger.trigger(undefined);
        }),
      );
    }

    await (async () => {
      const updates = await Promise.all(updatePageSourcePromises);
      pageSourceStartedUpdatingTrigger.trigger();
      let src = await getPageSource(window.location.href).catch();
      if (!src) {
        pageSourceUpdatedTrigger.trigger(false);
        return;
      }

      for (const u of updates) {
        if (!u) continue;
        src = src.replaceAll(u.find, u.replace);
      }

      const res = await setPageSource(window.location.href, src)
        .then(() => true)
        .catch(() => false);

      pageSourceUpdatedTrigger.trigger(res);

      await Promise.all(promises);
    })();

    setRunStatus(allgood ? "success" : "fail");

    setLicenseboxContent(
      (
        await Promise.all(
          licenseboxEntries.map(async (l) => {
            const url = new URL(l.sourceLink, window.location.href);

            if (
              url.host === "commons.wikimedia.org" ||
              url.host === "upload.wikimedia.org"
            ) {
              const licenseInfo = await getWikimediaAttribution(l.oldFilename);

              return {
                ...l,
                ...licenseInfo,
              };
            } else {
              return {
                ...l,
              };
            }
          }),
        )
      )
        .map((licenseInfo) => {
          return `> **Filename:** ${licenseInfo.filename} 
${
  licenseInfo.filename !== licenseInfo.oldFilename
    ? `> **Name:** ${licenseInfo.oldFilename}\n`
    : ""
}> **Author:** ${licenseInfo.author?.trim() ?? "PUT AUTHOR HERE"} 
> **License:**${licenseInfo.license ?? "PUT LICENSE HERE"} 
> **Source Link:** ${licenseInfo.sourceLink}`;
        })
        .join("\n\n"),
    );
  }

  const [autoResize, setAutoResize] = useState<"auto" | "manual" | "none">(
    "auto",
  );
  const [autoResizeWidth, setAutoResizeWidth] = useState(800);

  const [autoResizeSizeThreshold, setAutoResizeSizeThreshold] = useState(800);

  // const [autoResizeConfig, setAutoResizeConfig] = useState({
  //   type: "auto-resize",
  //   maxWidth: 800,
  // } as
  // | {
  //     type: "auto-resize";
  //     maxWidth: number;
  //   }
  // | {
  //     type: "no-resize";
  //   }
  // | {
  //     type: "manual-resize";
  //     sizeLimit: number
  //   });

  const [licenseboxContent, setLicenseboxContent] = useState("");

  return (
    <div className="autolocalize-widget">
      <style>{CSS}</style>
      <h1>SCP Wiki Image Localizer Tool</h1>
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
      <h2>Settings</h2>
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
        <span
          className="autoresize-text"
          style={{
            opacity: autoResize ? 1 : 0.6,
          }}
        >
          Automatically resize images to at most{" "}
          <NumberField
            value={autoResizeWidth}
            setValue={setAutoResizeWidth}
            step={1}
            min={0}
            max={2000}
            scale="linear"
          ></NumberField>{" "}
          pixels wide.
        </span>
      </div>
      <h2>Actions</h2>
      <p>Press the button below to apply all selected changes.</p>
      <button className="run-button" onClick={runActions}>
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
        Once images are uploaded, their license box info will appear here,
        allowing you to automatically populate the license box:
      </p>
      <textarea value={licenseboxContent}></textarea>
    </div>
  );
}

export function autolocalizePopup(actions: Action[], pageId: string) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  const reactRoot = createRoot(root);

  return new Promise<void>((resolve, reject) => {
    reactRoot.render(
      <AutoLocalizeWidget
        actions={actions}
        done={resolve}
        pageId={pageId}
      ></AutoLocalizeWidget>,
    );
  });
}

function licenseCheck(table: HTMLElement | null) {
  let imageLicense: string = "";
  if (!table) {
    return "ERROR: License not found. Check the page manually.";
  }
  if (table.innerText.search("Public domain") != -1) {
    imageLicense = "Public Domain";
  } else if (
    table.innerText.search(
      "Creative Commons CC0 1.0 Universal Public Domain Dedication",
    ) != -1
  ) {
    imageLicense = "CC0 1.0";
  } else if (
    table.innerText.search(
      "Creative Commons Attribution-Share Alike 4.0 International",
    ) != -1
  ) {
    imageLicense = "CC-BY-SA 4.0";
  } else if (
    table.innerText.search(
      "Creative Commons Attribution-Share Alike 3.0 Unported",
    ) != -1
  ) {
    imageLicense = "CC-BY-SA 3.0";
  } else if (table.innerText.search("ShareAlike 1.0") != -1) {
    //Bugged?
    imageLicense = "CC-BY-SA 1.0";
  } else if (
    table.innerText.search("Creative Commons Attribution-Share Alike 2.5") != -1
  ) {
    imageLicense = "CC-BY-SA 2.5";
  } else if (table.innerText.search("Creative Commons Attribution 2.0") != -1) {
    imageLicense = "CC-BY 2.0";
  } else if (table.innerText.search("Creative Commons Attribution 3.0") != -1) {
    imageLicense = "CC-BY 3.0";
  } else if (table.innerText.search("Creative Commons Attribution 4.0") != -1) {
    imageLicense = "CC-BY 4.0";
  }

  if (imageLicense == "") {
    imageLicense = "ERROR: Incompatible License or Other Error";
  }
  return imageLicense;
}

async function getWikimediaAttribution(filename: string) {
  const json = await (
    await fetch(
      `https://commons.wikimedia.org/w/api.php?action=parse&format=json&page=File%3A${filename}&formatversion=2&origin=*`,
    )
  ).json();

  if (!json.parse) return {};

  const dom = new DOMParser().parseFromString(json.parse.text, "text/html");

  const rows = dom.querySelectorAll("table tr");

  const props: {
    author?: string;
    license?: string;
  } = {};

  for (const row of Array.from(rows) as HTMLElement[]) {
    if ((row.children[0] as HTMLElement | undefined)?.innerText === "Author") {
      props.author = (row.children[1] as HTMLElement | undefined)?.innerText;
    }
  }

  props.license = licenseCheck(dom.querySelector(".licensetpl"));

  console.log(props);

  return props;
}
