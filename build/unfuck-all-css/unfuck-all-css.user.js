"use strict";
(() => {
  // src/unfuck-all-css/unfuck-all-css.user.ts
  var UnfuckAllCSSPlugin = {
    name: "Unfuck All CSS",
    defaultSettings: {},
    shouldRun: () => true,
    async onPageLoad(hooks, settings) {
      window.addEventListener("load", () => {
        console.log("got here 2");
        const styles = Array.from(document.querySelectorAll("style"));
        for (const s of styles) {
          s.parentElement.removeChild(s);
        }
        for (const s of styles) {
          s.textContent += "/*force refresh lol*/";
          document.head.appendChild(s);
        }
      });
    }
  };
})();
