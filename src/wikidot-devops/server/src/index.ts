#! /usr/bin/env node
import express from "express";
import cors from "cors";
import * as fs from "node:fs/promises";
import { watch } from "chokidar";
import expressWs from "express-ws";
import { WebSocket } from "ws";
import * as path from "node:path";
import { WikidotDevopsFileMessage, WikidotDevopsMessage } from "./common-defs";

export type FileDeploymentSpec =
  | {
      type: "on-disk";
      pathOnDisk: string;
      name: string;
      comments?: string;
      index: number;
    }
  | {
      type: "data";
      data: ArrayBuffer | string;
      name: string;
      comments?: string;
    };

export type PageDeploymentSpec = {
  site: string;
  slug: string;
  title: string;
  tags: string[];
  files: FileDeploymentSpec[];
  source: string;
};

export type WikidotDevopsDeploymentSpec = {
  pages: PageDeploymentSpec[];
};

export type WikidotDevopsDeploymentServerConfig = {
  rootDir?: string;
  port?: number;
  hostname?: string;
  onListen?: () => void;
};

export type WikidotDevopsDeploymentServer = {
  pushUpdate(spec: WikidotDevopsDeploymentSpec): void;
};

export type MapDeploymentSpec = Map<
  string,
  {
    pagesBySlug: Map<
      string,
      {
        title: string;
        tags: string[];
        files: Map<string, FileDeploymentSpec>;
        source: string;
      }
    >;
  }
>;

function mapifySpec(spec: WikidotDevopsDeploymentSpec): MapDeploymentSpec {
  const pagesBySite: MapDeploymentSpec = new Map();
  for (const page of spec.pages) {
    const map = pagesBySite.get(page.site) ?? {
      pagesBySlug: new Map(),
    };
    pagesBySite.set(page.site, map);

    const pageInfo = {
      title: page.title,
      tags: page.tags,
      files: new Map(),
      source: page.source,
    };

    map.pagesBySlug.set(page.slug, pageInfo);

    for (const file of page.files) {
      pageInfo.files.set(file.name, file);
    }
  }
  return pagesBySite;
}

function diffFiles(
  sitename: string,
  pageslug: string,
  before: Map<string, FileDeploymentSpec> | undefined,
  after: Map<string, FileDeploymentSpec>,
  config: {
    hostname: string;
    port: number;
  },
) {
  const fileList: WikidotDevopsFileMessage[] = [];

  for (const [filename, afterFile] of after) {
    const beforeFile = before?.get(filename);

    let shouldIncludeFile = false;

    if (!beforeFile) {
      shouldIncludeFile = true;
    }

    if (beforeFile?.type === "on-disk" && afterFile.type === "on-disk") {
      if (
        beforeFile.index !== afterFile.index ||
        beforeFile.pathOnDisk !== afterFile.pathOnDisk
      ) {
        shouldIncludeFile = true;
      }
    }

    if (beforeFile?.type === "data" && afterFile?.type === "data") {
      if (beforeFile.data !== afterFile.data) {
        shouldIncludeFile = true;
      } else if (
        beforeFile instanceof ArrayBuffer &&
        afterFile instanceof ArrayBuffer &&
        beforeFile.byteLength === afterFile.byteLength
      ) {
        let beforeBytes = new Uint8Array(beforeFile);
        let afterBytes = new Uint8Array(afterFile);
        for (let i = 0; i < beforeBytes.length; i++) {
          if (beforeBytes[i] !== afterBytes[i]) {
            shouldIncludeFile = true;
            break;
          }
        }
      }
    }

    if (shouldIncludeFile) {
      fileList.push({
        name: filename,
        comments: afterFile.comments,
        fetchUrl: `http://${config.hostname}:${config.port}/files/${sitename}/${pageslug}/${filename}`,
      });
    }
  }

  return fileList;
}

function diffSpecs(
  before: MapDeploymentSpec,
  after: MapDeploymentSpec,
  config: {
    hostname: string;
    port: number;
  },
) {
  const msg: WikidotDevopsMessage = {
    updatedPages: [],
  };

  for (const [sitename, site] of after) {
    for (const [pageslug, afterPage] of site.pagesBySlug) {
      const beforePage = before.get(sitename)?.pagesBySlug.get(pageslug);

      const files = diffFiles(
        sitename,
        pageslug,
        beforePage?.files,
        afterPage.files,
        config,
      );

      const pageSourceChanged = beforePage?.source !== afterPage.source;
      const titleChanged = beforePage?.title !== afterPage.title;
      const tagsChanged = beforePage?.tags !== afterPage.tags;
      const filesChanged = files.length > 0;

      const anyChanged =
        pageSourceChanged || titleChanged || tagsChanged || filesChanged;

      if (!anyChanged) continue;

      msg.updatedPages.push({
        site: sitename,
        slug: pageslug,
        updatedContent:
          pageSourceChanged || titleChanged
            ? {
                title: afterPage.title,
                updatedSourceUrl: `http://${config.hostname}:${config.port}/source/${sitename}/${pageslug}`,
              }
            : undefined,
        updatedFiles: files,
      });
    }
  }

  return msg;
}

export function createWikidotDevopsServer(
  config: WikidotDevopsDeploymentServerConfig,
): WikidotDevopsDeploymentServer {
  const app = express();
  const appws = expressWs(app);
  app.use(cors());

  const port = config.port ?? 6969;
  const hostname = config.hostname ?? "localhost";

  // do not allow any file access outside of this directory
  const enforcedRootDir = config.rootDir
    ? path.resolve(config.rootDir)
    : path.resolve(process.cwd(), "assets");

  /*
    for page with slug SLUG on site SITE with attached file FILENAME,
    the following resources are present:

    path: /SITE/SLUG/source
    path: /SITE/SLUG/files/FILENAME
  */

  let pagesBySite: MapDeploymentSpec = new Map();

  // ...
  app.get("/source/:site/:slug", (req, res) => {
    if (!pagesBySite) {
      res.status(400);
      res.end("Pages are not loaded yet.");
      return;
    }
    const page = pagesBySite
      .get(req.params.site)
      ?.pagesBySlug.get(req.params.slug);
    if (!page) {
      res.status(404).end("Page does not exist.");
      return;
    }

    res.end(page.source);
  });

  app.get("/files/:site/:slug/:filename", (req, res) => {
    if (!pagesBySite) {
      res.status(400);
      res.end("Pages are not loaded yet.");
      return;
    }
    const page = pagesBySite
      .get(req.params.site)
      ?.pagesBySlug.get(req.params.slug);
    if (!page) {
      res.status(404).end("Pages does not exist.");
      return;
    }

    const file = page.files.get(req.params.filename);
    if (!file) {
      res.status(404).end("File does not exist.");
      return;
    }

    if (file.type === "data") {
      res.end(file.data);
    } else {
      const abspath = path.resolve(process.cwd(), file.pathOnDisk);
      if (!abspath.startsWith(enforcedRootDir)) {
        res.status(403).end("Invalid path.");
        return;
      }
      console.log("abspath", abspath);
      res.sendFile(abspath);
    }
  });

  let clients: Set<WebSocket> = new Set();

  appws.app.ws("/changes", (ws, req) => {
    clients.add(ws);
    ws.send(
      JSON.stringify(diffSpecs(new Map(), pagesBySite, { port, hostname })),
    );

    ws.on("close", () => {
      clients.delete(ws);
    });
  });

  app.listen(port, hostname, config.onListen);

  return {
    pushUpdate(spec) {
      const oldSpec = pagesBySite;
      pagesBySite = mapifySpec(spec);
      const diff = diffSpecs(oldSpec, pagesBySite, { port, hostname });
      for (const c of clients) {
        c.send(JSON.stringify(diff));
      }
    },
  };
}
