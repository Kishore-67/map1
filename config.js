import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGDbBu1h_F_3CVOjpPdHLxU73iDvhmoIU",
  authDomain: "bustrackingapr11.firebaseapp.com",
  databaseURL: "https://bustrackingapr11-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bustrackingapr11",
  storageBucket: "bustrackingapr11.appspot.com",
  messagingSenderId: "651841901077",
  appId: "1:651841901077:web:9cdb8346c82664df36f41c",
  measurementId: "G-JSBSZZ85J3"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
const dbfirestore = getFirestore();
export {db , dbfirestore}



