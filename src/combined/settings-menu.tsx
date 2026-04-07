import React, { useEffect, useState } from "react";
import { UsertoolPlugin } from "./plugin.js";
import { arrayToMapValues, BooleanField, useGetSet } from "r628";
import CSS from "./SettingsMenu.css?raw";

export async function getSettings<T>(plugin: UsertoolPlugin<T>): Promise<T> {
  const settingsKey = "radian628-plugin-settings-" + plugin.name;
  const val = JSON.parse(
    await GM.getValue(settingsKey, JSON.stringify(plugin.defaultSettings)),
  );
  return val;
}

export async function setSettings<T>(
  plugin: UsertoolPlugin<T>,
  settings: T,
): Promise<void> {
  const settingsKey = "radian628-plugin-settings-" + plugin.name;
  GM.setValue(settingsKey, JSON.stringify(settings));
}

export async function getIsEnabled(
  plugin: UsertoolPlugin<any>,
): Promise<boolean> {
  const isEnabledKey = "radian628-plugin-is-enabled-" + plugin.name;
  const val = JSON.parse(await GM.getValue(isEnabledKey, "false"));
  return val;
}

export async function setIsEnabled<T>(
  plugin: UsertoolPlugin<T>,
  value: boolean,
): Promise<void> {
  const isEnabledKey = "radian628-plugin-is-enabled-" + plugin.name;
  await GM.setValue(isEnabledKey, JSON.stringify(value));
}

export function SettingsMenu(props: { plugins: UsertoolPlugin<any>[] }) {
  const plugins = props.plugins;

  const [openPlugin, setOpenPlugin] = useState(plugins[0]);

  return (
    <div className="plugin-settings-page">
      <style>{CSS}</style>
      <h1>Radian628 Wikidot Usertools</h1>
      <ul className="page-toggle-list">
        {plugins.map((p) => {
          const [isEnabledLocal, setIsEnabledLocal] = useIsEnabled(p);

          if (isEnabledLocal === undefined) {
            return <li>Loading...</li>;
          }

          return (
            <li key={p.name}>
              <BooleanField
                value={isEnabledLocal}
                setValue={(cb) => setIsEnabledLocal((v) => cb(v ?? false))}
              ></BooleanField>{" "}
              <a
                href="#"
                onClick={() => {
                  setOpenPlugin(p);
                }}
              >
                {p.name}
              </a>
            </li>
          );
        })}
      </ul>
      {<PluginSettings plugin={openPlugin}></PluginSettings>}
    </div>
  );
}

function useIsEnabled(p: UsertoolPlugin<any>) {
  const [isEnabledLocal, setIsEnabledLocal] = useState<boolean>();
  const [areSettingsInitialized, setAreSettingsInitialized] = useState(false);

  useEffect(() => {
    if (areSettingsInitialized) {
      setIsEnabled(p, isEnabledLocal ?? false);
    } else {
      (async () => {
        setAreSettingsInitialized(true);
        setIsEnabledLocal(await getIsEnabled(p));
      })();
    }
  });

  return [isEnabledLocal, setIsEnabledLocal] as const;
}

export function PluginSettings<T>(props: { plugin: UsertoolPlugin<T> }) {
  const p = props.plugin;

  // @ts-expect-error
  const settingsLocal = useGetSet<T>(undefined);

  const [areSettingsInitialized, setAreSettingsInitialized] = useState(false);

  const [isEnabledLocal, setIsEnabledLocal] = useIsEnabled(p);

  useEffect(() => {
    if (areSettingsInitialized) {
      setSettings(p, settingsLocal.value);
    } else {
      (async () => {
        const val = await getSettings(p);
        settingsLocal.setValue(() => val);
        setAreSettingsInitialized(true);
      })();
    }
  });

  if (!areSettingsInitialized || isEnabledLocal === undefined) {
    return <div key={p.name}>Loading...</div>;
  }

  const SettingsMenuFunction = p.settingsMenu;

  return (
    <div className="plugin-settings">
      <h2>{p.name}</h2>
      {/* @ts-expect-error */}
      {<SettingsMenuFunction {...settingsLocal}></SettingsMenuFunction>}
    </div>
  );
}
