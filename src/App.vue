<template>
	<h1>PWA Notification 測試</h1>
	<!-- <button @click="_requestPermission()">開啟推播</button>
	<button @click="_showNotification()">測試推播</button> -->
	<button @click="_reload()">重新整理網頁</button>
	<!-- <button @click="_clearCache()">清除快取</button> -->
	<br />
	<p>token{{ currentToken }}</p>
	<br />
	<p>頁面更新時間：{{ _refreshTime() }}</p>
	<span v-show="_getText() != ''"
		>隨機生成的query參數:
		{{ _getText() }}(看到這行表示你開啟了推播給予的連結)</span
	>
	<!-- <p>這是一個清除快取的測試，若看到這行表示成功清除快取了</p> -->
	<br />
</template>
<script>
import initFB from './firebase/firebaseInit';
import { onMessage, getToken } from 'firebase/messaging';
import registerSW from './firebase/firebaseUI';

const token =
  "BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc";

export default {
  name: "App",
  components: {},
  setup(){
    const messaging = initFB()?.messaging;
    if (!('serviceWorker' in navigator)) return;
    if (Notification.permission !== 'granted') return;
    // 註冊sw
    registerSW();
    getToken(messaging, {
        vapidKey: token,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token received.');
            // console.log('Token received: ', currentToken);
            // 儲存token
            this.currentToken = currentToken;
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // 处理可能发生的错误
        });
    // 訂閱消息
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage(payload);
      });
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    });
  },
  methods:{
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
        _getText() {
      let params = new URL(document.location).searchParams;
      let name = params.get("text");
      return name ?? "";
    },
  },
  data(){
    return{
      currentToken:""
    }
  }
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
