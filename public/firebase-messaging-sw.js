/* eslint-disable no-undef */
// 使用 importScripts 导入 Firebase 库
importScripts(
	"https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
	authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
	projectId: "pwa-notification-test-39b3f",
	storageBucket: "pwa-notification-test-39b3f.appspot.com",
	messagingSenderId: "667279105190",
	appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
	measurementId: "G-28EW5Q8N5D"
  };


// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

function showNoti(data) {
	// try {
	// 	const data = JSON.parse(payload.data.body);
	// 	const { title } = data;
	// 	const options = {
	// 		type: data.type,
	// 		body: data.content,
	// 		icon: "/img/icons/icon-192.png",
	// 		data,
	// 	};
	// 	self.registration.showNotification(title, options);
	// } catch (error) {
	// 	console.error(error);
	// }
	try {
		const title = data.title || "";
		if (title === "") return;
		const options = {
			body: data.body ?? "",
			icon: data.icon ?? "/img/icons/icon-192.png",
			tag: data.tag ?? "",
		};
		self.registration.showNotification(title, options);
	} catch (error) {
		console.error(error);
	}
}

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// showNoti(payload);
});

self.addEventListener("message", (event) => {
	const data = event.data ?? {};
	console.log("[firebase-messaging-sw.js] Received front message ", data);
	// if (data.actions?.includes('skipWaiting')) {
	//   const cacheDeleted = clearCache();
	//   cacheDeleted.then((res) => {
	//     if (res === false) {
	//       // const title = '未清除快取通知';
	//       // const options = {
	//       //   body: '沒有快取要清耶，你為什麼要按',
	//       //   icon: '/img/icons/icon-192.png',
	//       // };
	//       // self.registration.showNotification(title, options);
	//     }
	//   });
	// }
	showNoti(data);
});

// 註冊推播通知事件處理程序
self.addEventListener("notificationclick", (event) => {
	event.notification.close(); // 關閉通知
	const { data } = event.notification;
	console.log(data);
	if (data && data.url) {
		event.waitUntil(
			clients.openWindow(data.url) // 打開特定網頁
		);
	} else {
		event.waitUntil(
			clients.openWindow("/?text=" + Math.random()) // 模擬打開特定網頁
		);
	}
});

function deleteWebCache() {
	console.log("deleteWebCache is started");
	return new Promise((resolve) => {
		caches.keys().then((cacheNames) => {
			if (cacheNames.length === 0) {
				console.log("no caches");
				return resolve(false);
			}
			cacheNames.forEach((cacheName) => {
				caches.open(cacheName).then((cache) => {
					cache.keys().then((requests) => {
						requests.forEach((request) => {
							if (
								request.url.startsWith(
									"https://pwa-notification-test-iota.vercel.app/"
								)
							) {
								cache.delete(request);
							}
						});
						return resolve(true);
					});
				});
			});
			return resolve(false);
		});
	});
}

self.addEventListener("activate", () => {
	// 監聽到清除快取
	deleteWebCache();
});
