import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
	apiKey: "AIzaSyDc7_KRggZySk2NLdlcEQGfAtOuyVC-REs",
	authDomain: "pwa-notification-test-39b3f.firebaseapp.com",
	projectId: "pwa-notification-test-39b3f",
	storageBucket: "pwa-notification-test-39b3f.appspot.com",
	messagingSenderId: "667279105190",
	appId: "1:667279105190:web:b653b12ae2b15b4db3a867",
	measurementId: "G-28EW5Q8N5D",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export { messaging };