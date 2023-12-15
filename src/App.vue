<script>
import HelloWorld from "./components/HelloWorld.vue";
import { messaging } from "./firebaseInit";
import { onMessage, getToken } from "firebase/messaging";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  created() {
    // 請求通知權限

    getToken(messaging, { vapidKey: "您的VAPID密钥" })
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
