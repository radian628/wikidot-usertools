import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import { rawQueryParamPlugin } from "r628/src-node/esbuild-raw-query-param.js";
import { bundledPrecompiledTypescript } from "r628/src-node/esbuild-precompiled-ts.js";
import { buildNotifyPlugin } from "r628/src-node/esbuild-build-notify.js";
import { buildserver } from "./src/common/buildserver.js";
import * as fs from "node:fs/promises";
import { glob } from "glob";
import { sep as pathSep } from "node:path";

buildserver();

const bpt = bundledPrecompiledTypescript({
  plugins: [rawQueryParamPlugin],
});

function sharedLibPlugin(sharedLibs: string[]): esbuild.Plugin {
  return {
    name: "Shared Libraries",
    setup(build) {
      const escapedPathSep = RegExp.escape(pathSep);
      const resolvedFilter = new RegExp(
        `^(${sharedLibs.map((s) => RegExp.escape(`${s}`)).join("|")})$`,
      );
      // const filter = new RegExp(
      //   `node_modules${escapedPathSep}(${sharedLibs.map((s) => RegExp.escape(s)).join("|")})${escapedPathSep}`,
      // );
      const filter = new RegExp(
        `^(${sharedLibs.map((s) => RegExp.escape(`shared-lib:${s}`)).join("|")})$`,
      );

      build.onResolve({ filter: resolvedFilter }, async (r) => {
        if (r.pluginData?.loadNormally) {
          return undefined;
        }

        return {
          path: r.path,
          namespace: "shared-lib",
        };
      });

      build.onLoad({ filter: /.*/, namespace: "shared-lib" }, async (r) => {
        const pathRaw = await build.resolve(r.path, {
          kind: "import-rule",
          pluginData: { loadNormally: true },
          resolveDir: "./",
        });

        const path = JSON.stringify(pathRaw.path);

        return {
          resolveDir: "./",
          pluginData: { loadNormally: true },
          contents: `

if (!unsafeWindow.wikidotUsertoolSharedLibs) 
 unsafeWindow.wikidotUsertoolSharedLibs = {};

const slibs = unsafeWindow.wikidotUsertoolSharedLibs;
let value = slibs[${path}];
if (!value) {
  value = require(${path});
}
slibs[${path}] = value;

for (const [k, v] of Object.entries(value)) {
  exports[k] = v;
}
`,
          loader: "ts",
        };
      });
    },
  };
}

const ctx = await esbuild.context({
  entryPoints: ["src/**/*.user.ts", "src/**/*.user.tsx"],
  bundle: true,
  outdir: "build",
  // external: ["react", "react-dom"],
  plugins: [
    bpt,
    lessLoader(),
    sharedLibPlugin(["react", "react-dom", "react-dom/client"]),
    buildNotifyPlugin("BUILD"),
    rawQueryParamPlugin,
    {
      name: "reorder-userscript-comments",
      setup(build) {
        build.onEnd(async () => {
          const files = await glob("build/**/*.user.js");
          await Promise.all([
            files.map(async (f: string) => {
              const file = (await fs.readFile(f)).toString();
              const noSES = file.includes("/*!NO_SES*/");
              const userscriptCommentRegex =
                /\/\*!\s*?\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==[\s\S]*?\*\//g;
              //           const matches = [...file.matchAll(userscriptCommentRegex)];
              //           fs.writeFile(
              //             f,
              //             matches.map((m) => m[0]).join("\n") +
              //               `
              // "use strict";
              // ${noSES ? "Promise.resolve()" : `import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")`}
              // .then(() => {
              //   try {
              //     ${noSES ? "" : `lockdown();`}
              //   }  catch (e) { console.warn(e); }

              // ` +
              //               file.replaceAll(userscriptCommentRegex, "") +
              //               " });",
              //           );
            }),
          ]);
        });
      },
    },
  ],
  minify: false,
  // sourcemap: "inline",
  legalComments: "inline",
});

await ctx.watch();
