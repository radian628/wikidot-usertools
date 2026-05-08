import React from "react";
import { RawDom, ShadowRooted } from "./dom-helpers.js";
import UserInfoTopbarCSS from "./user-info-topbar.css?raw";

export function UserInfoTopbar(props: {
  loginStatus: Element | null;
  navbarNav: Element | null;
}) {
  return (
    <ShadowRooted>
      <div className="topbar-container">
        <style>{UserInfoTopbarCSS}</style>
        <RawDom
          dom={props.loginStatus}
          className="login-status-container"
        ></RawDom>
        <RawDom dom={props.navbarNav} className="navbar-nav-container"></RawDom>
      </div>
    </ShadowRooted>
  );
}
