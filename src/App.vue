<template>
  <p>firebase推播的標題中夾帶"clear"字眼可以清除緩存</p>
  <button @click="_requestPermission()">開啟推播</button>
  <button @click="_showNotification()">測試推播</button>
  <button @click="_reload()">重新整理網頁</button>
  <button @click="_clearCache()">清除快取並重新整理</button>
  <p>頁面更新時間：{{ _refreshTime() }}</p>
</template>
<script>
// import HelloWorld from "./components/HelloWorld.vue";

import { messaging } from "./firebaseInit";
import { onMessage, getToken } from "firebase/messaging";

// 請求通知權限
getToken(messaging, {
  vapidKey:
    "BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token received: ", currentToken);
      // 处理获取到的令牌
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

// 訂閱消息
onMessage((payload) => {
  console.log("Message received. ", payload);
  // 處理接收到的消息
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  methods: {
    _requestPermission() {
      Notification.requestPermission();
    },
    _showNotification() {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          navigator.serviceWorker.ready.then((registration) => {
            console.log("測試開始");
            registration.showNotification("測試通知", {
              body: "叮叮噹　叮叮噹　鈴聲多響亮　你看他呀不避風霜　面容多麼慈祥！叮叮噹　叮叮噹　鈴聲多響亮　他給我們帶來幸福　大家喜洋洋",
              icon: "/img/icons/icon-192.png",
              vibrate: [200, 100, 200, 100, 200, 100, 200], //震動
              tag: "vibration-sample",
              lang: "zh-tw",
            });
          });
        }
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
      console.log(navigator)
      console.log(navigator.serviceWorker.controller)
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          action: "skipWaiting",
        });
        alert("清快取囉");
      }
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
