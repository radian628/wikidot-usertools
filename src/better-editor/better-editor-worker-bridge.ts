import { cssModuleParser } from "./css-module-parser.js";

export const WorkerBridge = {
  extractStylesheets(document: string) {
    const parsed = cssModuleParser.parse(document);
    const css: string[] = [];
    parsed.iterate({
      enter(node) {
        if (node.name === "CSSModuleContent") {
          css.push(document.slice(node.from, node.to));
        }
      },
    });
    return css;
  },
};
