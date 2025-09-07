import { workerifyServer } from "r628";
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
