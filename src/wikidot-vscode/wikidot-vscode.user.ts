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
// @match       https://radian628.github.io/wikidot-usertools/dummy.html* 
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

const VSCODE_HOST_URL = `https://radian628.github.io/wikidot-usertools/dummy.html?wikidot-vscode`;

if (window.location.href === VSCODE_HOST_URL) {
  // document.addEventListener("load", () => {
  (async () => {
    await await fetch("/eval", {
      method: "POST",
      body: `self.customFetchHandler = req => {
      console.log(req.url)
      if (req.url.startstWith("https://unpkg.com/vscode-web@1.91.1/dist/out/vs/workbench/services/extensions/worker/webWorkerExtensionHostIframe.html")) {
        return new Response("<script>console.log('sugma balls')</script>", {
          headers: { "Content-Type": "text/html" }  
        });
      }
      return fetch(req);
    }`,
    });

    document.head.innerHTML = `
    <meta charset="utf-8" />

    <!-- Mobile tweaks -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Code" />
    <link rel="apple-touch-icon" href="/code-192.png" />

    <!-- Disable pinch zooming -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />

    <!-- Workbench Icon/Manifest/CSS -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="manifest" href="/manifest.json" />
    <link
      data-name="vs/workbench/workbench.web.main"
      rel="stylesheet"
      href="https://unpkg.com/vscode-web@1.91.1/dist/out/vs/workbench/workbench.web.main.css"
    />
    `;

    const oldfetch = window.fetch;
    // @ts-expect-error
    window._oldfetch = oldfetch;
    // @ts-expect-error
    window.fetch = (...args) => {
      const req = args[0];

      console.log("FETCH WITH ARGS:", ...args);

      if (req === "product.json") {
        return new Response(ProductJson, {
          headers: { "Content-Type": "application/json" },
        });
      } else if (req === "http:/MEMFS_EXTENSION/package.json") {
        const res = ExtensionPackageJson;
        console.log("successfully retrieved memfs package.json", res);
        return new Response(res, {
          headers: { "Content-Type": "application/json" },
        });
      } else if (req === "http:/MEMFS_EXTENSION/extension.js") {
        const res = ExtensionJavascript;
        return new Response(res, {
          headers: { "Content-Type": "application/javascript" },
        });
      } else if (req === "http:/MEMFS_EXTENSION/package.nls.json") {
        return new Response("{}", {
          headers: { "Content-Type": "application/json" },
        });
      }

      // @ts-expect-error
      return window._oldfetch(...args);
    };

    async function loadSync(path: string) {
      const script = document.createElement("script");
      return new Promise((resolve, reject) => {
        script.src = path;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }
    (async () => {
      await loadSync(
        // "../../node_modules/vscode-web/dist/out/vs/loader.js"

        "https://unpkg.com/vscode-web@1.91.1/dist/out/vs/loader.js"
      );
      await loadSync(
        // "../../node_modules/vscode-web/dist/out/vs/webPackagePaths.js"
        "https://unpkg.com/vscode-web@1.91.1/dist/out/vs/webPackagePaths.js"
      );

      const rootPath = `https://unpkg.com/vscode-web@1.91.1/dist`;
      // const rootPath = `memfs:/dist`;

      // @ts-expect-error
      Object.keys(self.webPackagePaths).map(function (key, index) {
        // @ts-expect-error
        self.webPackagePaths[key] =
          // @ts-expect-error
          `${rootPath}/node_modules/${key}/${self.webPackagePaths[key]}`;
      });

      // @ts-expect-error
      console.log("web package paths", self.webPackagePaths);

      // @ts-expect-error
      require.config({
        // paths: {
        //   "vs/base/worker/workerMain.js":
        //     "data:application/javascript,console.log('HELO WORLD!')",
        // },
        baseUrl: `${rootPath}/out`,
        recordStats: true,
        // @ts-expect-error
        trustedTypesPolicy: window.trustedTypes?.createPolicy("amdLoader", {
          // @ts-expect-error
          createScriptURL(value) {
            console.log("CREATE SRIPT URL", value);
            return value;
          },
        }),
        // @ts-expect-error
        paths: self.webPackagePaths,
      });

      const oldRequire = require;
      // @ts-expect-error
      window.require = function (...args) {
        console.log("require with", ...args);
        return oldRequire(...args);
      };

      await loadSync(
        // "../../node_modules/vscode-web/dist/out/vs/workbench/workbench.web.main.nls.js"

        "https://unpkg.com/vscode-web@1.91.1/dist/out/vs/workbench/workbench.web.main.nls.js"
      );
      await loadSync(
        // "../../node_modules/vscode-web/dist/out/vs/workbench/workbench.web.main.js"
        "https://unpkg.com/vscode-web@1.91.1/dist/out/vs/workbench/workbench.web.main.js"
      );
      await loadSync(
        // "../../node_modules/vscode-web/dist/out/vs/code/browser/workbench/workbench.js"
        "https://unpkg.com/vscode-web@1.91.1/dist/out/vs/code/browser/workbench/workbench.js"
      );
    })();

    // const iframe = document.createElement("iframe");
    // iframe.style.width = "100vw";
    // iframe.style.height = "100vh";
    // iframe.style.position = "fixed";
    // iframe.style.top = "0";
    // iframe.style.left = "0";
    // iframe.style.zIndex = "100";
    // iframe.srcdoc = TestVscode.replace("{{{product.json}}}", ProductJson)
    //   .replace("{{{memfs-package.json}}}", btoa(ExtensionPackageJson))
    //   .replace("{{{memfs-extension.js}}}", btoa(ExtensionJavascript));
    // document.body.appendChild(iframe);
  })();
  // });
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
