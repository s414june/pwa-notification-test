if(!self.define){let e,i={};const t=(t,s)=>(t=new URL(t+".js",s).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const r=e=>t(e,o),a={module:{uri:o},exports:c,require:r};i[o]=Promise.all(s.map((e=>a[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-d169e1d7"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pwa-notification-test"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pwa-notification-test/css/app.2cf79ad6.css",revision:null},{url:"/pwa-notification-test/firebase-messaging-sw.js",revision:"1940f5747ec8565cd9aaebab5b73626f"},{url:"/pwa-notification-test/index.html",revision:"8e3fb7526e511a3c84ed851c9dcd7ac9"},{url:"/pwa-notification-test/js/app.a4c185ba.js",revision:null},{url:"/pwa-notification-test/js/chunk-vendors.27ecece0.js",revision:null},{url:"/pwa-notification-test/manifest.json",revision:"e2e0e5d7dcb52d339f66f1517a27c04c"},{url:"/pwa-notification-test/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
