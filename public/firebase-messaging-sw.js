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

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    sound:'/sound.mp3'
  };
  return self.registration.showNotification(title, options);
});

// service-worker.js

// // 监听 notificationclick 事件
// self.onnotificationclick = (event) => {
//   console.log("On notification click: ", event.notification.tag);
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//       })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if (client.url === "/" && "focus" in client) return client.focus();
//         }
//         if (clients.openWindow) return clients.openWindow("/");
//       })
//   );
// };

// 註冊推播通知事件處理程序
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // 關閉通知
  // 在這裡添加您希望的點擊通知後執行的代碼
  // 例如，打開特定頁面或執行其他操作
  event.waitUntil(
    clients.openWindow("https://google.com") // 打開特定網頁
  );
});

self.addEventListener("push", (event) => {
  clearCache(event)
});

self.addEventListener("activate", (event) => {
  clearCache(event)
});

function clearCache(event){
  // 解析推送的数据
  const data = event.data.json();
  // 检查数据中的指令，例如是否要清除缓存
  if (data.title.includes("clear")) {
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
}