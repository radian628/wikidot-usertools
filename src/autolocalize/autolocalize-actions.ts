import { memo } from "r628";
import { getPageSource, setPageSource } from "../common/wikidot-api-utils.js";

export type Status = { type: "success" | "fail"; data: string };

export type RunningAction = Action & {
  status?: Status;
};

export type Action =
  | {
      id: number;
      type: "find-replace";
      find: string;
      replace: string;
      reasoning: string;
    }
  | {
      id: number;
      type: "upload-file";
      oldUrl: string;
      newName: string;
      reasoning: string;
    };

type ActionContext = {
  pageSource: string;
  pendingActions: { action: Action; resolved: Promise<Status> }[];
  emitInfo(id: number, text: string): void;
  allFileUploadsSettled: () => Promise<"all-succeeded" | "fail">;
  addAction(action: Action): Promise<Status>;
  finalize(): Promise<void>;
};

async function runAction(a: Action, ctx: ActionContext): Promise<Status> {
  ctx.emitInfo(a.id, "Starting...");
  if (a.type === "find-replace") {
    ctx.pageSource = ctx.pageSource.replaceAll(a.find, a.replace);

    ctx.emitInfo(a.id, "Waiting for file uploads to complete...");
    const fileUploadsStatus = await ctx.allFileUploadsSettled();

    if (fileUploadsStatus === "all-succeeded") {
      try {
        ctx.emitInfo(a.id, "Uploading modified Page Source...");
        await setPageSource(window.location.href, ctx.pageSource);
        return {
          type: "success",
          data: "Uploaded modified page source!",
        };
      } catch (e) {
        return {
          type: "fail",
          data: "Failed to upload page source!",
        };
      }
    } else {
      return {
        type: "fail",
        data: "Some file uploads did not succeed; page source was consequently not modified.",
      };
    }
  } else if (a.type === "upload-file") {
  }
}

const once = <T>(fn: () => T) => {
  let ran = false;
  let stored: T | undefined;
  return () => {
    if (!ran) {
      ran = true;
      stored = fn();
    }
    return stored!;
  };
};

function waitABit() {
  return new Promise((resolve, reject) => setTimeout(resolve));
}

function createActionContext(pageSource: string): ActionContext {
  let finalized = false;

  const ctx: ActionContext = {
    allFileUploadsSettled: once(async () => {
      while (!finalized) await waitABit();
      const uploadResults = await Promise.all(
        ctx.pendingActions
          .filter((p) => p.action.type === "upload-file")
          .map((p) => p.resolved),
      );
      return uploadResults.every((r) => r.type === "success")
        ? "all-succeeded"
        : "fail";
    }),
    pageSource,
    pendingActions: [],
    addAction(action) {
      const r = runAction(action, this);
      this.pendingActions.push({ resolved: r, action });
      return r;
    },
    async finalize() {
      finalized = true;
    },
  };

  return ctx;
}
