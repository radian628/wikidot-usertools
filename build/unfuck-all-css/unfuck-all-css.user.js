
    "use strict";
    import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")
    .then(() => {
      try {
        lockdown();
      }  catch (e) { console.warn(e); }

    "use strict";(()=>{var l={name:"Unfuck All CSS",defaultSettings:{},shouldRun:()=>!0,async onPageLoad(t,n){window.addEventListener("load",()=>{let o=Array.from(document.querySelectorAll("style"));for(let e of o)e.parentElement.removeChild(e);for(let e of o)e.textContent+="/*force refresh lol*/",document.head.appendChild(e)})}};})();
 });