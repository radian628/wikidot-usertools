import { workerifyServer } from "../common/workerify.js";
import { wikiGraphWorkerInterface } from "./wiki-article-graph-worker-interface.js";

const server = workerifyServer(
  wikiGraphWorkerInterface,
  "graph",
  (cb) => {
    const messageListener = (e: MessageEvent) => {
      cb(e.data);
    };
    self.addEventListener("message", messageListener);
    return () => self.removeEventListener("message", messageListener);
  },
  (res) => {
    self.postMessage(res);
  }
);
