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

module.exports = 
{	
	addAuthUser: function(email, password, firstName, lastName, username)
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
	},

	deleteUser: function() {
		if (user == null) {
			getCurrentUser();
		}

		var email = user.email;
		user.delete().then(function() {
			console.log(email + " deleted");
		}, function(error) {
			console.log("No account deleted");
		});
	},

	signIn: function(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
			console.log("Sign in unsuccessful");
			return;
		});
		console.log("Signed into " + email + " successfully");
	},

	getCurrentUser: function() {
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
	},
	
	signOut: function() {
		firebase.auth().signOut().then(function() {
			// signout Successful
		}, function (error) {
			// error
		});
	},

	resetPassword: function(newPassword) {
		var user = firebase.auth().currentUser;
		user.updatePassword(newPassword).then(function() {
			//success
		}, function (error) {
			//error
		});
	},

	sendPasswordResetEmail: function(email) {
		firebase.auth().sendPasswordResetEmail(email).then(function() {
			// email sent
			console.log("email sent to " + email);
		}, function (error) {
			//error
			console.log("Email not sent");
		});
	},

	sendEmailVerification: function() {
		user = firebase.auth().currentUser;

		user.sendEmailVerification().then(function() {
			console.log("Email sent to " + user.email);
		}, function(error) {
			console.log("Email not sent - From sendEmailVerification()");
		});
	},

	printCurrentUserData: function() {
		var user = firebase.auth().currentUser;
		if (user != null) {
			console.log(user.email);
			console.log(user.uid);
			//console.log(user.P)
		}
		else {
			console.log("No user signed in");
		}
	},

	initiateConversation: function(other_uid)
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
	},

	sendMessage: function(other_uid, message)
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
						console.log("Message Sent: " + message);
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
	},

	viewConversationList: function()
	{
		var messageListPromise = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
				if (user)
				{
					//get conversation list
					database.ref('users').child(user.uid).child('conversation_list').once('value').then(function(snapshot)
					{
		    			resolve(snapshot.val());
		    		});
				}
			});
		});
		return messageListPromise;
	},

	viewConversation: function(other_uid)
	{
		var messageList = new Promise(function(resolve, reject)
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

					convoId1.child('message_list').once('value').then(function(snapshot)
					{
						if (snapshot.hasChildren())
						{
							var list = [];
							snapshot.forEach(function(childSnapshot)
							{
								var message = childSnapshot.val().message;
								list.push(message);
							});
							resolve(list);
						}
					});

					convoId2.child('message_list').once('value').then(function(snapshot)
					{
						if(snapshot.hasChildren())
						{
							var list = [];
							snapshot.forEach(function(childSnapshot)
							{
								var message = childSnapshot.val().message;
								list.push(message);
							});
							resolve(list);
						}
					});

				}
			});
		});
		return messageList;
	},

	listenToConversation: function(other_uid)
	{
		var incomingMessage = new Promise(function(resolve, reject)
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
							//TODO: insert code to add message to conversation
							resolve(snapshot.val());
						}
					});

					convoId2.child('message_list').on('child_added', function(snapshot, prevKey)
					{
						if (snapshot.hasChildren())
						{
							//TODO: insert code to add message to conversation
							resolve(snapshot.val());
						}
					});
				}
			});
		});
		return incomingMessage;
	},

	addActivity: function(activity) 
	{
		database.ref('Activities/'+activity).set(
  		{ 
        	activity: activity
  		});
	},

	getActivityList: function() {
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

	},

	enterQueue: function(activity) {
		var matchedUser = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
		    	if (user)
		    	{ // User is signed in.
		       		//console.log("matching");
		     	   	database.ref('Activities/'+ activity + '/Searching').once('value').then(function(snapshot1)
		        	{
		          		if (snapshot1.exists())
		          		{
		          			database.ref('users/' + user.uid + '/Preferences/' + activity).once('value').then(function(snapshot2)
			          		{
			          			var matchFound = false;
			          			snapshot1.forEach(function(childSnapshot1)
			          			{
			          				var other_uid = childSnapshot1.key;
			          				var other_preferences = childSnapshot1.val().preferences;
			          				console.log("other_uid");
			          				console.log(other_uid);
			          				console.log("other_preferences");
			          				console.log(other_preferences);

			          				var my_preferences = snapshot2.val();
			          				console.log("my_preferences");
			          				console.log(my_preferences);

			          				var isMatch = true;
			          				for (var key in my_preferences)
			          				{
			          					if (my_preferences.hasOwnProperty(key))
			          					{
			          						if (my_preferences[key] == other_preferences[key])
			          							console.log("Preferences Match: " + key);
			          						else
			          						{
			          							console.log("Preferences Mismatch: " + key);
			          							isMatch = false;
			          							break;
			          						}
			          					}
			          				}

			          				if (isMatch)
			          				{
			          					//all preferences match, remove other user from queue
			          					matchFound = true;
			          					console.log("Match found, removing matching uid from queue " + other_uid);
			          					database.ref('Activities/' + activity + '/Searching/' + other_uid).remove();

			          					database.ref('users/' + user.uid + '/match_list').once('value').then(function(snapshot){
			          						var matchNum = snapshot.val().numMatches;
			          						console.log("Match Number: ");
			          						console.log(matchNum);
			          						if (matchNum = null)
			          							matchNum = 1;

			          						//add each to the match list
				          					database.ref('users/' + user.uid + '/match_list/' + matchNum).set({
				          						other_uid: other_uid
				          					});

				          					database.ref('users/' + user.uid + '/match_list').update({
				          						numMatches: matchNum + 1
				          					});
			          					});

			          					database.ref('users/' + other_uid + '/match_list').once('value').then(function(snapshot){
			          						var matchNum = snapshot.val().numMatches;
			          						console.log("Match Number: ");
			          						console.log(matchNum);
			          						if (matchNum == null)
			          							matchNum = 1;

			          						//add each to the match list
				          					database.ref('users/' + other_uid + '/match_list/' + matchNum).set({
				          						other_uid: other_uid
				          					});

				          					database.ref('users/' + other_uid + '/match_list').update({
				          						numMatches: matchNum + 1
				          					});
			          					});

			          					resolve(other_uid);
			          				}
			          			});

			          			if (!matchFound)
			          			{
				          			//match not found, insert into queue
				          			console.log("No Match Found");
				          			database.ref('users/' + user.uid + '/Preferences/' + activity).once('value').then(function(snapshot)
					          		{
					          			var userPreferences = snapshot.val();
					          			console.log(userPreferences);

					          			database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
						          		{
						          			preferences: userPreferences
						          		});
						          		console.log(user.uid + " in queue for " + activity);
					          		});
				          		
				          			resolve(null);
			          			}
			          		});
		          		}	
			          	else
			          	{
			          		database.ref('users/' + user.uid + '/Preferences/' + activity).once('value').then(function(snapshot)
			          		{
			          			var userPreferences = snapshot.val();
			          			console.log(userPreferences);

			          			database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
				          		{
				          			preferences: userPreferences
				          		});
				          		console.log(user.uid + " in queue for " + activity);
			          		});
			          		
			          		resolve(null);
			          	}
		       	 	}); 
		    	}
	  		});
	  	});
	  	return matchedUser;
	},

	leaveQueue: function(activity)
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
	},

	modifyProfilePicture: function(picture_link)
	{
		var user = firebase.auth().currentUser;

		user.updateProfile({
			photoURL: picture_link
		});
	},

	modifyUsername: function(user_name)
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
	},

	setPreferencesForActivity: function(activity, preferencesList)
	{
		database.ref("Activities/"+activity+"/StaticPreferences").update(preferencesList);
	},

	getPreferencesList: function(activity)
	{
		var preferencesListPromise = new Promise(function(resolve, reject)
		{
	  		database.ref('Activities/'+activity+'/StaticPreferences').once('value').then(function(snapshot)
	  		{
	  			var preferences = snapshot.val();
	   			resolve(preferences);
	  		});
	  	});
	  
	  	return preferencesListPromise;
	},

	setPreferencesForUser: function(activity, preference)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('users/'+ user.uid + '/Preferences/' + activity).update(preference);
			}
		});
	}
}


