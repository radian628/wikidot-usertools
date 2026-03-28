import { getAllFileInfo, uploadFile } from "../common/file-io.js";
import { getPageSource, setPageSource } from "../common/wikidot-api-utils.js";
import { RunAction, RunStatus } from "./autolocalize-widget.js";
import { OffsetInfo } from "./find-offsets.js";
import { generateLicensebox, LicenseboxEntry } from "./generate-licensebox.js";
import { isGifAnimated, isWebpAnimated } from "./image-parsing.js";
import { getResized, imageResizePopup } from "./image-resize-widget.js";

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

export async function performActionsLogic(params: {
  actions: Map<number, RunAction>;
  autoResize: "manual" | "auto" | "none";
  autoResizeWidth: number;
  setActions: (
    cb: (a: Map<number, RunAction>) => Map<number, RunAction>,
  ) => void;
  setRunStatus: (s: RunStatus) => void;
  setLicenseboxContent: (s: string) => void;
  pageId: string;
  offsets: OffsetInfo[];
}) {
  const {
    actions,
    setActions,
    setRunStatus,
    setLicenseboxContent,
    autoResize,
    autoResizeWidth,
    offsets,
  } = params;

  const fileInfo = await getAllFileInfo(params.pageId);

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
        licensebox: boolean;
      }[]
    | undefined
  >[] = [];

  const pageSourceStartedUpdatingTrigger = trigger<void>();
  const pageSourceUpdatedTrigger = trigger<boolean>();

  let allgood = true;

  const popupQueue = promiseQueue();

  const licenseboxEntries: LicenseboxEntry[] = [];

  for (const [id, { action, status, statusText, enabled }] of actions) {
    if (!enabled) continue;

    function updateStatusText(s: string, status: RunAction["status"]) {
      if (status === "fail") {
        allgood = false;
      }
      setActions((a) =>
        new Map(a).set(id, {
          ...a.get(id)!,
          status,
          statusText: a.get(id)!.statusText + "\n" + s,
        }),
      );
    }
    const pageSourceTrigger = trigger<
      { find: string; replace: string; licensebox: boolean }[] | undefined
    >();
    updatePageSourcePromises.push(pageSourceTrigger);
    promises.push(
      (async () => {
        if (action.type === "find-replace") {
          updateStatusText("Waiting to update Page Source...", "in-progress");
          pageSourceTrigger.trigger([
            {
              find: action.findInSource,
              replace: action.replaceInSource,
              licensebox: false,
            },
          ]);
        } else {
          updateStatusText("Fetching file...", "in-progress");
          let corsProxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(action.url)}`;
          let fetchUrl = action.url;

          if (
            new URL(action.url).hostname.endsWith("wikidot.com") ||
            new URL(action.url).hostname.endsWith("wdfiles.com")
          )
            fetchUrl = corsProxyUrl;

          const res = await (
            await fetch(fetchUrl)
              .catch(() => {
                updateStatusText(
                  "Initial fetch failed; trying CORS proxy...",
                  "in-progress",
                );
                return fetch(corsProxyUrl);
              })
              .catch(() => undefined)
          )?.blob();
          if (!res) {
            updateStatusText("Failed to fetch file.", "fail");
            return;
          }

          let file: Blob | null = res;

          if (!file.type.startsWith("image")) {
            updateStatusText(
              "Error: File is not an image. Alternatively, fetching it may have failed, causing it to return non-image data.",
              "fail",
            );
            return;
          }

          let newFileName = action.newName;
          if (
            file.type.startsWith("image") &&
            file.type !== "image/svg+xml" &&
            autoResize !== "none"
          ) {
            let skipResize = false;

            if (file.type === "image/webp") {
              updateStatusText(
                "Checking if webp image is animated...",
                "in-progress",
              );
              if (await isWebpAnimated(file)) {
                skipResize = true;
                updateStatusText(
                  "Webp is animated; skipping resize...",
                  "in-progress",
                );
              } else {
                updateStatusText(
                  "Webp is not animated; resizing...",
                  "in-progress",
                );
              }
            } else if (file.type === "image/gif") {
              updateStatusText(
                "Checking if gif image is animated...",
                "in-progress",
              );
              if (await isGifAnimated(file)) {
                skipResize = true;
                updateStatusText(
                  "Gif is animated; skipping resize...",
                  "in-progress",
                );
              } else {
                updateStatusText(
                  "Gif is not animated; resizing...",
                  "in-progress",
                );
              }
            }

            if (!skipResize) {
              updateStatusText("Parsing image for resize...", "in-progress");
              if (autoResize === "auto") {
                const bmp = await createImageBitmap(file);
                const scaleFactor =
                  Math.min(autoResizeWidth, bmp.width) / bmp.width;
                const newWidth = Math.round(bmp.width * scaleFactor);
                const newHeight = Math.round(bmp.height * scaleFactor);
                updateStatusText("Resizing image...", "in-progress");
                file = await getResized(bmp, newWidth, newHeight, 0.9, "webp");
                newFileName = newFileName.replace(/\..+?$/g, "") + ".webp";
              } else if (autoResize === "manual") {
                file = await imageResizePopup(file);
                newFileName = (newFileName.replace(/\..+?$/g, "") +
                  {
                    "image/png": ".png",
                    "image/jpeg": ".jpg",
                    "image/webp": ".webp",
                  }[file.type]) as string;
              }
            }
          }

          if (file && file.type === "image/svg+xml") {
            updateStatusText(
              "Image identified as SVG; skipping resize...",
              "in-progress",
            );
            const filestr = await file.text();
            if (!filestr.startsWith("<?xml")) {
              updateStatusText("Prepending SVG metadata...", "in-progress");
              file = new Blob([
                `<?xml version="1.0" encoding="UTF-8" standalone="no"?>${file}`,
              ]);
            } else {
              updateStatusText(
                "Confirmed SVG file already has proper metadata...",
                "in-progress",
              );
            }
          }

          if (!file) {
            updateStatusText("Failed to resize image.", "fail");
            return;
          }

          newFileName = encodeURIComponent(pickUniqueFilename(newFileName));

          updateStatusText(
            `Uploading file to Wikidot as '${newFileName}'...`,
            "in-progress",
          );
          const uploadResult = await uploadFile(
            decodeURIComponent(newFileName),
            file,
            "Uploaded via auto-localizer script.",
            params.pageId,
          ).catch(() => false);

          if (!uploadResult) {
            updateStatusText("Failed to upload file to Wikidot.", "fail");
            return;
          }

          licenseboxEntries.push({
            oldFilename: action.newName,
            filename: newFileName,
            sourceLink: action.url,
          });

          updateStatusText(
            "Waiting to update Page Source(s)...",
            "in-progress",
          );
          pageSourceTrigger.trigger([
            {
              find: action.findInSource,
              replace: action.replaceInSourceBase + newFileName,
              licensebox: false,
            },
            {
              find: `ADD FILENAME FOR ${action.url} HERE ONCE UPLOADED`,
              replace: "> **Filename: **" + decodeURIComponent(newFileName),
              licensebox: true,
            },
          ]);
        }

        await pageSourceStartedUpdatingTrigger;
        updateStatusText("Updating Page Source(s)...", "in-progress");
        const pageSourceUpdated = await pageSourceUpdatedTrigger;
        if (!pageSourceUpdated) {
          updateStatusText("Failed to update Page Source.", "fail");
          return;
        }

        updateStatusText("Updated Page Source(s)!", "success");
      })().finally(() => {
        pageSourceTrigger.trigger(undefined);
      }),
    );
  }

  async function updatePageSource(url: string) {
    const updates = (await Promise.all(updatePageSourcePromises)).flat(1);
    let src = await getPageSource(url)
      .then((s) => s.replaceAll("\u00A0", " "))
      .catch();
    if (!src) {
      pageSourceUpdatedTrigger.trigger(false);
      return;
    }

    const LICENSEBOX_REGEX =
      /component:license-box[\s\S]+component:license-box-end/g;

    let licensebox = src.match(LICENSEBOX_REGEX)?.[0] ?? "";

    src = src.replaceAll(
      LICENSEBOX_REGEX,
      "{{{{{{LICENSEBOX_PLACEHOLDER}}}}}}",
    );

    for (const u of updates) {
      if (!u) continue;
      if (u.licensebox) {
        licensebox = licensebox.replaceAll(u.find, u.replace);
      } else {
        src = src.replaceAll(u.find, u.replace);
      }
    }

    src = src.replaceAll("{{{{{{LICENSEBOX_PLACEHOLDER}}}}}}", licensebox);

    const res = await setPageSource(
      url,
      src,
      undefined,
      "Automatically fixed hotlinked images using the AutoLocalize script.",
    )
      .then(() => true)
      .catch(() => false);

    return res;
  }

  await (async () => {
    pageSourceStartedUpdatingTrigger.trigger();

    const res = (
      await Promise.all([
        updatePageSource(window.location.href),
        ...params.offsets.map((o) => updatePageSource(o.url)),
      ])
    ).every((x) => x);

    pageSourceUpdatedTrigger.trigger(res);

    await Promise.all(promises);
  })();

  setRunStatus(allgood ? "success" : "fail");

  setLicenseboxContent(await generateLicensebox(licenseboxEntries));
}
