/*!
// ==UserScript==
// @name        Quick Revision Inspector BETA 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     0.1.0
// @author      radian628
// @description Inspect wikidot page revisions quickly.
// ==/UserScript==
*/

import { quickRevisionInspectorUI } from "./quick-revision-inspector-ui.js";

const ui = quickRevisionInspectorUI();

document.body.appendChild(ui.elem);
