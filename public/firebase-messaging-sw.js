/* eslint-disable no-undef */
// 使用 importScripts 导入 Firebase 库
importScripts(
	"https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

// 註冊推播通知事件處理程序
self.addEventListener("notificationclick", function (event) {
	event.notification.close(); // 關閉通知
	event.waitUntil(
		clients.openWindow("/?text=" + Math.random()) // 打開特定網頁
	);
});

self.addEventListener("message", (event) => {
  console.log(event.data)
  if (event.data.actions?.includes("skipWaiting")) {
		self.skipWaiting();
	}
	const data = event.data.json() ?? {};
	const title = data.title || "";
	if (title === "") return;
	const options = {
		body:  data.body ?? "",
		icon: data.icon ?? "/img/icons/icon-192.png",
		tag: data.tag ?? "",
	};
	return self.registration.showNotification(title, options);
});

const firebaseConfig = {
	apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
	authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
	projectId: "pwa-notification-test-39b3f",
	storageBucket: "pwa-notification-test-39b3f.appspot.com",
	messagingSenderId: "667279105190",
	appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
	measurementId: "G-28EW5Q8N5D",
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

self.addEventListener("activate", (event) => {
	clearCache(event);
});

//先執行原生事件，再執行FCM定義的事件，否則原生事件不會執行?
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const title = payload.notification.title;
	const options = {
		body: payload.notification.body,
		// icon: payload.notification.icon,
		icon: "/img/icons/icon-192.png",
	};
	return self.registration.showNotification(title, options);
});

function clearCache(event) {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					return caches.delete(cacheName);
				})
			).then(() => {
				const title = "清除快取通知";
				const options = {
					body: "已經清除快取",
					icon: "/img/icons/icon-192.png",
				};
				return self.registration.showNotification(title, options);
			});
		})
	);
}
