import { FileInfo, getFileInfo, getFileLink } from "../common/file-io.js";
import { getAllOffsets } from "../common/get-all-offsets.js";
import { getPageSource } from "../common/wikidot-api-utils.js";

const corsify = (url: string) =>
  `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;

type AttachedFileProblem =
  | {
      type: "size";
      size: number;
    }
  | {
      type: "no-extension";
    };

type LinkedFileProblem =
  | { type: "size"; size: number }
  | { type: "hotlink" }
  | {
      type: "failed-to-load";
      error: string;
    };

type FileSpec =
  | {
      problems: AttachedFileProblem[];
      type: "attached";
      info: FileInfo;
    }
  | {
      problems: LinkedFileProblem[];
      type: "linked";
      url: URL;
      sourcePages: Set<string>;
    };

type ImageLink = {
  sourcePages: Set<string>;
  link: URL;
};

async function auditFile(spec: FileSpec): Promise<FileSpec> {
  if (spec.type === "linked") {
    const problems: LinkedFileProblem[] = [];
    const corsURL = corsify(spec.url.href);

    const result: Blob | string = await fetch(corsURL)
      .then(async (r) => await r.blob())
      .catch((r) => r.toString());

    if (typeof result === "string") {
      problems.push({ type: "failed-to-load", error: result });
    } else {
      if (spec.url.origin !== window.location.origin) {
        const type = result.type;
        const isImage = type.startsWith("image");
        const sizeLimit = isImage ? 800_000 : 4_000_000;
        if (result.size > sizeLimit) {
          problems.push({
            type: "size",
            size: result.size,
          });
        }
      }
    }

    return {
      type: "linked",
      url: spec.url,
      sourcePages: spec.sourcePages,
      problems,
    };
  } else {
    const problems: AttachedFileProblem[] = [];

    const result: Blob = await fetch(getFileLink(spec.info.name)).then(
      async (r) => await r.blob()
    );

    const type = result.type;
    const isImage = type.startsWith("image");
    const sizeLimit = isImage ? 800_000 : 4_000_000;
    if (spec.info.size > sizeLimit) {
      problems.push({
        type: "size",
        size: result.size,
      });
    }

    if (!spec.info.name.match(/\.[^\.]$/g)) {
      problems.push({
        type: "no-extension",
      });
    }

    return {
      type: "attached",
      problems,
      info: spec.info,
    };
  }
}

(async () => {
  const [files, offsets] = await Promise.all([
    await getFileInfo(),
    await getAllOffsets(window.location.href),
  ]);

  const offsetHTMLs = await Promise.all(
    offsets.map(async (o) => ({ link: o, html: await (await fetch(o)).text() }))
  );

  const imageLinks = new Map<string, ImageLink>();

  for (const offset of offsetHTMLs) {
    const dom = new DOMParser().parseFromString(offset.html, "text/html");
    const images = Array.from(
      dom.querySelectorAll("#page-content img")
    ) as HTMLImageElement[];
    for (const img of images) {
      const url = new URL(img.src, window.location.href);
      const href = url.href;

      let link: ImageLink = imageLinks.get(href) ?? {
        sourcePages: new Set<string>(),
        link: url,
      };
      link.sourcePages.add(offset.link);
      imageLinks.set(href, link);
    }
  }
})();
