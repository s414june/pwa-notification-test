<template>
  <h1>PWA Notification 測試</h1>
  <p>firebase推播的標題中夾帶"clear"字眼可以清除緩存</p>
  <p>
    實際開發中，我們可以使用data中action值來判斷，
    <br />現在是因為我不知道怎麼設定firebase的action值
  </p>
  <!-- <p style="color: brown">
    ＊測試按鈕不能清除快取，因為service worker的執行個體在firebase上＊
  </p> -->
  <!-- <p>我不確定可不可以並行，或者會需要開兩個service worker？</p> -->
  <p style="color: brown">
    目前測試，如果網頁正在開啟狀態，firebase並不會執行onMessage監聽，
    <br />所以不能成功推播firebase傳來的內容。 <br />這可能是firebase自己的問題
  </p>
  <br />
  <button @click="_requestPermission()">開啟推播</button>
  <button @click="_showNotification()">測試推播</button>
  <button @click="_reload()">重新整理網頁</button>
  <button @click="_clearCache()">清除快取並重新整理</button>
  <br />
  <p>頁面更新時間：{{ _refreshTime() }}</p>
  <span>{{ _getText() }}</span>
  <!-- <p>重新整理網頁，可以發現已安裝的PWA頁面不會清除快取！</p> -->
  <!-- <p>這是一個清除快取的測試，若看到這行表示成功清除快取了</p> -->
  <br />
</template>
<script>
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
      // 訂閱消息
      onMessage((payload) => {
        console.log("Message received. ", payload);
        // 處理接收到的消息
        const title = payload.notification.title;
        const options = {
          body: payload.notification.body,
          // icon: payload.notification.icon,
          icon: "/img/icons/icon-192.png",
        };
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          console.log("controllerchange");
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

// 在前台页面的 JavaScript 中
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => {
      // 监听来自 Service Worker 的消息
      navigator.serviceWorker.addEventListener("message", (event) => {
        // 根据 event.data 执行相应操作
        event.preventDefault();
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("controllerchange");
        window.location.reload();
      });
    })
    .catch((error) => {
      console.error("Service Worker 注册失败:", error);
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
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          navigator.serviceWorker.ready.then((registration) => {
            console.log("測試開始");
            registration.showNotification("測試通知", {
              body: "叮叮噹　叮叮噹　鈴聲多響亮　你看他呀不避風霜　面容多麼慈祥！叮叮噹　叮叮噹　鈴聲多響亮　他給我們帶來幸福　大家喜洋洋",
              icon: "/img/icons/icon-192.png",
              // vibrate: [200, 100, 200, 100, 200, 100, 200], //震動
              // tag: "vibration-sample",
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
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
          action: "skipWaiting",
        });
        console.log("清快取囉");
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
