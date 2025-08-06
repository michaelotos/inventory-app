import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBatJhF0WGb1pUM4bojYr9THsaRQ5Z1C-s",
  authDomain: "inventory-app-5da5e.firebaseapp.com",
  projectId: "inventory-app-5da5e",
  storageBucket: "inventory-app-5da5e.appspot.com",
  messagingSenderId: "899110065301",
  appId: "1:899110065301:web:8dd583c8c4c6fd3288f79c",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
