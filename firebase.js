
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firebase-auth"

const firebaseConfig = {
  apiKey: "AIzaSyDuc8GTSC773SNLW8NbpwljznK1NfI-A5U",
  authDomain: "mesaconnected.firebaseapp.com",
  projectId: "mesaconnected",
  storageBucket: "mesaconnected.appspot.com",
  messagingSenderId: "802671676825",
  appId: "1:802671676825:web:050943a8d3f6aafa2ad708",
  measurementId: "G-WP74NSPG26"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = app.auth()

export { app, analytics }