import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
    authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
    projectId: "pwa-notification-test-39b3f",
    storageBucket: "pwa-notification-test-39b3f.appspot.com",
    messagingSenderId: "667279105190",
    appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
    measurementId: "G-28EW5Q8N5D"
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BOAw5pQGmd4WaIplh_GRbO7Lz0GT3d3A8qu0v-wq5jG5SQKdWPZswUWYi5BB2Rb27U0B6Bjoi1Qt4mevxgpuhqc"); // 1. Generate a new key pair

// Request Permission of Notifications
messaging
	.requestPermission()
	.then(() => {
		console.log("Notification permission granted.");

		// Get Token
		messaging.getToken().then((token) => {
			console.log(token);
		});
	})
	.catch((err) => {
		console.log("Unable to get permission to notify.", err);
	});

createApp(App).mount("#app");
