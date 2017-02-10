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
  

var user;

function addAuthUser(email, password) {
   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
   });

   //deleteUser();
}

function deleteUser() {
	if (user == null) {
		getCurrentUser();
	}

	var email = user.email;
	user.delete().then(function() {
	  	console.log(email + " deleted");
	}, function(error) {
	  	console.log("No account deleted");
	});
}

function signIn(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		console.log("Sign in unsuccessful");
		return;
	});
	console.log("Signed into " + email + " successfully");
}

function getCurrentUser() {
	firebase.auth().onAuthStateChanged(function(_user) {
		if (_user) {
			user = _user;
			printCurrentUserData();
	   		// User is signed in.
		} else {
			return null;
			// No user is signed in.
		}
	});
}
function signOut() {
	firebase.auth().signOut().then(function() {
		// signout Successful
	}, function (error) {
		// error
	});
}

function resetPassword(newPassword) {
	var user = firebase.auth().currentUser;
	user.updatePassword(newPassword).then(function() {
		//success
	}, function (error) {
		//error
	});
}
function sendPasswordResetEmail(email) {
	firebase.auth().sendPasswordResetEmail(email).then(function() {
		// email sent
		console.log("email sent to " + email);
	}, function (error) {
		//error
		console.log("Email not sent");
	});
}

function sendEmailVerification() {
	user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
		console.log("Email sent to " + user.email);
	}, function(error) {
  		console.log("Email not sent - From sendEmailVerification()");
	});
}

function printCurrentUserData() {
	var user = firebase.auth().currentUser;
	if (user != null) {
		console.log(user.email);
		console.log(user.uid);
		//console.log(user.P)
	}
	else {
		console.log("No user signed in");
	}
}
var email = "brandonxia01@gmail.com";
var password = "password01";
//addAuthUser(email, password);
signIn(email, password);
getCurrentUser();

//setTimeout(function(){alert("hi")}, 2000);
//console.log(user.email);

//deleteUser();

//console.log("waiting");

//printCurrentUserData();

//sendPasswordResetEmail(email);


//sendEmailVerification();
	







