<template>
	<h1>PWA Notification 測試</h1>
	<button @click="_requestPermission()">開啟推播</button>
	<button @click="_showNotification()">測試推播</button>
	<button @click="_reload()">重新整理網頁</button>
	<button @click="_clearCache()">清除快取</button>
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
import { onMessage } from 'firebase/messaging';
import registerSW from './firebase/firebaseUI';

export default {
  name: "App",
  components: {},
  setup(){
    const messaging = initFB()?.messaging;
    if (!('serviceWorker' in navigator)) return;
    if (Notification.permission !== 'granted') return;
    // 重新註冊sw
    registerSW();
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
