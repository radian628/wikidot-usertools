import { Evalbox, GetSet, SmartGetSet } from "r628";
import React from "react";

export type PluginHooks = {
  replacePageWith(component: React.FC<{}>): () => void;
  appendToPage(component: React.FC<{}>, style?: string): () => void;
  addMenu(params: {
    icon: React.FC<{}>;
    menu?: React.FC<{}>;
    onClickIcon?: () => void;
  }): () => void;
  evalbox: Evalbox;
  waitForPageLoad: () => Promise<void>;
  toast: (
    component: React.FC,
    duration: number,
    type?: "info" | "warning" | "error" | "success",
  ) => void;
  enableFeature: (feature: UsertoolFeature) => Promise<void>;
};

export type UsertoolPlugin<Settings> = {
  name: string;
  defaultSettings: Settings;
  settingsMenu?: React.FC<SmartGetSet<Settings>>;
  shouldRun: (url: URL) => boolean;
  onPageLoad(hooks: PluginHooks, settings: Settings): Promise<void>;
  customEditor?: React.FC<{ hooks: PluginHooks; settings: Settings }>;
};

export type UsertoolFeature = {
  name: string;
  setup: (hooks: PluginHooks) => void | Promise<void>;
};
