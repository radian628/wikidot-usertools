import * as esbuild from "esbuild";
import { FileDeploymentSpec } from ".";
import * as path from "node:path";

export function wikidotDevopsPlugin(config: {
  pushUpdate(files: FileDeploymentSpec[]): void;
  filterFiles?(path: string): void;
}): esbuild.Plugin {
  return {
    name: "Wikidot DevOps",
    setup(build) {
      const fileUpdateIndexes = new Map<string, number>();
      build.onEnd((res) => {
        if (!res.metafile) return;
        for (const f of Object.entries(res.metafile.outputs)) {
          fileUpdateIndexes.set(f[0], (fileUpdateIndexes.get(f[0]) ?? 0) + 1);
        }
        config.pushUpdate(
          Object.entries(res.metafile.outputs)
            .filter((f) => config.filterFiles?.(f[0]) ?? true)
            .map((f) => ({
              type: "on-disk",
              pathOnDisk: f[0],
              name: path.basename(f[0]),
              index: fileUpdateIndexes.get(f[0]) ?? 0,
            })),
        );
      });
    },
  };
}
