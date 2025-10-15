import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { rawQueryParamPlugin } from "./r628/src-node/esbuild-raw-query-param.js";
import { glob } from "glob";
import { copy } from "esbuild-plugin-copy";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import { smartAsyncReplaceAll } from "./r628/src/stringutils.js";
import { vfsBuilderPlugin } from "./vfsplugin.js";

export const bundledPrecompiledTypescript: esbuild.Plugin = {
  name: "bpt",
  setup(build) {
    build.onResolve({ filter: /\?.*bpt(b64)?/ }, (args) => {
      return {
        path: path.join(args.resolveDir, args.path),
        namespace: "bpt-ns",
      };
    });
    build.onLoad({ filter: /.*/, namespace: "bpt-ns" }, async (args) => {
      console.log("aaaaaaaaaaaa", args.path);
      const fspath = args.path.replace(/\?.*$/, "");

      const b64 = args.path.endsWith("b64");

      const result = await esbuild.build({
        entryPoints: [fspath],
        bundle: true,
        outfile: "index.js",
        write: false,
        plugins: [bundledPrecompiledTypescript, nodeModulesPolyfillPlugin()],
        external: ["vscode"],
      });

      for (const file of result.outputFiles) {
        if (file.path.endsWith("index.js")) {
          const fileString = new TextDecoder("utf8").decode(file.contents);
          return {
            contents: b64 ? btoa(fileString) : fileString,
            loader: "text",
            watchFiles: [fspath],
          };
        }
      }
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: [
    "src/**/*.user.ts",
    "src/**/*.user.tsx",
    "src/wiki-article-graph/wiki-article-graph.ts",
    "src/wiki-article-graph/wiki-article-graph-worker.ts",
  ],
  bundle: true,
  outdir: "build",
  plugins: [
    lessLoader(),
    bundledPrecompiledTypescript,
    rawQueryParamPlugin,
    vfsBuilderPlugin,
    {
      name: "reorder-userscript-comments",
      setup(build) {
        build.onEnd(async () => {
          const files = await glob("build/**/*.user.js");
          await Promise.all([
            files.map(async (f: string) => {
              const file = (await fs.readFile(f)).toString();
              const userscriptCommentRegex =
                /\/\*!\s*?\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==[\s\S]*?\*\//g;
              const matches = [...file.matchAll(userscriptCommentRegex)];
              fs.writeFile(
                f,
                matches.map((m) => m[0]).join("\n") +
                  file.replaceAll(userscriptCommentRegex, "")
              );
            }),
          ]);
        });
      },
    },
  ],
  minify: true,
  sourcemap: true,
  legalComments: "inline",
});

const extctx = await esbuild.context({
  entryPoints: ["src/wikidot-vscode/memfs-ext/extension.ts"],
  bundle: true,
  outfile: "build/wikidot-vscode/memfs-ext/extension.js",
  minify: true,
  sourcemap: true,
  format: "iife",
  external: ["vscode"],
  plugins: [nodeModulesPolyfillPlugin()],
});

const tomlctx = await esbuild.context({
  entryPoints: ["node_modules/smol-toml/dist/index.js"],
  bundle: true,
  outdir: "build",
  plugins: [
    lessLoader(),
    copy({
      resolveFrom: "cwd",
      assets: [
        {
          from: ["./src/wikidot-vscode/memfs-ext/package.json"],
          to: ["./build/wikidot-vscode/memfs-ext/package.json"],
        },

        {
          from: ["./src/wikidot-vscode/product.json"],
          to: ["./build/wikidot-vscode/product.json"],
        },
        {
          from: ["./src/wikidot-vscode/memfs-ext/package.nls.json"],
          to: ["./build/wikidot-vscode/memfs-ext/package.nls.json"],
        },
      ],
      watch: true,
    }),
  ],
  minify: true,
  sourcemap: true,
  format: "esm",
});

// const vscodeHtml = (
//   await fs.readFile("src/wikidot-vscode/test.html")
// ).toString();

// const vscodeHtmlOut = await smartAsyncReplaceAll(
//   vscodeHtml,
//   /\{\{\{[\s\S]*?\}\}\}/g,
//   async (substr): Promise<string> => {
//     const parsed = substr.slice(3, -3).split(":");
//     const cmd = parsed[0];
//     const args = parsed.slice(1).join(":");
//     if (cmd === "base64") {
//       const contents = (await fs.readFile(args)).toString();
//       return `data:${args.endsWith(".js") ? "application/javascript" : "text/css"};base64,${Buffer.from(contents).toString("base64")}`;
//     } else {
//       console.error(`Unrecognized templater command: ${cmd}`);
//       return "";
//     }
//   }
// );

// await fs.writeFile("build/wikidot-vscode/test.html", vscodeHtmlOut.str);

await Promise.all([ctx.watch(), tomlctx.watch(), extctx.watch()]);
