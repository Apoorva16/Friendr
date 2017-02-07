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
  
  var username = "brandon";
  var email = "xiab@purdue.edu";
  var password = "password123";
  
  function writeUserData(username, email) {
	  database.ref('users/' + username).set({
		  email: email
	  });
  }
  
  function removeUser(username) {
  	database.ref('users/' + username).remove();
  }

  function addAuthUser(email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      });
  }
  function printUserInfo() {
    var user = firebase.auth().currentUser;
    if (user!= null) {
      user.providerData.forEach(function (profile) {
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
      });
    }
    else {
      console.log("Not Logged In");
    }
  }

  function getUserProfile() {
    var user = firebase.auth().currentUser;
    if (user != null) {
     
    }
  }

  addAuthUser(email, password);
  printUserInfo();


  //writeUserData(username, email);
  //database.auth()
  //removeUser("brandon");

  //database.ref('users/' + "josh").remove();
/*	database.ref('users/' + "josh").set({
		  email: "jradocho@purdue.edu"
	  });
*/
 	//process.exit();

