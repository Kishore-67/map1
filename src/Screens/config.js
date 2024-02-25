import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBD8YIGKYXscQs6lrgTWNweY5EGZxJAxBg",
  authDomain: "again-ff9d5.firebaseapp.com",
  databaseURL: "https://again-ff9d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "again-ff9d5",
  storageBucket: "again-ff9d5.appspot.com",
  messagingSenderId: "991871579607",
  appId: "1:991871579607:web:54d2c73cc927f52f294792",
  measurementId: "G-58JYK6HZBY"
}

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export {db}