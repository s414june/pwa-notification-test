// 使用 importScripts 导入 Firebase 库
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js"
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
firebase.initializeApp({
  // 您的 Firebase 配置
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, function (payload) {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  return self.registration.showNotification(title, options);
});
