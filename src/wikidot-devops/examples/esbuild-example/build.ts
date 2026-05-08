import * as esbuild from "esbuild";
import {
  WikidotDevopsFileMessage,
  WikidotDevopsMessage,
} from "../../server/src/common-defs.js";
import {
  createWikidotDevopsServer,
  FileDeploymentSpec,
} from "../../server/src/index.js";
import path from "node:path";
import { wikidotDevopsPlugin } from "../../server/src/esbuild-integration.js";

const server = createWikidotDevopsServer({
  onListen() {
    console.log("server started");
  },
});

const SITE = "scp-sandbox-3";
const SLUG = "radian628:devops-test-esbuild";

function pushUpdate(files: FileDeploymentSpec[]) {
  server.pushUpdate({
    pages: [
      {
        tags: [],
        site: SITE,
        slug: SLUG,
        title: "Test with esbuildd",
        source: `
le epic iframe:        
[[html]]
<script src="/local--files/${SLUG}/code.js"></script>
[[/html]]
        `,
        files,
      },
    ],
  });
}

const fileUpdateIndexes = new Map<string, number>();

const ctx = await esbuild.context({
  entryPoints: ["./src/code.ts"],
  outdir: "./assets",
  bundle: true,
  metafile: true,
  plugins: [
    wikidotDevopsPlugin({
      pushUpdate(files) {
        pushUpdate(files);
      },
    }),
  ],
});

await ctx.watch();
