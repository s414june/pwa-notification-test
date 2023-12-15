import firebase from 'firebase/app';
import 'firebase/messaging';

firebase.initializeApp({
  // 您的 Firebase 配置
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  return self.registration.showNotification(title, options);
});
