import { waitFor } from "r628";
import { UsertoolPlugin } from "./plugin.js";

export async function loadUsertoolsBundle(plugins: UsertoolPlugin<any>[]) {
  const registerWikidotPlugin = await waitFor(
    () => unsafeWindow.registerWikidotPlugin,
  );
  await Promise.all(plugins.map((p) => registerWikidotPlugin(p)));
}
