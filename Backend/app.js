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

var email = "xiab@purdue.edu";
var email2 = "brandonxia01@gmail.com";
var password = "password";
var name = "Brandon Xia";
var username = "brandonxia01";
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

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      console.log("Sign in unsuccessful");
      return;
    });
    console.log("Signed into " + email + " successfully");
  }

function createDatabaseEntry(uid, username)
{
	database.ref('users/' + uid).set(
	{
		username: username
	});
}

//createAuthAccount(email, password);


firebase.auth().onAuthStateChanged(function(currentUser)
{
	if(currentUser)
	{
		currentUser.displayName = username;
		createDatabaseEntry(currentUser.uid, username);
	}
});

function createActivityList(activityArray) {

}

function addActivity(activity) {
 
  database.ref('Activities/'+activity).set(
  { 
        activity: activity
  });
  
}
function getActivityList() {
  
  var list = [];
  database.ref('Activities/').once('value').then(function(snapshot)
  {
    snapshot.forEach(function(childSnapshot) {
      list.push(childSnapshot.key);
    });
    //var list = snapshot.getChildren();
    console.log(list.toString());
    return list;
  });
  
}

function enterQueue(activity) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.
        console.log("matching");
        database.ref('Activities/'+ activity).once('value').then(function(snapshot)
        {
          if (snapshot.child("Searching").exists()) {
            // get matched with this user
            var other_uid = snapshot.child("Searching").val();
            console.log("should be matched with user " + other_uid)
            database.ref('Activities/' + activity).set({
                activity: activity
            });
            return other_uid;

          }
          else if (snapshot.exists()){

              database.ref('Activities/'+ activity).set(
              {
                  activity: activity,
                  Searching: user.uid
              });
              console.log(user.uid + " in queue for "+ activity);
          }
        }); 
        // User is signed in.
    }
  });
}

function leaveQueue(activity) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.
        database.ref('Activities/'+ activity).once('value').then(function(snapshot)
        {
          if (snapshot.child("Searching").exists()) {
            // get matched with this user
            if (snapshot.child("Searching").val() == user.uid) {
              database.ref('Activities/' + activity).set({
                activity: activity
              });
              console.log("User out of queue");
            }
          }
        }); 
        // User is signed in.
    }
  });
}

//createAuthAccount(email, password, name, username);
signIn(email,password);
enterQueue("Study");
//leaveQueue("Study");
//addActivity("Study");
/*addActivity("Eat");
addActivity("Work Out");*/
//getActivityList();








