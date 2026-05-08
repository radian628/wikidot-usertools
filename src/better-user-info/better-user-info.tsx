import { useEffect, useRef, useState } from "react";
import { PluginHooks, UsertoolPlugin } from "../combined/plugin.js";
import React from "react";
import { asyncRequestModule, getPageId } from "../common/wikidot-api-utils.js";
import { str2html, waitFor } from "r628";
import BetterUserInfoCSS from "./better-user-info.css?raw";
import { UserInfoProfile } from "./user-info-profile.js";
import {
  estimateContribCount,
  getRecentContribs,
  UserInfoRecentContribs,
} from "./user-info-recent-contribs.js";
import { UserInfoRecentComments } from "./user-info-recent-comments.js";
import { RawDom } from "./dom-helpers.js";
import { revisionNumberToId } from "../common/history.js";
import { UserInfoTopbar } from "./user-info-topbar.js";
import { WithRevisionOpenFeature } from "../features/with-revision-open.js";

export const BetterUserInfoPlugin: UsertoolPlugin<{}> = {
  name: "Better user:info Pages",
  defaultSettings: {},
  shouldRun: (url) => true,
  async onPageLoad(hooks) {
    hooks.enableFeature(WithRevisionOpenFeature);

    const isUserInfoPage = window.location.pathname.startsWith("/user:info");

    if (isUserInfoPage) {
      runOnUserInfoPage(hooks);
      return;
    }
  },
};

function runOnUserInfoPage(hooks: PluginHooks) {
  const userid = document
    .querySelector(".profile-title img")
    ?.getAttribute("src")
    ?.match(/userid=\d+/g)?.[0]
    ?.slice(7);

  if (!userid) return;

  const loginStatus = document.querySelector(".loginStatus");
  const navbarNav = document.querySelector(".navbar-nav");

  document.body.style.height = "";

  hooks.replacePageWith(() => (
    <div>
      <style>{BetterUserInfoCSS}</style>
      <div className="main-grid">
        <div className="topbar-info">
          <UserInfoTopbar {...{ loginStatus, navbarNav }}></UserInfoTopbar>
        </div>
        <div className="profile-info">
          <UserInfoProfile
            userid={userid}
            // ref={(e) => {
            //   const sites = e.querySelectorAll("dl dt");

            //   function colorSite(siteElem: HTMLElement, color: string) {
            //     const siteDesc = siteElem.nextElementSibling;
            //     siteElem.style.backgroundColor = color;
            //     if (siteDesc instanceof HTMLElement)
            //       siteDesc.style.backgroundColor = color;
            //   }

            //   for (const site of sites) {
            //     if (!(site instanceof HTMLElement)) continue;

            //     const sitelink = site.querySelector("a")?.href;
            //     if (!sitelink) continue;

            //     const siteName = new URL(
            //       sitelink,
            //       window.location.href,
            //     ).hostname.split(".")[0];
            //     if (!siteName) continue;

            //     if (siteName === "scp-wiki") {
            //       colorSite(site, "#8f8");
            //     }
            //   }
            // }}
          ></UserInfoProfile>
        </div>
        <div className="changes-info">
          <UserInfoRecentContribs userid={userid}></UserInfoRecentContribs>
        </div>
        <div className="posts-info">
          <UserInfoRecentComments userid={userid}></UserInfoRecentComments>
        </div>
      </div>
    </div>
  ));
}
