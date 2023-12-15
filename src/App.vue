<script>
import HelloWorld from "./components/HelloWorld.vue";
import { messaging } from "./firebaseInit";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  created() {
    // 請求通知權限
    messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        // 獲取並返回 FCM 注冊令牌
        return messaging.getToken();
      })
      .then((token) => {
        console.log(token);
        // 使用這個令牌來向用戶發送通知
      })
      .catch((err) => {
        console.log("Unable to get permission to notify.", err);
      });

    // 訂閱消息
    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      // 處理接收到的消息
    });
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
</style>
