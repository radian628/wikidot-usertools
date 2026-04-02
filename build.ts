import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import { rawQueryParamPlugin } from "r628/src-node/esbuild-raw-query-param.js";
import { bundledPrecompiledTypescript } from "r628/src-node/esbuild-precompiled-ts.js";
import { buildNotifyPlugin } from "r628/src-node/esbuild-build-notify.js";
import { buildserver } from "./src/common/buildserver.js";
import * as fs from "node:fs/promises";
import { glob } from "glob";

buildserver();

const bpt = bundledPrecompiledTypescript({
  plugins: [rawQueryParamPlugin],
});

const ctx = await esbuild.context({
  entryPoints: ["src/**/*.user.ts", "src/**/*.user.tsx"],
  bundle: true,
  outdir: "build",
  plugins: [
    bpt,
    lessLoader(),
    buildNotifyPlugin("BUILD"),
    rawQueryParamPlugin,
    {
      name: "reorder-userscript-comments",
      setup(build) {
        build.onEnd(async () => {
          const start = performance.now();
          const files = await glob("build/**/*.user.js");
          await Promise.all([
            files.map(async (f: string) => {
              const file = (await fs.readFile(f)).toString();
              const noSES = file.includes("/*!NO_SES*/");
              const userscriptCommentRegex =
                /\/\*!\s*?\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==[\s\S]*?\*\//g;
              const matches = [...file.matchAll(userscriptCommentRegex)];
              fs.writeFile(
                f,
                matches.map((m) => m[0]).join("\n") +
                  `
    "use strict";
    ${noSES ? "Promise.resolve()" : `import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")`}
    .then(() => {
      try {
        ${noSES ? "" : `lockdown();`}
      }  catch (e) { console.warn(e); }

    ` +
                  file.replaceAll(userscriptCommentRegex, "") +
                  " });",
              );
            }),
          ]);
          console.log("time1", performance.now() - start);
        });
      },
    },
  ],
  minify: true,
  legalComments: "inline",
});

await ctx.watch();
