import React, { useEffect, useState } from "react";
import { UsertoolPlugin } from "./plugin.js";
import { arrayToMapValues, BooleanField, useGetSet } from "r628";
import { Icon } from "@mdi/react";
import { mdiCog } from "@mdi/js";
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
  const plugins = [...props.plugins].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const [refreshNeeded, setRefreshNeeded] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      {refreshNeeded && (
        <p className="refresh-needed-notif">
          Refresh needed to apply changes.{" "}
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </p>
      )}
      <ul className="page-toggle-list">
        {plugins.map((p) => (
          <PluginToggle
            plugin={p}
            key={p.name}
            setRefreshNeeded={() => {
              setRefreshNeeded(true);
            }}
          ></PluginToggle>
        ))}
      </ul>
    </>
  );
}

export function PluginToggle(props: {
  plugin: UsertoolPlugin<any>;
  setRefreshNeeded: () => void;
}) {
  const p = props.plugin;

  const [isEnabledLocal, setIsEnabledLocal] = useIsEnabled(p);

  if (isEnabledLocal === undefined) {
    return <li key={p.name}>Loading...</li>;
  }

  return (
    <li>
      <BooleanField
        value={isEnabledLocal}
        setValue={(cb) => {
          props.setRefreshNeeded();
          setIsEnabledLocal((v) => cb(v ?? false));
        }}
      ></BooleanField>{" "}
      {p.name}
    </li>
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
