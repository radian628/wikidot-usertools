import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import * as path from "node:path";
import * as fs from "node:fs/promises";

export const bundledPrecompiledTypescript: esbuild.Plugin = {
  name: "bpt",
  setup(build) {
    build.onResolve({ filter: /\?.*bpt/ }, (args) => {
      return {
        path: path.join(args.resolveDir, args.path),
        namespace: "bpt-ns",
      };
    });
    build.onLoad({ filter: /.*/, namespace: "bpt-ns" }, async (args) => {
      console.log("aaaaaaaaaaaa", args.path);
      const fspath = args.path.replace(/\?.*$/, "");

      const result = await esbuild.build({
        entryPoints: [fspath],
        bundle: true,
        outfile: "index.js",
        write: false,
        plugins: [bundledPrecompiledTypescript],
      });

      for (const file of result.outputFiles) {
        if (file.path.endsWith("index.js")) {
          return {
            contents: new TextDecoder("utf8").decode(file.contents),
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
    "src/wiki-article-graph/wiki-article-graph.ts",
    "src/wiki-article-graph/wiki-article-graph-worker.ts",
  ],
  bundle: true,
  outdir: "build",
  plugins: [lessLoader(), bundledPrecompiledTypescript],
  minify: true,
  sourcemap: true,
});

const tomlctx = await esbuild.context({
  entryPoints: ["node_modules/smol-toml/dist/index.js"],
  bundle: true,
  outdir: "build",
  plugins: [lessLoader()],
  minify: true,
  sourcemap: true,
  format: "esm",
});

await Promise.all([ctx.watch(), tomlctx.watch()]);
