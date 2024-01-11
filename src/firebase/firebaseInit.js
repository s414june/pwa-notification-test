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
    apiKey: 'AIzaSyBUjddEpiGvIYZVrnM774AurtxODmYVTLc',
    authDomain: 'go-house-94ee2.firebaseapp.com',
    projectId: 'go-house-94ee2',
    storageBucket: 'go-house-94ee2.appspot.com',
    messagingSenderId: '175915564420',
    appId: '1:175915564420:web:b65876099b1da54357b1d1',
    measurementId: 'G-QZ0BWS4C4J',
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
