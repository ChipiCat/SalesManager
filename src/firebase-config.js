import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAc8191Qvi6RkPI4sH_N9DgR8vRv-0hzvk",
  authDomain: "salesmanager-68efb.firebaseapp.com",
  projectId: "salesmanager-68efb",
  storageBucket: "salesmanager-68efb.appspot.com",
  messagingSenderId: "61865024058",
  appId: "1:61865024058:web:95b4bf8202f6fe474bb303",
  measurementId: "G-H0GMMWBDDC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseApp;