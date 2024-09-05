// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "./Config/Config";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.SENDERID,
  appId: config.APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};

export default app;