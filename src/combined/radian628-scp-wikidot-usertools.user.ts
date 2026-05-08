/*!
// ==UserScript==
// @name        Radian628 SCP Wikidot Usertools
// @match       *://*.wikidot.com/*
// @grant       GM.getValue 
// @grant       GM.setValue
// @version     0.1.0
// @author      radian628
// @description all the usertools in one!
// @run-at      document-body
// ==/UserScript==
*/

import { SCP_USERTOOLS_BUNDLE } from "./standard-usertools-bundle.js";
import { loadUsertoolsBundle } from "./usertools-bundle.js";

loadUsertoolsBundle(SCP_USERTOOLS_BUNDLE);
