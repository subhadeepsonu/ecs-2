// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9cqoYcRh4nBf1isZMTq_9AFkalMaq860",
  authDomain: "ecs-2-83019.firebaseapp.com",
  databaseURL: "https://ecs-2-83019-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecs-2-83019",
  storageBucket: "ecs-2-83019.appspot.com",
  messagingSenderId: "965385235187",
  appId: "1:965385235187:web:45f82fa333e72e6c78e586"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
export {database}