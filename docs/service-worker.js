if(!self.define){let e,i={};const t=(t,s)=>(t=new URL(t+".js",s).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const r=e=>t(e,o),a={module:{uri:o},exports:c,require:r};i[o]=Promise.all(s.map((e=>a[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-d169e1d7"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pwa-notification-test"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pwa-notification-test/css/app.2cf79ad6.css",revision:null},{url:"/pwa-notification-test/firebase-messaging-sw.js",revision:"eca2c61180d1056e73d1ed965d4cc890"},{url:"/pwa-notification-test/index.html",revision:"d25cbad62f9040e2ba10f777141cd9bb"},{url:"/pwa-notification-test/js/app.430d59e4.js",revision:null},{url:"/pwa-notification-test/js/chunk-vendors.91eb7d87.js",revision:null},{url:"/pwa-notification-test/manifest.json",revision:"ca9e0e18d7942c4b3ae08a3c149e07b2"},{url:"/pwa-notification-test/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
