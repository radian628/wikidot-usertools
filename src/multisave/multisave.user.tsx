import { createRoot } from "react-dom/client";
import { MultisaveDialog } from "./multisave.js";
import React from "react";
import MultisaveCSS from "./multisave.css?raw";

/*!
// ==UserScript==
// @name        Wikidot File Multisave 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     1.0.2
// @author      radian628
// @description Upload multiple files to wikidot at once. 
// ==/UserScript==
*/

const interval = setInterval(() => {
  // get the file button
  const filesButton = document.getElementById("files-button") as HTMLElement;
  if (!filesButton || filesButton.dataset.isClone) return;

  // replace files button with a clone with no listeners attached to it
  const buttonClone = filesButton.cloneNode(true) as HTMLElement;
  buttonClone.dataset.isClone = "true";
  filesButton.parentElement?.insertBefore(buttonClone, filesButton);
  filesButton.parentElement?.removeChild(filesButton);

  // add listener that will open the custom file dialog
  buttonClone.addEventListener("click", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    createRoot(root).render(
      <MultisaveDialog
        exit={() => {
          document.body.removeChild(root);
        }}
      ></MultisaveDialog>
    );
  });
}, 0);

const editorStylesheet = document.createElement("style");
editorStylesheet.innerHTML = MultisaveCSS.replaceAll(";", " !important ;");

document.head.appendChild(editorStylesheet);
