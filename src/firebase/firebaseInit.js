// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

export default function initFB() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
    authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
    projectId: "pwa-notification-test-39b3f",
    storageBucket: "pwa-notification-test-39b3f.appspot.com",
    messagingSenderId: "667279105190",
    appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
    measurementId: "G-28EW5Q8N5D"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line no-unused-vars
  const analytics = getAnalytics(app);
  const messaging = getMessaging(app);
  const fbData = {
    analytics,
    messaging,
  };
  return fbData;
}
