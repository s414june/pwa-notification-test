/* eslint-disable no-console */

// import { register } from "register-service-worker";
import { messaging } from "./firebaseInit";
import { onMessage, getToken } from "firebase/messaging";

// 請求通知權限
getToken(messaging, {
  vapidKey:
    "BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc",
  serviceWorkerRegistration: await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  ),
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

// if (process.env.NODE_ENV === "production") {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready() {
//       console.log(
//         "App is being served from cache by a service worker.\n" +
//           "For more details, visit https://goo.gl/AFskqB"
//       );
//     },
//     registered() {
//       console.log("Service worker has been registered.");
//     },
//     cached() {
//       console.log("Content has been cached for offline use.");
//     },
//     updatefound() {
//       console.log("New content is downloading.");
//     },
//     updated() {
//       console.log("New content is available; please refresh.");
//     },
//     offline() {
//       console.log(
//         "No internet connection found. App is running in offline mode."
//       );
//     },
//     error(error) {
//       console.error("Error during service worker registration:", error);
//     },
//   });
// }
