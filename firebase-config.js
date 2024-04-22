// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Add this import statement

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3G-t5zDnJzQxmxOrevkUipz7XgHB0Y_c",
  authDomain: "ecs-2-871ec.firebaseapp.com",
  databaseURL: "https://ecs-2-871ec-default-rtdb.firebaseio.com",
  projectId: "ecs-2-871ec",
  storageBucket: "ecs-2-871ec.appspot.com",
  messagingSenderId: "559173922912",
  appId: "1:559173922912:web:2289577988d1cadabf5305",
  measurementId: "G-0J2LLR11WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };
