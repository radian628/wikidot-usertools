/*!
// ==UserScript==
// @name        Custom CSS Widget
// @namespace   Violentmonkey Scripts
// @grant       GM_getValue
// @grant       GM_setValue
// @match       *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 5/21/2025, 12:51:38 PM
// ==/UserScript==
*/

import { initCustomCssWidget } from "./widget.js";

const initListener = () => {
  initCustomCssWidget();
  document.removeEventListener("click", initListener);
};

document.addEventListener("click", initListener);
