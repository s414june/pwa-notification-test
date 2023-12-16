<template>
  <p>firebase推播的標題中夾帶"clear"字眼可以清除緩存</p>
  <button @click="_requestPermission()">開啟推播</button>
  <button @click="_showNotification()">測試推播</button>
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
            console.log(registration);
            registration.showNotification("測試通知", {
              body: "叮叮叮叮",
              icon: "/img/icon/android-chrome-192x192.png",
              vibrate: [200, 100, 200, 100, 200, 100, 200], //震動
              tag: "vibration-sample",
              lang: "zh-tw",
            });
          });
        }
      });
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
button{
  min-width: 100px;
  height: 50px;
}
</style>
