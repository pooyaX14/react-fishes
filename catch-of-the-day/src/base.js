// import Rebase from 're-base';
// import firebase from 'firebase'
var Rebase = require('re-base');
var firebase = require('firebase/app');
var database = require('firebase/database');


// const config = Rebase.createClass({ /*used rebase package to connect to firebase database*/
// 	apiKey: "AIzaSyDQ3gKhdZPQJaNXn1Wn4SxeQe0F_09FAlM",
//     authDomain: "catch-of-the-day-4f0f7.firebaseapp.com",
//     databaseURL: "https://catch-of-the-day-4f0f7.firebaseio.com",
// });

// const app = firebase.initializeApp(config)
// const base = Rebase.createClass(app.database())

// export default base;

// var Rebase = require('re-base');
// var firebase = require('firebase/app');
// var database = require('firebase/database');

var app = firebase.initializeApp({
  apiKey: "AIzaSyDQ3gKhdZPQJaNXn1Wn4SxeQe0F_09FAlM",
  authDomain: "catch-of-the-day-4f0f7.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-4f0f7.firebaseio.com",
  // storageBucket: "bucket.appspot.com",
  // messagingSenderId: "xxxxxxxxxxxxxx"
});
var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;

// "re-base": "^4.0.0",