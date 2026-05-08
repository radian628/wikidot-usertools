import { createRoot } from "react-dom/client";
import { UsertoolPlugin, PluginHooks, UsertoolFeature } from "./plugin.js";
import React, { useLayoutEffect, useRef, useState } from "react";
import { createEvalbox, trigger, useGetSet } from "r628";
import { getIsEnabled, getSettings, SettingsMenu } from "./settings-menu.js";
import MenuIconCSS from "./MenuIcon.css?raw";
import { Icon } from "@mdi/react";
import { mdiClose, mdiCog } from "@mdi/js";
import { createStore } from "../common/store.js";
import ToastsCSS from "./toasts.css?raw";

export async function createWikidotUsertoolsBase() {
  if (!window.location.hostname.match(/^.*\.wikidot\.com$/g)) return;

  if (!unsafeWindow.usertoolsDefined) {
    unsafeWindow.usertoolsDefined = true;

    const appendedContentContainer = document.createElement("div");
    document.body.appendChild(appendedContentContainer);

    const onPageLoad = trigger<void>();
    addEventListener("load", () => {
      onPageLoad.trigger();
    });

    const menusStore = createStore<
      { onClickIcon?: () => void; menu?: React.FC<{}>; icon: React.FC<{}> }[]
    >([]);

    const toastsStore = createStore<
      Map<number, { toast: React.FC; type: string }>
    >(new Map());
    let toastIndex = 0;

    const enabledFeatures = new Set<UsertoolFeature>();

    const hooksPromise: Promise<PluginHooks> = (async () => ({
      toast(component, duration, type) {
        let myIndex = toastIndex++;
        toastsStore.set((t) =>
          new Map(t).set(myIndex, { toast: component, type: type ?? "info" }),
        );

        setTimeout(() => {
          toastsStore.set((t) => {
            const t2 = new Map(t);
            t2.delete(myIndex);
            return t2;
          });
        }, duration);
      },
      waitForPageLoad() {
        return onPageLoad;
      },
      replacePageWith(Component) {
        for (const child of Array.from(document.head.childNodes)) {
          child.remove();
        }

        for (const child of Array.from(document.body.childNodes)) {
          if (child !== appendedContentContainer) {
            child.remove();
          }
        }

        const newPageContentContainer = document.createElement("div");
        document.body.prepend(newPageContentContainer);
        const root = createRoot(newPageContentContainer);
        root.render(<Component></Component>);

        return () => {
          newPageContentContainer.remove();
          root.unmount();
        };
      },
      appendToPage(Component, style) {
        const newAppendedContentContainer = document.createElement("div");
        newAppendedContentContainer.style = style ?? "";
        appendedContentContainer.appendChild(newAppendedContentContainer);

        newAppendedContentContainer.attachShadow({ mode: "open" });

        const root = createRoot(newAppendedContentContainer.shadowRoot!);
        root.render(
          <>
            <Component></Component>
          </>,
        );

        return () => {
          appendedContentContainer.removeChild(newAppendedContentContainer);
          root.unmount();
        };
      },
      addMenu(params) {
        menusStore.set((v) => [...v, params]);
        return () => {
          menusStore.set((v) => v.filter((e) => e !== params));
        };
      },
      evalbox: await createEvalbox(),
      async enableFeature(feature) {
        if (enabledFeatures.has(feature)) return;
        enabledFeatures.add(feature);
        await feature.setup(await hooksPromise);
      },
    }))();

    let plugins: UsertoolPlugin<any>[] = [];

    const pluginNames = new Set<string>();

    async function registerPlugin<T>(plugin: UsertoolPlugin<T>) {
      if (pluginNames.has(plugin.name)) return;
      pluginNames.add(plugin.name);
      plugins.push(plugin);
      if (
        !window.location.pathname.endsWith("resize-iframe.html") &&
        plugin.shouldRun(new URL(window.location.href)) &&
        (await getIsEnabled(plugin))
      ) {
        plugin.onPageLoad(await hooksPromise, await getSettings(plugin));
      }
    }
    unsafeWindow.registerWikidotPlugin = registerPlugin;

    const hooks = await hooksPromise;

    hooks.addMenu({
      icon: () => <Icon path={mdiCog}></Icon>,
      menu: () => <SettingsMenu plugins={plugins}></SettingsMenu>,
    });

    hooks.appendToPage(() => {
      const toasts = toastsStore.use();

      return (
        <div className="toasts-container">
          <style>{ToastsCSS}</style>
          {[...toasts].map(([i, C]) => (
            <div key={i} className={`toast ${C.type}`}>
              <span
                className="close-toast"
                onClick={() => {
                  toastsStore.set((t) => {
                    const t2 = new Map(t);
                    t2.delete(i);
                    return t2;
                  });
                }}
              >
                <Icon path={mdiClose}></Icon>
              </span>
              {<C.toast></C.toast>}
            </div>
          ))}
        </div>
      );
    }, "position: fixed; top: 10%; left: 50%; transform: translateX(-50%); z-index: 99999999999;");

    hooks.appendToPage(() => {
      const [OpenMenu, setOpenMenu] = useState<{
        menu: React.FC<{}> | undefined;
      }>({ menu: undefined });

      const menus = menusStore.use();

      const openMenuIconRef = useRef<HTMLDivElement | null>(null);
      const openMenuContainerRef = useRef<HTMLDivElement | null>(null);
      const openMenuRef = useRef<HTMLDivElement | null>(null);

      const menuYOffset = useGetSet(0);

      function recalculateMenuYOffset() {
        const openMenuContainer = openMenuContainerRef.current;
        const openMenuIcon = openMenuIconRef.current;
        if (!openMenuContainer || !openMenuIcon) return;

        const openMenuContainerBbox = openMenuContainer.getBoundingClientRect();
        const openMenuIconBbox = openMenuIcon.getBoundingClientRect();

        const topOffset = Math.min(
          0,
          Math.round(openMenuIconBbox.top - openMenuContainerBbox.top) - 1,
        );

        menuYOffset.setValue(() => topOffset);
      }

      useLayoutEffect(() => {
        recalculateMenuYOffset();

        const observer = new ResizeObserver(() => {
          recalculateMenuYOffset();
        });

        if (openMenuContainerRef.current) {
          observer.observe(openMenuContainerRef.current);
          return () => {
            observer.disconnect();
          };
        }
      });

      return (
        <div className="menu-info-container">
          <style>{MenuIconCSS}</style>
          <div className="menu-icons-container">
            {menus.map((m, i) => (
              <div
                ref={
                  m.menu && OpenMenu.menu === m.menu ? openMenuIconRef : null
                }
                key={i}
                className={
                  "menu-icon" +
                  (m.menu && OpenMenu.menu === m.menu ? " open-menu-icon" : "")
                }
                onClick={() => {
                  if (m.menu) {
                    setOpenMenu((e) =>
                      e.menu === m.menu
                        ? { menu: undefined }
                        : { menu: m.menu },
                    );
                  }

                  if (m.onClickIcon) {
                    m.onClickIcon();
                  }
                }}
              >
                <m.icon></m.icon>
              </div>
            ))}
          </div>
          {OpenMenu?.menu && (
            <div className="menu-container" ref={openMenuContainerRef}>
              <div
                className="menu"
                ref={openMenuRef}
                style={{
                  transform: `translateY(${menuYOffset.value}px)`,
                }}
              >
                <button
                  className="close-menu"
                  onClick={() => {
                    setOpenMenu({ menu: undefined });
                  }}
                >
                  <Icon path={mdiClose}></Icon>
                </button>
                <OpenMenu.menu></OpenMenu.menu>
              </div>
            </div>
          )}
        </div>
      );
    }, "position: fixed; bottom: 0; left: 0; z-index: 9999999; filter: drop-shadow(2px 2px 9px #000a);");
  }
}
