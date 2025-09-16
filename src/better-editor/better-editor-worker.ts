import { createWorkerReceiver } from "../../r628/src/workerify.js";
import { WorkerBridge } from "./better-editor-worker-bridge.js";

createWorkerReceiver("w1", WorkerBridge);
