import React, { useRef } from "react";
import { ShadowRooted, WikidotModuleContent } from "./dom-helpers.js";
import UserInfoProfileCSS from "./user-info-profile.css?raw";

export function UserInfoProfile(props: {
  userid: string;
  ref?: (e: HTMLDivElement) => void;
}) {
  const { userid } = props;

  const elemRef = useRef<HTMLDivElement | null>(null);

  function update() {
    if (elemRef.current) props.ref?.(elemRef.current);
  }

  return (
    <ShadowRooted>
      <style>{UserInfoProfileCSS}</style>
      <div className="user-info-profile" ref={elemRef}>
        <WikidotModuleContent
          deps={[userid]}
          moduleName="users/UserInfoWinModule"
          params={{ user_id: userid }}
          mutate={(d) => {
            d.querySelector(".title.modal-header")?.remove();
            d.querySelector("table.table + div")?.remove();
            d.querySelector(".button-bar")?.remove();

            const pfp = d.querySelector(
              ".modal-body > img",
            ) as HTMLImageElement;
            if (pfp) pfp.style = "";

            const win = d.querySelector(".owindow") as HTMLElement;
            if (win) win.style = "";
          }}
          onLoad={() => {
            update();
          }}
        ></WikidotModuleContent>
        <WikidotModuleContent
          moduleName="userinfo/UserInfoMemberOfModule"
          deps={[userid]}
          params={{ user_id: userid }}
          onLoad={() => {
            update();
          }}
        ></WikidotModuleContent>
        <WikidotModuleContent
          moduleName="userinfo/UserInfoModeratorOfModule"
          deps={[userid]}
          params={{ user_id: userid }}
          onLoad={() => {
            update();
          }}
        ></WikidotModuleContent>
        <WikidotModuleContent
          moduleName="userinfo/UserInfoAdminOfModule"
          deps={[userid]}
          params={{ user_id: userid }}
          onLoad={() => {
            update();
          }}
        ></WikidotModuleContent>
      </div>
    </ShadowRooted>
  );
}
