#! /usr/bin/env node
import express from "express";
import cors from "cors";
import * as fs from "node:fs/promises";
import { watch } from "chokidar";
import expressWs from "express-ws";
import { WebSocket } from "ws";
import { Command } from "commander";

const program = new Command();

program
  .command("run")
  .description("Runs the server.")
  .action(async (options) => {
    const configFile = JSON.parse(
      (await fs.readFile("./wds-config.json")).toString()
    );

    const app = express();

    const appws = expressWs(app);

    app.use(cors());

    app.use("/static", express.static("static"));

    app.use("/files", express.static("files"));

    app.use("/filenames.json", async (req, res) => {
      res.end(JSON.stringify(await fs.readdir("files")));
    });

    let clients: Set<WebSocket> = new Set();

    appws.app.ws("/changes", (ws, req) => {
      clients.add(ws);

      ws.on("close", () => {
        clients.delete(ws);
      });
    });

    function onTryRefresh() {
      for (const c of clients) {
        c.send(JSON.stringify({ type: "full-refresh" }));
      }
    }

    watch("static", { usePolling: true }).on("all", () => {
      onTryRefresh();
    });
    watch("files", { usePolling: true }).on("all", () => {
      onTryRefresh();
    });

    app.listen(configFile.port, () => {
      console.log(`Server started on http://localhost:${configFile.port}`);
    });
  });

program
  .command("init")
  .argument("<slug>", "Wikidot page slug.")
  .argument("<port>", "Server port.")
  .description("Creates a project template for a CI/CD-driven Wikidot page.")
  .action(async (slug, port, options) => {
    await Promise.all([
      fs.mkdir("files"),
      fs.mkdir("static"),
      fs.writeFile(
        "wds-config.json",
        JSON.stringify(
          {
            port,
          },
          undefined,
          2
        )
      ),
    ]);
    await Promise.all([
      fs.writeFile(
        "static/manifest.json",
        JSON.stringify(
          [
            {
              pageSlug: slug,
              sourceTextUrl: `http://localhost:${port}/static/source.txt`,
              metadataUrl: `http://localhost:${port}/static/metadata.json`,
              fileAttachmentNamesUrl: `http://localhost:${port}/filenames.json`,
              filesBaseUrl: `http://localhost:${port}/files`,
              changesUrl: `ws://localhost:${port}/changes`,
            },
          ],
          undefined,
          2
        )
      ),
      fs.writeFile(
        "static/metadata.json",
        JSON.stringify(
          {
            tags: [],
            title: "Page Title",
          },

          undefined,
          2
        )
      ),
      fs.writeFile(
        "static/source.txt",
        `[!--devops:http://localhost:${port}/static/manifest.json--]
Wikidot Devops Server Example`
      ),
    ]);
  });

program.parseAsync();
