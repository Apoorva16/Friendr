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

module.exports = 
{	
	addAuthUser: function(email, password, firstName, lastName, username, gender)
	{
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {});

		firebase.auth().onAuthStateChanged(function(user)
		{
			if(user)
			{
				database.ref('Users/' + user.uid + '/Profile').set(
				{
					FirstName: firstName,
					LastName: lastName,
					UserName: username,
					Gender: gender
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
		
				database.ref('Users/' + other_uid + '/Profile').once('value').then(function(snapshot)
				{
					database.ref('Users/' + user.uid + "/Conversation_List").child(conversation_id).set(
					{
						other_user: snapshot.val().FirstName + ' ' + snapshot.val().LastName,
						other_user_uid: other_uid
					});
				});
				
				database.ref('Users/' + user.uid + '/Profile').once('value').then(function(snapshot)
				{
					database.ref('Users/' + other_uid + "/Conversation_List").child(conversation_id).set(
					{
						other_user: snapshot.val().FirstName + ' ' + snapshot.val().LastName,
						other_user_uid: user.uid
					});
				});
				
				database.ref('Conversations/' + conversation_id).set(
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
				var convoId1 = database.ref('Conversations/' + conversation_id1);
				var convoId2 = database.ref('Conversations/' + conversation_id2);

				convoId1.once('value').then(function(snapshot)
				{
					if (snapshot.hasChildren())
					{
						console.log("Message Sent: " + message);
						var messageCount = snapshot.val().MessageCount;
						var nextMessageId = messageCount + 1;
						var date = new Date();
					
						database.ref('Conversations/' + conversation_id1 + '/Message_List').child(nextMessageId).set(
						{
							Message: message,
							Sender: user.uid,
							Date: date.toDateString(),
							Time: date.toTimeString()
						});	

						database.ref('Conversations').child(conversation_id1).update(
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
					
						database.ref('Conversations/' + conversation_id2 + '/Message_List/' + nextMessageId).set(
						{
							Message: message,
							Sender: user.uid,
							Date: date.toDateString(),
							Time: date.toTimeString()
						});	

						database.ref('Conversations/' + conversation_id2).update(
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
					database.ref('Users/' + user.uid + '/Conversation_List').once('value').then(function(snapshot)
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
					var convoId1 = database.ref('Conversations/' + conversation_id1);
					var convoId2 = database.ref('Conversations/' + conversation_id2);

					convoId1.child('Message_List').once('value').then(function(snapshot)
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

					convoId2.child('Message_List').once('value').then(function(snapshot)
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
					var convoId1 = database.ref('Conversations/' + conversation_id1);
					var convoId2 = database.ref('Conversations/' + conversation_id2);

					convoId1.once('value').then(function(snapshotP)
					{
						if (snapshotP.hasChildren())
						{
							console.log("ConversationId1 is valid.");
							convoId1.child('Message_List').on('child_added', function(snapshot, prevKey)
							{
								if (snapshot.hasChildren())
								{
									//TODO: insert code to add message to conversation
									console.log(snapshot.val());
								}
							});
						}
						else
						{
							console.log("ConversationId2 is valid.");
							convoId2.child('Message_List').on('child_added', function(snapshot, prevKey)
							{
								if (snapshot.hasChildren())
								{
									//TODO: insert code to add message to conversation
									console.log(snapshot.val());
								}
							});
						}
					});
				}
			});
		});
		return incomingMessage;
	},

	addActivity: function(activity) 
	{
		database.ref('Activities/' + activity).set(
  		{ 
        	activity: activity
  		});
	},

	getActivityList: function()
	{
		var list = [];
		var activityListPromise = new Promise(function(resolve, reject)
		{
	  		database.ref('Activities/').once('value').then(function(snapshot)
	  		{
	   			snapshot.forEach(function(childSnapshot)
	   			{
	      			list.push(childSnapshot.key);
	    		});
	    		resolve(list);
	  		});
	  	});
	  	return activityListPromise;
	},

	enterQueue: function(activity)
	{
		var matchedUser = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
		    	if (user)
		    	{
		     	   	database.ref('Activities/'+ activity + '/Searching').once('value').then(function(snapshot1)
		        	{
		        		var matchFound = false;
		          		if (snapshot1.hasChildren())
		          		{
		          			database.ref('Users/' + user.uid).once('value').then(function(snapshot2)
			          		{
			          			snapshot1.forEach(function(childSnapshot1)
			          			{
									var isMatch = true;

			          				var matchUID = childSnapshot1.key;
			          				var matchPreferences = childSnapshot1.val().Preferences;
			          				var matchGender = childSnapshot1.val().Gender;
			          				console.log("other_preferences");
			          				console.log(matchPreferences);

			          				//check for searching for myself
			          				if (user.uid == matchUID)
			          				{
			          					console.log("Can't match with myself");
			          					isMatch = false;
			          					//will update queue preferences if changed recently...
			          				}

			          				var myUserPreferences = snapshot2.val().Preferences[activity];
				          			var myGender = snapshot2.val().Profile['Gender'];
			          				console.log("myUserPreferences");
			          				console.log(myUserPreferences);
			          				console.log(myGender);
			          				
			          				for (var key in myUserPreferences)
			          				{
			          					if (myUserPreferences.hasOwnProperty(key))
			          					{
			          						if (key != 'Gender')
			          						{
				          						if (myUserPreferences[key] == matchPreferences[key])
				          							console.log("Preferences Match: " + key);
				          						else
				          						{
				          							console.log("Preferences Mismatch: " + key);
				          							isMatch = false;
				          							break;
				          						}
			          						}
			          						else
			          						{
			          							if (myUserPreferences[key] != 'NoPref')
			          							{
			          								if (myUserPreferences[key] != matchGender)
			          								{
			          									console.log("Preferences Mismatch: " + key);
			          									isMatch = false;
			          									break;
			          								}
			          							}

			          							if (matchPreferences[key] != 'NoPref')
			          							{
			          								if (matchPreferences[key] != myGender)
			          								{
			          									console.log("Preferences Mismatch: " + key);
			          									isMatch = false;
			          									break;
			          								}
			          							}
			          						}
			          					}
			          				}

			          				if (isMatch)
			          				{
			          					//all preferences match, remove other user from queue
			          					matchFound = true;
			          					console.log("Match found, removing matching uid from queue " + matchUID);
			          					database.ref('Activities/' + activity + '/Searching/' + matchUID).remove();
			          					var date = new Date();

			          					database.ref('Users/' + user.uid + '/Match_List/' + matchUID).update({
			          						TimeMatched: date.toTimeString(),
			          						DateMatched: date.toDateString(),
			          						MatchedActivity: activity
			          					});

			          					database.ref('Users/' + matchUID + '/Match_List/' + user.uid).update({
			          						TimeMatched: date.toTimeString(),
			          						DateMatched: date.toDateString(),
			          						MatchedActivity: activity
			          					});

			          					resolve(matchUID);
			          				}
			          			});

			          			if (!matchFound)
			          			{
			          				//match not found, insert into queue
				          			console.log("No Match Found");
				          			var userPreferences = snapshot2.val().Preferences[activity];
				          			var gender = snapshot2.val().Gender;

				          			database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
					          		{
					          			Preferences: userPreferences,
					          			Gender: gender
					          		});
					          		console.log(user.uid + " in queue for " + activity);
				          		
				          			resolve(null);
			          			}
			          		});
		          		}
		          		else
		          		{
		          			//match not found, insert into queue
		          			console.log("No Users Searching");
		          			database.ref('Users/' + user.uid).once('value').then(function(snapshot)
			          		{
			          			var userPreferences = snapshot.val().Preferences[activity];
			          			var gender = snapshot.val().Profile['Gender'];
			          			console.log(userPreferences);

			          			database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
				          		{
				          			Preferences: userPreferences,
				          			Gender: gender
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
		    {
		        database.ref('Activities/' + activity + '/Searching/' + user.uid).remove();
		        console.log("User out of queue.");
		    }
  		});
	},

	modifyProfilePicture: function(picture_link)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + user.uid + '/Profile').update({
					 PictureLink: picture_link
				});
			}

			user.updateProfile({
				photoURL: picture_link
			});
		});
	},

	modifyAboutMe: function(description)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + user.uid + '/Profile').update({
					AboutMe: description
				});
			}
		});
	},

	modifyUsername: function(user_name)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				user.updateProfile({
					UserName: user_name
				});

				database.ref('Users/' + user.uid + '/Profile').update(
				{
					UserName: user_name
				});
			}
		});
	},

	setPreferencesForActivity: function(activity, preferencesList)
	{
		database.ref("Activities/" + activity + "/StaticPreferences").update(preferencesList);
	},

	getPreferencesList: function(activity)
	{
		var preferencesListPromise = new Promise(function(resolve, reject)
		{
	  		database.ref('Activities/' + activity + '/StaticPreferences').once('value').then(function(snapshot)
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
				database.ref('Users/'+ user.uid + '/Preferences/' + activity).update(preference);
			}
		});
	},
	
	getMatchList: function(uid) 
	{
		var match_list = [];
		var match_listPromise = new Promise(function (resolve, reject)
		{
			database.ref('Users/' + uid + '/Match_List').once('value').then(function(snapshot)
			{
				if (snapshot.exists()) {
					snapshot.forEach(function(childSnapshot){
						var combo = [];
						combo.push(childSnapshot.key);
						combo.push(childSnapshot.val());

						match_list.push(combo);
					});
				}
				console.log(match_list);
				resolve(match_list);
			});	
		});
		return match_listPromise;		
	},

	clearConversation: function(conversation_id)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Conversations/' + conversation_id).update({
					MessageCount: 0
				});

				database.ref('Conversations/' + conversation_id + '/Message_List').remove();
			}
		});
	},

	deleteMatch: function(other_uid)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				var conversation_id1 = user.uid + ' ' + other_uid;
				var conversation_id2 = other_uid + ' ' + user.uid;

				//determine which conversation_id is correct
				var convoId1 = database.ref('Conversations/' + conversation_id1);
				var convoId2 = database.ref('Conversations/' + conversation_id2);

				convoId1.once('value').then(function(snapshotP)
				{
					if (snapshotP.hasChildren())
					{
						convoId1.remove();
						database.ref('Users/' + user.uid + '/Conversation_List/' + conversation_id1).remove();
						database.ref('Users/' + other_uid + '/Conversation_List/' + conversation_id1).remove();
					}
					else
					{
						convoId2.remove();
						database.ref('Users/' + user.uid + '/Conversation_List/' + conversation_id2).remove();
						database.ref('Users/' + other_uid + '/Conversation_List/' + conversation_id2).remove();
					}
				});
			}
		});
	},

	searchForMatch: function(srchFirstName, srchLastName)
	{
		var matchedUser = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
				if (user)
				{
					database.ref('Users/' + user.uid + '/Match_List').once('value').then(function(snapshot)
					{
						snapshot.forEach(function(childSnapshot)
						{
							var other_uid = childSnapshot.key;
							database.ref('Users/' + other_uid + '/Profile').once('value').then(function(snapshot1)
							{
								var other_user = snapshot1.val();
								if (srchFirstName == other_user.FirstName)
								{
									if (srchLastName == other_user.LastName)
									{
										resolve(other_user);
									}
								}
							});
						});
					});
				}
			});
		});

		return matchedUser;
	},

	addToFavorites: function (other_uid) 
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/'+user.uid).once('value').then(function(snapshot)
				{
					if (snapshot.child("Favorites").exists())
					{
						var length = snapshot.child("length").val();
						length++;
						database.ref('Users/' +user.uid + '/Favorites').update({
							length: length,
							[length]: other_uid
						});
					}
					else {
						database.ref("Users/" +user.uid + "/Favorites").set({
							length: 1,
							1:other_uid
						});
					}
				});
			}
		});
	},

	getFavoritesList: function() 
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user) {
				var favorites_list = [];
				var favorites_listPromise = new Promise(function (resolve, reject)
				{
					database.ref('Users/' + user.uid + '/Favorites').once('value').then(function(snapshot)
					{ 
						if (snapshot.exists()) 
						{
							snapshot.forEach(function(childSnapshot){
								//childSnapshot.key or .val()

								favorites_list.push(childSnapshot.key);
							});
						}
						console.log(favorites_list);
						resolve(favorites_list);
					});	
				});
				return favorites_listPromise;	
			}	
		});
	
	}


}


