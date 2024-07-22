import { initializeApp, getApps, getApp, } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


interface Config{
  apiKey:string|undefined,
  authDomain:string|undefined,
  projectId: string|undefined,
  storageBucket: string|undefined,
  messagingSenderId: string|undefined,
  appId: string|undefined
}

const firebaseConfig : Config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig): getApp();

//auth
const auth = getAuth(app);
const db  = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {app,auth,db,googleProvider}