/* eslint-disable no-undef */
// 使用 importScripts 导入 Firebase 库
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
  authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
  projectId: "pwa-notification-test-39b3f",
  storageBucket: "pwa-notification-test-39b3f.appspot.com",
  messagingSenderId: "667279105190",
  appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
  measurementId: "G-28EW5Q8N5D",
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

//先執行原生事件，再執行FCM定義的事件，否則原生事件不會執行?
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    // icon: payload.notification.icon,
    icon: "/img/icons/icon-192.png",
  };
  return self.registration.showNotification(title, options);
});

async function clearCache() {
  const cacheDeleted = await deleteWebCache();
  console.log("cache deleting");
  console.log("cacheDeleted:", cacheDeleted);
  if (cacheDeleted) {
    const title = "清除快取通知";
    const options = {
      body: "已經清除快取",
      icon: "/img/icons/icon-192.png",
    };
    self.registration.showNotification(title, options);
    return true;
  } else if (cacheDeleted === false) {
    return false;
  }
}

// 註冊推播通知事件處理程序
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 關閉通知
  event.waitUntil(
    clients.openWindow("/?text=" + Math.random()) // 打開特定網頁
  );
});

self.addEventListener("message", (event) => {
  caches.keys().then((cacheNames) => {
    console.log("cacheNames:", cacheNames);
  });
  const data = event.data ?? {};
  if (data.actions?.includes("skipWaiting")) {
    const cacheDeleted = clearCache();
    cacheDeleted.then((res)=>{
      if (res===false) {
        const title = "未清除快取通知";
        const options = {
          body: "沒有快取要清耶，你為什麼要按",
          icon: "/img/icons/icon-192.png",
        };
        self.registration.showNotification(title, options);
      }
    })
  }
  const title = data.title || "";
  if (title === "") return;
  const options = {
    body: data.body ?? "",
    icon: data.icon ?? "/img/icons/icon-192.png",
    tag: data.tag ?? "",
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener("activate", () => {
  //監聽到清除快取
  clearCache();
});

function deleteWebCache() {
  console.log("deleteWebCache is started");
  return new Promise((resolve) => {
    caches.keys().then((cacheNames) => {
      if (cacheNames.length === 0) {
        console.log("no caches");
        return resolve(false);
      }
      cacheNames.forEach((cacheName) => {
        caches.open(cacheName).then((cache) => {
          cache.keys().then((requests) => {
            requests.forEach((request) => {
              if (request.url.startsWith(process.env.BASE_PATH)) {
                cache.delete(request);
              }
            });
            return resolve(true);
          });
        });
      });
    });
  });
}
