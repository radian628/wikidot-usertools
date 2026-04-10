import { Evalbox, GetSet, SmartGetSet } from "r628";
import React from "react";

export type PluginHooks = {
  replacePageWith(component: React.FC<{}>): () => void;
  appendToPage(component: React.FC<{}>): () => void;
  evalbox: Evalbox;
};

export type UsertoolPlugin<Settings> = {
  name: string;
  defaultSettings: Settings;
  settingsMenu?: React.FC<SmartGetSet<Settings>>;
  shouldRun: (url: URL) => boolean;
  onPageLoad(hooks: PluginHooks, settings: Settings): Promise<void>;
  customEditor?: React.FC<{ hooks: PluginHooks; settings: Settings }>;
};
