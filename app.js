var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyB9-bQjCSShbkJuiDeWtyOurzFqTnr7pFU",
    authDomain: "friendr-be400.firebaseapp.com",
    databaseURL: "https://friendr-be400.firebaseio.com",
    storageBucket: "friendr-be400.appspot.com",
    messagingSenderId: "852808235414"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  var username = "timmy";
  var email = "timmy123@purdue.edu";
  
  function writeUserData(username, email) {
	  database.ref('users/' + username).set({
		  email: email
	  });
  }
  
  writeUserData(username, email);