// Firebase v9+ 導入方式
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

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
const messaging = getMessaging(app);

onBackgroundMessage(messaging, function (payload) {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  return self.registration.showNotification(title, options);
});
