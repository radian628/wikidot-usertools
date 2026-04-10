import { UsertoolPlugin } from "../combined/plugin.js";

export const UnfuckAllCSSPlugin: UsertoolPlugin<{}> = {
  name: "Unfuck All CSS",
  defaultSettings: {},
  shouldRun: () => true,
  async onPageLoad(hooks, settings) {
    window.addEventListener("load", () => {
      const styles = Array.from(document.querySelectorAll("style"));
      for (const s of styles) {
        s.parentElement!.removeChild(s);
      }

      for (const s of styles) {
        s.textContent += "/*force refresh lol*/";
        document.head.appendChild(s);
      }
    });
  },
};
