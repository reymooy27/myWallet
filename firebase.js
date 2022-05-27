import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBKKyb5jFOG7nQViLDz9CGsdob1niyAeAA",
  authDomain: "mywallet-e67c4.firebaseapp.com",
  projectId: "mywallet-e67c4",
  storageBucket: "mywallet-e67c4.appspot.com",
  messagingSenderId: "586953647271",
  appId: "1:586953647271:web:a6ff7105d7ad27453b6782"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}