// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOCrE9YZzurofXF2JQSbVsOJ_LqnL1Txs",
  authDomain: "medicine-park-29ca8.firebaseapp.com",
  projectId: "medicine-park-29ca8",
  storageBucket: "medicine-park-29ca8.appspot.com",
  messagingSenderId: "476228795735",
  appId: "1:476228795735:web:ffeee9a2be1b4197851212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;