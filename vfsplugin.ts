import * as esbuild from "esbuild";
import * as path from "path";
import * as fs from "node:fs/promises";
import { minimatch } from "minimatch";

async function buildVFSTree(
  link: string,
  levels: number,
  exclude: string[]
): Promise<string | undefined> {
  const isDir = (await fs.lstat(link)).isDirectory();
  if (isDir && levels > 0) {
    const contents = (
      await Promise.all(
        (await fs.readdir(link)).map(async (l) => ({
          name: l,
          tree: await buildVFSTree(`${link}/${l}`, levels - 1, exclude),
        }))
      )
    ).filter((e) => e.tree !== undefined);

    return `{
  type: "dir",
  name: ${JSON.stringify(link.split("/").at(-1))},
  contents: new Map([${contents.map((c) => `[${JSON.stringify(c.name)}, ${c.tree}]`).join(",")}])
}`;
  } else if (!isDir) {
    for (const exc of exclude) {
      if (minimatch(link, exc)) {
        return;
      }
    }
    return `{
  type: "file",
  name: ${JSON.stringify(link.split("/").at(-1))},
  contents: "${(await fs.readFile(link)).toString("base64url")}"
}`;
  }
}

async function getAllFilesAndDirs(
  link: string,
  exclude: string[]
): Promise<{ dirs: string[]; files: string[] }> {
  const isDir = (await fs.lstat(link)).isDirectory();
  if (isDir) {
    const fileNames = await fs.readdir(link);
    const children = (
      await Promise.all(
        fileNames.map(async (fn) => {
          const filepath = `${link}/${fn}`;
          for (const exc of exclude) {
            if (minimatch(filepath, exc)) {
              console.log("excluded", filepath, "with rule", exc);
              return [];
            }
          }
          return [await getAllFilesAndDirs(filepath, exclude)];
        })
      )
    ).flat(1);
    return {
      dirs: [link, ...children.flatMap((c) => c.dirs)],
      files: children.flatMap((c) => c.files),
    };
  }
  return {
    dirs: [],
    files: [link],
  };
}

export const vfsBuilderPlugin: esbuild.Plugin = {
  name: "vfs",
  setup(build) {
    build.onResolve({ filter: /\?vfs$/ }, (args) => {
      return {
        path: path.join(args.resolveDir, args.path.slice(0, -4)),
        namespace: "vfs-ns",
      };
    });
    build.onLoad({ filter: /.*/, namespace: "vfs-ns" }, async (args) => {
      const vfsSpec = JSON.parse((await fs.readFile(args.path)).toString());
      const root = vfsSpec.root;
      const exclude = vfsSpec.exclude ?? [];
      console.log("building vfs", root);
      let depth = Infinity;
      const fspath = path.join(path.dirname(args.path), root);
      const filesAndDirs = await getAllFilesAndDirs(fspath, exclude);

      const outstr =
        `export default ` + (await buildVFSTree(fspath, depth, exclude));
      console.log("vfs done!");
      return {
        contents: outstr,
        loader: "ts",
        watchFiles: [...filesAndDirs.files, args.path],
        watchDirs: filesAndDirs.dirs,
      };
    });
  },
};
