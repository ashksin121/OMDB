import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
console.log(process.env.REACT_APP_API_KEY)
const firebaseConfig = {
  apiKey: 'AIzaSyBQqosJXQR-mb03om9cr-i3q0BurecewI4',
  authDomain: 'ombd-shopify.firebaseapp.com',
  databaseURL: 'https://ombd-shopify.firebaseio.com',
  projectId: "ombd-shopify",
  storageBucket: 'ombd-shopify.appspot.com',
  messagingSenderId: '47343213018',
  appId: '1:47343213018:web:b8a3e82695a36b31fb48e3',
  measurementId: 'G-BRXK1J3WJE'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();