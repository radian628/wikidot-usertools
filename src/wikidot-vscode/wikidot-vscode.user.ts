import TestVscode from "./test.html?raw";
import ProductJson from "./product.json?raw";
import ExtensionPackageJson from "./memfs-ext/package.json?raw";
import ExtensionJavascript from "./memfs-ext/extension.ts?bpt";
// import VFS from "./vfs.json?vfs";

// console.log("big ass VFS", VFS);

/*!
// ==UserScript==
// @name        Wikidot VSCode 
// @match       *://*.wikidot.com/*
// @match       https://radian628.github.io/dummy.html 
// @grant       none
// @version     1.0.1
// @author      radian628
// @description VSCode in Wikidot. This is the dumbest thing I've ever created. 
// ==/UserScript==
*/

// const VSCodeCSS =
//   "../../node_modules/vscode-web/dist/out/vs/workbench/workbench.min.main.css?raw";
// const VSCodeLoader = "../../node_modules/vscode-web/dist/out/vs/loader.js?raw";
// const VSCodePackagePaths =
//   "../../node_modules/vscode-web/dist/out/vs/webPackagePaths?raw";
// const FixWebPackagePaths = `
// 		Object.keys(self.webPackagePaths).map(function (key, index) {
// 			self.webPackagePaths[key] = \`\$\{window.location.origin}/static/node_modules/\$\{key}/\${self.webPackagePaths[key]}\`;
// 		});
// 		require.config({
// 			baseUrl: \`\$\{window.location.origin}/static/out\`,
// 			recordStats: true,
// 			trustedTypesPolicy: window.trustedTypes?.createPolicy('amdLoader', {
// 				createScriptURL(value) {
// 					return value;
// 				}
// 			}),
// 			paths: self.webPackagePaths
// 		});
// `;

// window.addEventListener("message", (e) => {
//   const data = e.data;
//   if (data && data.type === "vfs-lookup") {
//     const path = data.path.split("/");
//     const folder = VFS;
//   }
// });

const VSCODE_HOST_URL = `https://radian628.github.io/dummy.html?wikidot-vscode`;

if (window.location.href === VSCODE_HOST_URL) {
  const iframe = document.createElement("iframe");
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.zIndex = "100";
  iframe.srcdoc = TestVscode.replace("{{{product.json}}}", ProductJson)
    .replace("{{{memfs-package.json}}}", btoa(ExtensionPackageJson))
    .replace("{{{memfs-extension.js}}}", btoa(ExtensionJavascript));
  document.body.appendChild(iframe);
} else {
  // @ts-expect-error
  window.createVsCode = () => {
    const iframe = document.createElement("iframe");
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "100";
    iframe.src = VSCODE_HOST_URL;
    // iframe.srcdoc = TestVscode.replace("{{{product.json}}}", ProductJson)
    //   .replace("{{{memfs-package.json}}}", btoa(ExtensionPackageJson))
    //   .replace("{{{memfs-extension.js}}}", btoa(ExtensionJavascript));
    document.body.appendChild(iframe);
  };
}
