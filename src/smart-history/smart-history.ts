import { UsertoolPlugin } from "../combined/plugin.js";
import { getPageRevisionRange } from "../common/history.js";
import { asyncRequestModule, getPageId } from "../common/wikidot-api-utils.js";
import { smartHistoryUI } from "./smart-history-ui.js";

async function main() {
  const historyButton = document.querySelector("#history-button");
  if (!historyButton) return;
  historyButton.id = "";
  const newHistoryButton = document.createElement("a");
  historyButton.insertAdjacentElement("afterend", newHistoryButton);
  historyButton.remove();
  newHistoryButton.innerText = "History";
  newHistoryButton.className = "btn btn-default";
  newHistoryButton.href = "javascript:;";
  newHistoryButton.id = "history-button";

  newHistoryButton.addEventListener("click", async () => {
    const pageId = await getPageId(window.location.href);
    if (!pageId) return;
    const latestRev = await getPageRevisionRange(pageId, 0, 1);
    if (!latestRev) return;

    // needed to add the PageHistoryModule script
    await asyncRequestModule("history/PageHistoryModule", {
      page_id: pageId,
    });

    const actionArea = document.getElementById("action-area");
    if (!actionArea) return;
    actionArea.innerHTML = "";
    actionArea.style.display = "block";
    actionArea.appendChild(
      smartHistoryUI({
        pageId,
        revcount: latestRev[0].revno,
      }),
    );
  });
}
export const SmartHistoryPlugin: UsertoolPlugin<{}> = {
  name: "Smart History",
  defaultSettings: {},
  shouldRun: () => true,
  async onPageLoad() {
    await main();
  },
};
