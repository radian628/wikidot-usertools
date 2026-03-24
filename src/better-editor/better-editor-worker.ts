import { createWorkerReceiver } from "r628";
import { WorkerBridge } from "./better-editor-worker-bridge.js";

createWorkerReceiver("w1", WorkerBridge);
