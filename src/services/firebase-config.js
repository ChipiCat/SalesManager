import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7Q4KC4gvSZX5XjWELjme8QZePCBTjbus",
  authDomain: "salesmanager-71337.firebaseapp.com",
  projectId: "salesmanager-71337",
  storageBucket: "salesmanager-71337.appspot.com",
  messagingSenderId: "892942091450",
  appId: "1:892942091450:web:984caf28479e92a8f62e83",
  measurementId: "G-X4QHXC3EWJ"
};


const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const firestore = getFirestore(firebaseApp);

export { firestore, firebaseApp, analytics };