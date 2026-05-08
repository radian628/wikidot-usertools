import { str2html } from "r628";
import { UsertoolPlugin } from "../combined/plugin.js";

export const SandboxMirrorerPlugin: UsertoolPlugin<{}> = {
  shouldRun(url) {
    return url.hostname.startsWith("scp-sandbox-3.");
  },
  async onPageLoad(hooks, settings) {
    mirrorMainsiteFormattingOnSandbox();
  },
  name: "SCP Sandbox Mirrorer",
  defaultSettings: {},
};

async function mirrorMainsiteFormattingOnSandbox() {
  //
  const topbarReplacement = `


<div class="top-bar">
<ul>
<li><a href="javascript:;">About
</a><ul>
<li><a href="/about-the-scp-foundation">About Us</a></li>
<li><a href="/site-rules">Site Rules</a></li>
<li><a href="/faq">FAQ</a></li>
<li><a href="/licensing-guide">Licensing</a></li>
<li><a href="/criticism-policy">Criticism Policy</a></li>
<li><a href="/deletions-guide">Article Deletions</a></li>
</ul>
</li>
<li><a href="javascript:;">Community
</a><ul>
<li><a href="/news">Site News</a></li>
<li><a href="/chat-guide">IRC Chat</a></li>
<li><a href="/authors-pages">Authors' Pages</a></li>
<li><a href="/artist-directory">Artist Directory</a></li>
<li><a href="/contest-archive">Contest Archive</a></li>
<li><a href="http://05command.wikidot.com/staff-list">Staff List</a></li>
</ul>
</li>
<li><a href="javascript:;">Resources
</a><ul>
<li><a href="/guide-hub">Guides</a></li>
<li><a href="/essay-resource-hub">Essays &amp; Resources</a></li>
<li><a href="/wiki-syntax">Wiki Syntax</a></li>
<li><a href="/sandbox">Sandbox</a></li>
<li><a href="/usertools">Usertools</a></li>
</ul>
</li>
<li><a href="/contact-staff">Contact Us</a></li>
</ul>
</div>
<div class="mobile-top-bar">
<div class="open-menu">
<p><a href="#side-bar">≡</a></p>
</div>
<ul>
<li><a href="javascript:;">About
</a><ul>
<li><a href="/about-the-scp-foundation">About Us</a></li>
<li><a href="/site-rules">Site Rules</a></li>
<li><a href="/faq">FAQ</a></li>
<li><a href="/licensing-guide">Licensing</a></li>
<li><a href="/criticism-policy">Criticism Policy</a></li>
<li><a href="/deletions-guide">Article Deletions</a></li>
<li><a href="/contact-staff">Contact Staff</a></li>
</ul>
</li>
<li><a href="javascript:;">Community
</a><ul>
<li><a href="/news">Site News</a></li>
<li><a href="/chat-guide">IRC Chat</a></li>
<li><a href="/authors-pages">Authors' Pages</a></li>
<li><a href="/artist-directory">Artist Directory</a></li>
<li><a href="/contest-archive">Contest Archive</a></li>
<li><a href="http://05command.wikidot.com/staff-list">Staff List</a></li>
</ul>
</li>
<li><a href="javascript:;">Resources
</a><ul>
<li><a href="/guide-hub">Guides</a></li>
<li><a href="/essay-resource-hub">Essays &amp; Resources</a></li>
<li><a href="/wiki-syntax">Wiki Syntax</a></li>
<li><a href="/sandbox">Sandbox</a></li>
<li><a href="/usertools">Usertools</a></li>
</ul>
</li>
</ul>
</div>

`;

  const oldTopBar = document.getElementById("top-bar");
  if (oldTopBar && oldTopBar.parentElement) {
    const newTopBar = document.createElement("div");
    newTopBar.id = "top-bar";
    newTopBar.innerHTML = topbarReplacement;

    oldTopBar.parentElement.replaceChild(newTopBar, oldTopBar);
  }

  const footer = document.getElementById("footer");
  if (footer && footer.parentElement) {
    const licenseArea = document.createElement("div");
    licenseArea.id = "license-area";
    licenseArea.className = "license-area";
    licenseArea.innerHTML = `
                      Unless otherwise stated, the content of this page is licensed under <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 License</a>
                  `;
    footer.parentElement.insertBefore(licenseArea, footer.nextElementSibling);
  }

  const sidebar = document.getElementById("side-bar");

  for (const child of [...(sidebar?.children ?? [])]) {
    console.log(child);
    sidebar?.removeChild(child);
  }

  const sidebarCode = str2html(
    await (
      await fetch(
        "https://scp-sandbox-3.wikidot.com/radian628:sandbox-mirrorer-sidebar-reference",
      )
    ).text(),
  ).querySelector("#page-content")!;

  console.log([...sidebarCode.children]);

  for (const child of [...sidebarCode.children]) {
    console.log("adding", child);
    sidebar?.appendChild(child);
  }

  const interwikiframe = sidebar?.querySelector(".scpnet-interwiki-frame");
  if (interwikiframe) {
    interwikiframe.setAttribute(
      "src",
      "//interwiki.scpwiki.com/interwikiFrame.html?lang=en&community=scp&pagename=main",
    );
  }

  const interwikiStyle = `<p><iframe src="//interwiki.scpwiki.com/styleFrame.html?priority=0&amp;theme=https://cdn.scpwiki.com/theme/en/sigma/css/sigma.min.css" style="display: none"></iframe></p>`;

  document
    .querySelector(".scpnet-interwiki-wrapper")
    ?.insertAdjacentHTML("afterend", interwikiStyle);

  setTimeout(() => {
    const adminBlock = document.querySelector(
      '.side-block.resources:has(a[href$="_admin"])',
    );
    if (adminBlock) adminBlock.remove();
  });

  const h1 = document.querySelector("#header h1");
  if (h1)
    h1.innerHTML = `<a href="/" class="active"><span>SCP Foundation</span></a>`;

  const h2 = document.querySelector("#header h2");
  if (h2) h2.innerHTML = `<span>Secure, Contain, Protect</span>`;

  const ratingmodulecancel = document.querySelectorAll(
    ".page-rate-widget-box .cancel.btn.btn-default",
  );
  for (const r of ratingmodulecancel) {
    if (!r.parentElement) continue;
    r.parentElement.insertBefore(
      document
        .createRange()
        .createContextualFragment(
          `<span class="ratedown btn btn-default"><a title="I don't like it" href="javascript:;" onclick="WIKIDOT.modules.PageRateWidgetModule.listeners.rate(event, -1)">–</a></span>`,
        ),
      r,
    );
  }

  const internalStyle = document.querySelector("#internal-style");
  if (internalStyle) {
    internalStyle.textContent = `

        /* modules */
@import url(https://d3g0gp89917ko0.cloudfront.net/v--7690939296dc/common--modules/css/pagerate/PageRateWidgetModule.css);

        /* theme */
                    @import url(https://d3g0gp89917ko0.cloudfront.net/v--4b961b7cc327/common--theme/base/css/style.css);
                    @import url(https://cdn.scpwiki.com/theme/en/sigma/css/sigma.min.css);
            `;
  }
}
