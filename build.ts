import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

const ctx = await esbuild.context({
  entryPoints: [
    "src/better-comments-view/better-comments-view.user.ts",
    "src/wiki-article-graph/wiki-article-graph.ts",
    "src/wiki-article-graph/wiki-article-graph-worker.ts",
  ],
  bundle: true,
  outdir: "build",
  plugins: [lessLoader()],
  minify: true,
  sourcemap: true,
});

await ctx.watch();
