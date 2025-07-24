import * as esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";

const ctx = await esbuild.context({
  entryPoints: ["src/better-comments-view/better-comments-view.user.ts"],
  bundle: true,
  outdir: "build",
  plugins: [lessLoader()],
  minify: true,
});

await ctx.watch();
