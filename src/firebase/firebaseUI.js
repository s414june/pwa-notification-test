export default function registerSW() {
  // 註冊sw
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', {
        updateViaCache: 'none',
      })
      .then((registration) => {
        console.log('Service Worker Registered', registration);
        registration.update();
      })
      .catch((err) => {
        console.log('Service Worker registration failed', err);
      });
  }
}