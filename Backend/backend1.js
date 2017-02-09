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
  
function addAuthUser(email, password) {
   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
   });
}

function signIn(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		console.log("Sign in unsuccessful");
		return;
	});
	console.log("Sign into " + email + " successfully");
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
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
		console.log("Email sent to " + user.Email);
	}, function(error) {
  		console.log("Email not sent - From sendEmailVerification()");
	});
}

function printCurrentUserData() {
	var user = firebase.auth().currentUser;

	//console.log(user.email);
	//console.log(user.UID);
	//console.log(user.P)
}
var email = "brandonxia01@gmail.com";
var password = "password01";
//addAuthUser("brandonxia01@gmail.com", "password01");

signIn(email, password);
//printCurrentUserData();

//sendPasswordResetEmail(email);


//sendEmailVerification();
	







