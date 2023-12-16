/* eslint-disable no-undef */
// 使用 importScripts 导入 Firebase 库
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

// 註冊推播通知事件處理程序
//self指的是firebase的執行個體，所以測試的推播不會運行這個
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 關閉通知
  // 在這裡添加您希望的點擊通知後執行的代碼
  // 例如，打開特定頁面或執行其他操作
  event.waitUntil(
    clients.openWindow("https://www.youtube.com/watch?v=dQw4w9WgXcQ") // 打開特定網頁
  );
});

self.addEventListener("push", (event) => {
  if (event.data.title.includes("clear")) {
    self.skipWaiting();
  }
});

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

self.addEventListener("activate", (event) => {
  clearCache(event);
});

//先執行原生事件，再執行FCM定義的事件，否則原生事件不會執行
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

function clearCache(event) {
  // console.log(event)
  // // 解析推送的数据
  // const data = event.data;
  // 检查数据中的指令，例如是否要清除缓存
  // if (data.action === 'clear') {
  // 清除缓存的逻辑
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
}
