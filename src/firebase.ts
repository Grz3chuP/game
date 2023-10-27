// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import {endGameScore, testFromDatabase} from "./gamecontrol";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1DaONVLWsBlXWMeX9XSTTnAnXJr2SGJA",
  authDomain: "gametest-98dd2.firebaseapp.com",
  databaseURL: "https://gametest-98dd2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gametest-98dd2",
  storageBucket: "gametest-98dd2.appspot.com",
  messagingSenderId: "991616584743",
  appId: "1:991616584743:web:6b32a26587a1f28f98d202"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reference = ref(db, '/game');

export function changeDataInFirebase(date: any) {

   set(reference, date);
}

export const getDataFromFirebase = () => {
   get(reference).then((snapshot) => {
     console.log(snapshot.val());
     const data = snapshot.val();
     endGameScore.set({wins: data.wins, loses: data.loses });

     console.log('Get Data Base' + data);
   })


}

onValue(reference, (snapshot) => {

  const data = snapshot.val();
  console.log('DB' +data);
  endGameScore.set({wins: data.wins, loses: data.loses });
  testFromDatabase.set(data.loses);
})

