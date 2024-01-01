
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getPerformance } from 'firebase/performance'

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

const db = getFirestore(app)

const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const storage = getStorage(app)

const perf = getPerformance(app);

export const userdb = collection(db, "users")

export { app, analytics, auth, googleProvider, db, storage }