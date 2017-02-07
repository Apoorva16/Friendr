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

var email = "jradocho@purdue.com";
var password = "testing123";
var name = "Josh Radochonski";
var username = "joshrado";
var currentUser;

function createAuthAccount(email, password, name, username)
{
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error)
	{
		var errorCode = error.code;
		var errorMessage = error.message;
		
		console.log(errorMessage);
	});
	
}

function createDatabaseEntry(uid, username)
{
	database.ref('users/' + uid).set(
	{
		username: username
	});
}

createAuthAccount(email, password);


firebase.auth().onAuthStateChanged(function(currentUser)
{
	if(currentUser)
	{
		currentUser.displayName = username;
		createDatabaseEntry(currentUser.uid, username);
	}
});




