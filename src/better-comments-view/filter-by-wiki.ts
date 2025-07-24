import { registerStorageItem } from "../common/localstorage-io.js";
import { stringField } from "../common/string-field.js";

const wikiFilter = registerStorageItem("filter-by-wiki", "");

export function createWikiFilterField() {
  const sf = stringField(wikiFilter);

  const root = document.createElement("div");

  root.appendChild(sf.element);
  const docs = document.createElement("p");
  docs.innerText =
    "Put the wiki slug in the text box above (without quotes) to view posts from only that wiki (e.g. 'scp-wiki', 'scp-sandbox-3', 'scp-wiki-cn', etc.). Leave empty to perform no filtering.";
  root.appendChild(docs);

  return {
    element: root,
    wikiFilter,
    unmount: () => {
      sf.unmount();
    },
  };
}
