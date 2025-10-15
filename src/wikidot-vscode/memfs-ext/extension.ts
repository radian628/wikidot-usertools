import * as vscode from "vscode";
import { Volume } from "memfs";
import type Dirent from "memfs/lib/node/Dirent";

export class WebFilesystem
  implements vscode.FileSystemProvider, vscode.Disposable
{
  static scheme = "memfs";
  vol: Volume;

  private readonly disposable: vscode.Disposable;

  dispose() {
    this.disposable.dispose();
  }

  constructor() {
    this.vol = Volume.fromNestedJSON({
      "sample-folder": {
        "README.md": "please fucking work thank you.",
      },
    });

    this.disposable = vscode.Disposable.from(
      vscode.workspace.registerFileSystemProvider(WebFilesystem.scheme, this, {
        isCaseSensitive: true,
      })
    );

    this.vol.watch(
      "/",
      {
        recursive: true,
      },
      (eventType, filename) => {
        for (const cb of this.fileChangeCallbacks) {
          let fileChangeType = vscode.FileChangeType.Changed;
          if (eventType === "rename") {
            if (this.vol.existsSync(filename)) {
              fileChangeType = vscode.FileChangeType.Created;
            } else {
              fileChangeType = vscode.FileChangeType.Deleted;
            }
          }
          cb.listener.bind(cb.thisArgs)([
            {
              uri: vscode.Uri.parse(filename),
              type: fileChangeType,
            },
          ]);
        }
      }
    );
  }

  parseUri(uri: vscode.Uri) {
    if (uri.toString().startsWith("memfs:")) return uri.toString().slice(6);
    return uri.toString();
  }

  readFile(uri: vscode.Uri): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      this.vol.readFile(this.parseUri(uri), (err, data) => {
        if (err) return reject(err);
        if (data) {
          if (typeof data === "string") {
            resolve(new TextEncoder().encode(data));
          } else {
            resolve(data);
          }
        } else {
          reject();
        }
      });
    });
  }

  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { readonly create: boolean; readonly overwrite: boolean }
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.vol.writeFile(this.parseUri(uri), content, (err, data) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  stat(uri: vscode.Uri): Promise<vscode.FileStat> {
    return new Promise((resolve, reject) => {
      this.vol.stat(this.parseUri(uri), (err, data) => {
        if (err) return reject(err);
        if (data) {
          resolve({
            ctime: Number(data.ctimeMs),
            mtime: Number(data.mtimeMs),
            size: Number(data.size),
            type:
              (data.isFile() ? vscode.FileType.File : 0) |
              (data.isDirectory() ? vscode.FileType.Directory : 0) |
              (data.isSymbolicLink() ? vscode.FileType.SymbolicLink : 0),
          });
        }
      });
    });
  }

  readDirectory(
    uri: vscode.Uri
  ): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
    return new Promise((resolve, reject) => {
      this.vol.readdir(
        this.parseUri(uri),
        {
          withFileTypes: true,
        },
        (err, data) => {
          if (err) return reject(err);
          if (data) {
            resolve(
              (data as Dirent[]).map((d) => {
                return [
                  d.name.toString(),
                  ((d.isFile() ? vscode.FileType.File : 0) |
                    (d.isDirectory() ? vscode.FileType.Directory : 0) |
                    (d.isSymbolicLink()
                      ? vscode.FileType.SymbolicLink
                      : 0)) as vscode.FileType,
                ];
              })
            );
          } else {
            reject();
          }
        }
      );
    });
  }

  delete(
    uri: vscode.Uri,
    options: { readonly recursive: boolean }
  ): void | Thenable<void> {
    return new Promise((resolve, reject) => {
      if (options.recursive) {
        this.vol.rm(
          this.parseUri(uri),
          {
            recursive: options.recursive,
          },
          (err, data) => {
            if (err) reject(err);
            resolve();
          }
        );
      }
    });
  }

  createDirectory(uri: vscode.Uri): void | Thenable<void> {
    return new Promise((resolve, reject) => {
      this.vol.mkdir(this.parseUri(uri), (err, data) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  // TODO: handle rename overwrites
  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { readonly overwrite: boolean }
  ): void | Thenable<void> {
    return new Promise((resolve, reject) => {
      this.vol.rename(
        this.parseUri(oldUri),
        this.parseUri(newUri),
        (err, data) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  watchers: Set<{
    path: string;
    recursive: boolean;
    excludes: readonly string[];
  }> = new Set();
  fileChangeCallbacks: Set<{
    listener: (e: vscode.FileChangeEvent[]) => any;
    thisArgs?: any;
    disposables?: vscode.Disposable[];
  }> = new Set();

  watch(
    uri: vscode.Uri,
    options: {
      readonly recursive: boolean;
      readonly excludes: readonly string[];
    }
  ): vscode.Disposable {
    return new vscode.Disposable(() => {});
  }

  onDidChangeFile(
    listener: (e: vscode.FileChangeEvent[]) => any,
    thisArgs?: any,
    disposables?: vscode.Disposable[]
  ): vscode.Disposable {
    const callback = {
      listener,
      thisArgs,
      disposables,
    };
    this.fileChangeCallbacks.add(callback);
    return new vscode.Disposable(() => {
      this.fileChangeCallbacks.delete(callback);
      for (const d of disposables ?? []) d.dispose();
    });
  }
}

function activate(context: vscode.ExtensionContext) {
  console.log("EXTENSION ENABLED!");
  const filesystem = new WebFilesystem();
  context.subscriptions.push(filesystem);
  // fetch("ballsack");
}

const e = eval("exports");
e.activate = activate;
