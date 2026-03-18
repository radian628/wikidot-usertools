
"use strict";
import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")
.then(() => {
  try {
    lockdown();
  }  catch (e) { console.warn(e); }
  
"use strict";(()=>{var f=async(r,i)=>new Promise((c,t)=>OZONE.ajax.requestModule(r,i,e=>{c(e)}));async function m(r,i){let c=await f("files/PageFilesModule",{page_id:r,page:i?.toString()}),t=new DOMParser().parseFromString(c.body,"text/html"),e=new Map;for(let o of Array.from(t.querySelectorAll("tbody tr"))){let a=o.children[2].innerText.trim(),s=parseFloat(a)*(a.endsWith("GB")?2**30:a.endsWith("MB")?2**20:a.endsWith("kB")?2**10:1),n=o.children[0].querySelector("a").innerText,l=o.id.match(/\d+$/g)[0];e.set(n,{name:n,id:l,size:s})}return{info:e,fileCount:parseInt(t.querySelector("h1 + p").innerText.match(/\d+/g)?.[0]??"0")}}async function p(r){r=r.replace(/\/offset\/.*$/g,"");let i=[],c=0,t=0,e="";for(;t<100;t++){let o=`${r}/offset/${t}`,a=await(await fetch(o)).text(),s=new DOMParser().parseFromString(a,"text/html"),n=s.querySelector("#page-content .list-pages-box");if(n&&n.childNodes.length===1&&n.childNodes[0]instanceof Text)break;for(let u of Array.from(s.querySelectorAll(".licensebox")))u.parentElement?.removeChild(u);let l=s.querySelector("#page-content")?.innerText??"";if(e===l)break;e=l,i.push(o)}return i}(async()=>{let[r,i]=await Promise.all([await m(),await p(window.location.href)]),c=await Promise.all(i.map(async e=>({link:e,html:await(await fetch(e)).text()}))),t=new Map;for(let e of c){let o=new DOMParser().parseFromString(e.html,"text/html"),a=Array.from(o.querySelectorAll("#page-content img"));for(let s of a){let n=new URL(s.src,window.location.href),l=n.href,u=t.get(l)??{sourcePages:new Set,link:n};u.sourcePages.add(e.link),t.set(l,u)}}})();})();
//# sourceMappingURL=file-fixer.user.js.map
 });