import React from "react";
import { UsertoolPlugin } from "../combined/plugin.js";
import { initCustomCssWidget } from "./widget.js";

export const CustomCSSWidgetPlugin: UsertoolPlugin<{}> = {
  name: "Custom CSS Widget",
  defaultSettings: {},
  shouldRun: () => true,
  async onPageLoad(hooks, settings) {
    const initListener = () => {
      initCustomCssWidget();
      document.removeEventListener("click", initListener);
    };

    document.addEventListener("click", initListener);
  },
};
