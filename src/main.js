import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import  { initializeApp }  from "firebase/app";
import "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
	authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
	projectId: "pwa-notification-test-39b3f",
	storageBucket: "pwa-notification-test-39b3f.appspot.com",
	messagingSenderId: "667279105190",
	appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
	measurementId: "G-28EW5Q8N5D",
};
const app = initializeApp(firebaseConfig);

const messaging = app.messaging();

messaging.usePublicVapidKey(
	"BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc"
); // 1. Generate a new key pair

// Request Permission of Notifications
messaging
	.requestPermission()
	.then(() => {
		console.log("Notification permission granted.");

		// Get Token
		messaging.getToken().then((token) => {
			// 将 token 发送到服务器保存，用于将来的推送
			console.log("FCM Token:", token);
		});
	})
	.catch((err) => {
		console.log("Unable to get permission to notify.", err);
	});

messaging.onMessage((payload) => {
	console.log("Message received:", payload);
	// 在这里处理收到的推送消息，例如显示通知
});

App.config.globalProperties.$firebase = app;
createApp(App).mount("#app");
