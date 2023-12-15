/* eslint-disable no-console */

// import { register } from "register-service-worker";
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
