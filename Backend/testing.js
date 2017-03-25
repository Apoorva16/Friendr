var firebase = require("firebase");

var config =
{
	apiKey: "AIzaSyB9-bQjCSShbkJuiDeWtyOurzFqTnr7pFU",
	authDomain: "friendr-be400.firebaseapp.com",
	databaseURL: "https://friendr-be400.firebaseio.com",
	storageBucket: "friendr-be400.appspot.com",
	messagingSenderId: "852808235414"
};

  
firebase.initializeApp(config);

var database = firebase.database();
var user;
	
	function addAuthUser(email, password, firstName, lastName, username)
	{
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {});

		firebase.auth().onAuthStateChanged(function(currentUser)
		{
			if(currentUser)
			{
				database.ref('users/' + currentUser.uid).set(
				{
					firstName: firstName,
					lastName: lastName,
					username: username
				});
			}
		});
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
				//printCurrentUserData();
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

	function sendPasswordResetEmail (email) {
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

	function initiateConversation (other_uid)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if(user)
			{
				var conversation_id = user.uid + ' ' + other_uid;
		
				database.ref('users/' + other_uid).once('value').then(function(snapshot)
				{
					database.ref('users/' + user.uid).child("conversation_list").child(conversation_id).set(
					{
						other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName,
						other_user_uid: other_uid
					});
				});
				
				database.ref('users/' + user.uid).once('value').then(function(snapshot)
				{
					database.ref('users/' + other_uid).child("conversation_list").child(conversation_id).set(
					{
						other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName,
						other_user_uid: user.uid
					});
				});
				
			
			
				database.ref('conversations').child(conversation_id).set(
				{
					User1: user.uid,
					User2: other_uid,
					MessageCount: 0,
				});
			}
		});
	}

	function sendMessage (other_uid, message)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				var conversation_id1 = user.uid + ' ' + other_uid;
				var conversation_id2 = other_uid + ' ' + user.uid;

				//determine which conversation_id is correct
				var convoId1 = database.ref('conversations').child(conversation_id1);
				var convoId2 = database.ref('conversations').child(conversation_id2);

				convoId1.once('value').then(function(snapshot)
				{
					if (snapshot.hasChildren())
					{
						var messageCount = snapshot.val().MessageCount;
						var nextMessageId = messageCount + 1;
						var date = new Date();
					
						database.ref('conversations').child(conversation_id1).child('message_list').child(nextMessageId).set(
						{
							message: message,
							sender: user.uid,
							date: date.toDateString(),
							time: date.toTimeString()
						});	

						database.ref('conversations').child(conversation_id1).update(
						{
							MessageCount: messageCount+1
						});
					}
				});

				convoId2.once('value').then(function(snapshot)
				{
					if (snapshot.hasChildren())
					{
						var messageCount = snapshot.val().MessageCount;
						var nextMessageId = messageCount + 1;
						var date = new Date();
					
						database.ref('conversations').child(conversation_id2).child('message_list').child(nextMessageId).set(
						{
							message: message,
							sender: user.uid,
							date: date.toDateString(),
							time: date.toTimeString()
						});	

						database.ref('conversations').child(conversation_id2).update(
						{
							MessageCount: messageCount+1
						});
					}
				});
			}
		});
	}

	function viewConversation (other_uid)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				var conversation_id1 = user.uid + ' ' + other_uid;
				var conversation_id2 = other_uid + ' ' + user.uid;

				//determine which conversation_id is correct
				var convoId1 = database.ref('conversations').child(conversation_id1);
				var convoId2 = database.ref('conversations').child(conversation_id2);

				convoId1.child('message_list').on('child_added', function(snapshot, prevKey)
				{
					if (snapshot.hasChildren())
					{
						console.log(snapshot.val().message);
	    			}
				});

				convoId2.child('message_list').on('child_added', function(snapshot, prevKey)
				{
					if (snapshot.hasChildren())
					{
						console.log(snapshot.val().message);
	    			}
				});
			}
		});
	}


	function addActivity (activity) 
	{
		database.ref('Activities/'+activity).set(
  		{ 
        	activity: activity
  		});
	}

	function getActivityList() {
		var list = [];
		var activityListPromise = new Promise(function(resolve, reject)
		{
	  		database.ref('Activities/').once('value').then(function(snapshot)
	  		{
	   			snapshot.forEach(function(childSnapshot) {
	      			list.push(childSnapshot.key);
	    		});
	    		//console.log(list.toString());
	    		resolve(list); //u
	  		});
	  	});
	  
	  	return activityListPromise;

	}

	function enterQueue (activity) {
		var matchedUser = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
		    	if (user)
		    	{ // User is signed in.
		       		//console.log("matching");
		     	   	database.ref('Activities/'+ activity).once('value').then(function(snapshot)
		        	{
		          		if (snapshot.child("Searching").exists())
		          		{
				            // get matched with this user
				            var other_uid = snapshot.child("Searching").val();
				            //console.log(user.uid + " matched with user " + other_uid)
				            database.ref('Activities/' + activity + "/Searching").remove()
				     
		            		resolve(other_uid);
		          		}	
			          	else if(snapshot.exists())
			          	{
			          		database.ref('Activities/'+ activity).update(
			          		{
			          			activity: activity,
			          			Searching: user.uid
			          		});
			          		console.log(user.uid + " in queue for " + activity);
			          		resolve(null);
			          	}
		       	 	}); 
		    	}
	  		});
	  	});
	  	return matchedUser;
	}

	function leaveQueue (activity)
	{
	  	firebase.auth().onAuthStateChanged(function(user)
	  	{
		    if (user)
		    { // User is signed in.
		        database.ref('Activities/'+ activity).once('value').then(function(snapshot)
			    {
			        if (snapshot.child("Searching").exists())
			        {
			            // get matched with this user
			            if (snapshot.child("Searching").val() == user.uid)
			            {
			            	database.ref('Activities/' + activity + "/Searching").remove();
			            	/*{
			              		activity: activity
			            	});*/
			              	console.log("User out of queue");
			            }
			        }
		        }); 
		        // User is signed in.
		    }
  		});
	}

	function modifyProfilePicture (picture_link)
	{
		var user = firebase.auth().currentUser;

		user.updateProfile({
			photoURL: picture_link
		});
	}

	function modifyUsername (user_name)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				user.updateProfile({
					username: user_name
				});

				database.ref('users/' + user.uid).update(
				{
					username: user_name
				});
			}
		});
	}

	function setPreferencesForActivity(activity, preferencesList) {
		var x = 0;

		for (var s in preferencesList) {
			var p = "p"+x;
			//console.log("p = " + p);
			var pref = preferencesList[s];
			var foo = {};
			foo[p] = pref;
			database.ref("Activities/"+activity+"/Preferences").update(foo);
			x++;
		}
	}

	function getPreferencesList(activity) {
		var list = [];
		var preferencesListPromise = new Promise(function(resolve, reject)
		{
	  		database.ref('Activities/'+activity+'/Preferences').once('value').then(function(snapshot)
	  		{
	   			snapshot.forEach(function(child) {
	      			list.push(child.val());
	    		});
	    		//console.log(list.toString());
	    		resolve(list); //u
	  		});
	  	});
	  
	  	return preferencesListPromise;

	}

	function setPreferencesForUser(activity, preference) {
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				var foo = {};
				foo[activity] = preference;
				database.ref('users/'+ user.uid + '/Preferences').update(foo);
			}
		});
	}



var email = "brandonxia01@gmail.com";
var password = "password";
var username = "brandonxia01";
var firstname = "brandon";
var lastname = "xia";
//addAuthUser(email, password, firstname, lastname, username);
signIn(email,password);
getPreferencesList("Work Out");
setPreferencesForUser("Work Out", "Upper Body");
//var preferencesList = ["No Preference", "Math", "Computer Science"];
//setPreferencesForActivity("Study", preferencesList);
//setPreferencesForActivity("Work Out", ["No Preference", "Upper Body", "Lower Body", "Cardio"]);
//enterQueue("Work Out");
//leaveQueue("Work Out");




