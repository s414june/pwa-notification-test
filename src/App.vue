<template>
  <h1>PWA Notification 測試</h1>
  <button @click="_requestPermission()">開啟推播</button>
  <button @click="_showNotification()">測試推播</button>
  <button @click="_reload()">重新整理網頁</button>
  <button @click="_clearCache()">清除快取</button>
  <br />
  <p>頁面更新時間：{{ _refreshTime() }}</p>
  <span v-show="_getText() != ''"
    >隨機生成的query參數: {{ _getText() }}(看到這行表示你開啟了推播給予的連結)</span
  >
  <!-- <p>這是一個清除快取的測試，若看到這行表示成功清除快取了</p> -->
  <br />
</template>
<script>
import { messaging } from "./firebaseInit";
import { onMessage, getToken } from "firebase/messaging";

const token =
  "BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc";
// 請求通知權限
getToken(messaging, {
  vapidKey: token,
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token received: ", currentToken);
      // 处理获取到的令牌
      // 訂閱消息
      onMessage((payload) => {
        console.log("Message received. ", payload);
        // 處理接收到的消息
        navigator.serviceWorker.ready.then((registration) => {
          console.log(registration);
          registration.active.postMessage({
            title: payload.notification.title,
            body: payload.notification.body,
            icon: "/img/icons/icon-192.png",
          });
        });
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      });
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // 提示用户没有令牌可用，需要请求权限
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // 处理可能发生的错误
  });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker Registered", registration);
    })
    .catch(function (err) {
      console.log("Service Worker registration failed", err);
    });
}

export default {
  name: "App",
  components: {},
  methods: {
    _requestPermission() {
      Notification.requestPermission();
    },
    _showNotification() {
      // Notification.requestPermission().then((result) => {
      //   if (result === "granted") {
      //     navigator.serviceWorker.ready.then((registration) => {
      //       registration.showNotification("測試通知", {
      //         body: "",
      //         icon: "/img/icons/icon-192.png",
      //         tag: "vibration-sample",
      //       });
      //     });
      //   }
      // });
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
          title: "測試通知",
          body: "叮叮噹　叮叮噹　鈴聲多響亮　你看他呀不避風霜　面容多麼慈祥！叮叮噹　叮叮噹　鈴聲多響亮　他給我們帶來幸福　大家喜洋洋",
          icon: "/img/icons/icon-192.png",
          tag: "vibration-sample",
        });
      });
    },
    _refreshTime() {
      let d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      return h + ":" + m + ":" + s;
    },
    _reload() {
      window.location.reload();
    },
    _clearCache() {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
          actions: ["skipWaiting"],
        });
      });
    },
    _getText() {
      let params = new URL(document.location).searchParams;
      let name = params.get("text");
      return name ?? "";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  min-width: 100px;
  height: 50px;
}
</style>
