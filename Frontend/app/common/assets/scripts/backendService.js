angular.module('common')
.service("backendService", function(supersonic) {
	(function(){
    // some code…
    var config = {
    	apiKey: "AIzaSyB9-bQjCSShbkJuiDeWtyOurzFqTnr7pFU",
    	authDomain: "friendr-be400.firebaseapp.com",
    	databaseURL: "https://friendr-be400.firebaseio.com",
    	storageBucket: "friendr-be400.appspot.com",
    	messagingSenderId: "852808235414"
    };

    firebase.initializeApp(config);
})();


var database = firebase.database();
var user;

var addAuthUser = function(email, password, firstName, lastName, username, gender)
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
};

var deleteUser=  function() {
	if (user == null) {
		getCurrentUser();
	}

	var email = user.email;
	user.delete().then(function() {
		console.log(email + " deleted");
	}, function(error) {
		console.log("No account deleted");
	});
};

var signIn= function(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		console.log("Sign in unsuccessful");
	});
	console.log("Signed into " + email + " successfully");
};

var getCurrentUser= function() {
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
};

var signOut= function() {
	firebase.auth().signOut().then(function() {
			// signout Successful
		}, function (error) {
			// error
		});
};

var resetPassword= function(newPassword) {
	var user = firebase.auth().currentUser;
	user.updatePassword(newPassword).then(function() {
			//success
		}, function (error) {
			//error
		});
};

var sendPasswordResetEmail=function(email) {
	firebase.auth().sendPasswordResetEmail(email).then(function() {
			// email sent
			console.log("email sent to " + email);
		}, function (error) {
			//error
			console.log("Email not sent");
		});
};

var sendEmailVerification= function() {
	user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
		console.log("Email sent to " + user.email);
	}, function(error) {
		console.log("Email not sent - From sendEmailVerification()");
	});
};

var printCurrentUserData= function() {
	var user = firebase.auth().currentUser;
	if (user != null) {
		console.log(user.email);
		console.log(user.uid);
			//console.log(user.P)
		}
		else {
			console.log("No user signed in");
		}
	};

	var initiateConversation= function(other_uid)
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
	};


	var sendMessage= function(other_uid, message)
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
	};

	var viewConversationList= function()
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
						var list = [];
						snapshot.forEach(function(childSnapshot)
						{
							var childData = childSnapshot.val();
							list.push(childData);
						});

						resolve(list);
					});
				}
			});
		});
		return messageListPromise;
	};
	var viewConversation= function(other_uid)
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
								var message = childSnapshot.val().Message;
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
								var message = childSnapshot.val().Message;
								list.push(message);
							});
							resolve(list);
						}
					});

				}
			});
		});
		return messageList;
	};


	var listenToConversation= function(other_uid)
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
	};

	var addActivity= function(activity)
	{
		database.ref('Activities/'+activity).set(
		{
			activity: activity
		});
	};

	var getActivityList= function() {
		
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
	};

	var enterQueue= function(activity, preferences) {
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

			          				var myUserPreferences = preferences;
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

			          					console.log("Match found, both users in Pending " + matchUID);
			          					database.ref('Activities/' + activity + '/Searching/' + matchUID).remove();
			          					
			          					//Instead of starting the match right away, both users get a new field called Pending.
			          					// in this, they respond yes or no then when both say yes, create the match
			          					// if either say no, remove pending from both, delete match.

			          					database.ref('Users/' + user.uid + '/Pending/' + matchUID).update({
			          						Response: "pending",
			          						Activity: activity
			          					});
			          					database.ref('Users/' + matchUID + '/Pending/' + user.uid).update({
			          						Response: "pending",
			          						Activity: activity
			          					});
			          					resolve(null);
			          				}
			          			});

								if (!matchFound)
								{
			          				//match not found, insert into queue
			          				console.log("No Match Found");
			          				var userPreferences = preferences;
			          				var gender = snapshot2.val().Profile['Gender'];

			          				database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
			          				{
			          					Preferences: userPreferences,
			          					Gender: gender
			          				});
			          				var date = new Date();

			          				database.ref('Users/' + user.uid + '/Queue_List/' + activity).set({
			          					TimeQueued: date.toTimeString(),
			          					DateQueued: date.toDateString(),
			          					Preferences: preferences
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
		          				var userPreferences = preferences;
		          				var gender = snapshot.val().Profile['Gender'];
		          				console.log(userPreferences);

		          				database.ref('Activities/'+ activity + '/Searching/' + user.uid).update(
		          				{
		          					Preferences: userPreferences,
		          					Gender: gender
		          				});

		          				var date = new Date();

		          				database.ref('Users/' + user.uid + '/Queue_List/' + activity).set({
		          					TimeQueued: date.toTimeString(),
		          					DateQueued: date.toDateString(),
		          					Preferences: preferences
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
};

var leaveQueue= function(activity)
{

	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			database.ref('Activities/' + activity + '/Searching/' + user.uid).remove();
			database.ref('Users/' + user.uid + '/Queue_List/' + activity).remove();
		}
	});
};

var respondToPending = function(other_uid,answer) {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			if (answer.toLowerCase() == "no") {
				database.ref('Users/' + user.uid).once('value').then(function(snapshot)
				{
					if (snapshot.child("Pending").exists() && snapshot.child("Pending").child(other_uid).exists()) {
							// removing pending immediately, maybe turn to no instead
							/*database.ref('Users/' + user.uid + '/Pending/' + other_uid).update({
								Response: "no"
							});
							*/

							database.ref('Users/' + user.uid + '/Pending/' + other_uid).remove();
							database.ref('Users/' + other_uid + '/Pending/' + user.uid).remove();
							console.log("Pending closed");
						}
						else {
							console.log("Pending already removed");
						}
					});
			}
			if (answer.toLowerCase() == "yes") {
				database.ref('Users/' + user.uid).once('value').then(function(snapshot)
				{
					if (snapshot.child("Pending").exists() && snapshot.child("Pending").child(other_uid).exists()) {

							// only if my pending of the other user exists then i look to the other user's pending of me
							database.ref('Users/' + other_uid + '/Pending/' + user.uid).once('value').then(function(snapshot2) {
								var response = snapshot2.child("Response").val();
								console.log("Other user's response = " + response);
								if (response.toLowerCase() == "yes") { // both responded yes

									var date = new Date();
									var activity = snapshot2.child("Activity").val();

									database.ref('Users/' + user.uid + '/Match_List/' + other_uid).update({
										TimeMatched: date.toTimeString(),
										DateMatched: date.toDateString(),
										MatchedActivity: activity
									});

									database.ref('Users/' + other_uid + '/Match_List/' + user.uid).update({
										TimeMatched: date.toTimeString(),
										DateMatched: date.toDateString(),
										MatchedActivity: activity
									});
									console.log("Users Matched: " + other_uid+ " " + user.uid);

									database.ref('Users/' + user.uid + '/Pending/' + other_uid).remove();
									database.ref('Users/' + other_uid + '/Pending/' + user.uid).remove();

									database.ref('Users/' + user.uid + '/Queue_List/' + activity).remove();
									database.ref('Users/' + other_uid + '/Queue_List/' + activity).remove();
								}
								else { // other guy hasnt responded yet
									database.ref('Users/' + user.uid + '/Pending/' + other_uid).update({
										Response: "yes"
									});
								}
							});
						}// if this is false then the other guy said no
						else {
							console.log("Pending not found, The other guy probably said no");
						}
					});
			}
		}
	});
}

var checkPendingStatus = function(other_uid) {
	var pendingStatus = new Promise(function(resolve, reject)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + other_uid + '/Pending/' + user.uid).once('value').then(function(snapshot)
				{
					var status = snapshot.child("Response").val();
					console.log(status);
					resolve(status);
				});
			}
		});
	});

	return pendingStatus;
}

var modifyProfilePicture = function(picture_link) {
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
}

var modifyAboutMe = function(description) {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			database.ref('Users/' + user.uid + '/Profile').update({
				AboutMe: description
			});
		}
	});
}

var modifyUsername = function(user_name) {
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
}

var setPreferencesForActivity = function(activity, preferenceList) {
	database.ref("Activities/" + activity + "/StaticPreferences").update(preferencesList);
}

var getPreferenceList = function(activity) {

	var preferencesListPromise = new Promise(function(resolve, reject)
	{
		database.ref('Activities/' + activity + '/StaticPreferences').once('value').then(function(snapshot)
		{
			var preferences = snapshot.val();
			resolve(preferences);
		});
	});

	return preferencesListPromise;
}

var setPreferencesForUser = function(activity, preference) {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			database.ref('Users/'+ user.uid + '/Preferences/' + activity).update(preference);
		}
	});
}

var getMatchList = function() {
	var match_listPromise = new Promise(function (resolve, reject)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + user.uid + '/Match_List').once('value').then(function(snapshot)
				{
					var match_list = [];
					snapshot.forEach(function(childSnapshot)
					{
						var match = [];
						match.push(childSnapshot.key);
						match.push(childSnapshot.val());
						match_list.push(match);
					});
					resolve(match_list);
				});	
			}
		});
	});
	return match_listPromise;	
}

var clearConversation = function(other_uid) {
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
						database.ref('Conversations/' + conversation_id1).update({
							MessageCount: 0
						});
						database.ref('Conversations/' + conversation_id1 + '/Message_List').remove();
					}
					else
					{
						database.ref('Conversations/' + conversation_id2).update({
							MessageCount: 0
						});
						database.ref('Conversations/' + conversation_id2 + '/Message_List').remove();
					}
				});
			}
		});
}

var deleteMatch = function(other_uid) {
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

						database.ref('Users/' + user.uid + '/Match_List/' + other_uid).remove();
						database.ref('Users/' + other_uid + '/Match_List/' + user.uid).remove();
					}
					else
					{
						convoId2.remove();
						database.ref('Users/' + user.uid + '/Conversation_List/' + conversation_id2).remove();
						database.ref('Users/' + other_uid + '/Conversation_List/' + conversation_id2).remove();

						database.ref('Users/' + user.uid + '/Match_List/' + other_uid).remove();
						database.ref('Users/' + other_uid + '/Match_List/' + user.uid).remove();
					}
				});
			}
		});

}
var searchForMatch = function(srchFirstName, srchLastName) {
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
								else
								{
									resolve("None Found.")
								}
							}
							else
							{
								resolve("None Found.")
							}
						});
					});
				});
			}
		});
	});

	return matchedUser;
}
var addToFavorites = function(other_uid) {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			var other_name;

			database.ref('Users').once('value').then(function(snapshot)
			{
				if (!snapshot.child(other_uid).exists()) {
					console.log("uid not found");
				}
				else {

					database.ref('Users/'+ other_uid + '/Profile').once('value').then(function(snapshot)
					{
						firstName = snapshot.child("FirstName").val();
						lastName = snapshot.child("LastName").val();

						database.ref('Users/' + user.uid + '/Favorites/' + other_uid).update({
							FirstName: firstName,
							LastName: lastName
						});
					});
				}
			});
		}
	});
}

var getFavoritesList = function() {
	var listPromise = new Promise(function (resolve, reject)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + user.uid + '/Favorites').once('value').then(function(snapshot)
				{
					var favorites_list = [];
					snapshot.forEach(function(childSnapshot)
					{
						var favorite = [];
						favorite.push(childSnapshot.key);
						favorite.push(childSnapshot.val());
						favorites_list.push(favorite);
					});
					resolve(favorites_list);
				});	
			}	
		});
	});
	return listPromise;
}

var removeFromFavorites = function(other_uid) {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user) {
			database.ref('Users/' + user.uid + '/Favorites/' + other_uid).remove();
		}
	});
}

var editQueue = function(activity, newPreference) 
{
	firebase.auth().onAuthStateChanged(function(user)
	{
		if (user)
		{
			database.ref('Activities/' + activity + '/Searching/' + user.uid).once('value').then(function(snapshot)
			{
				if (snapshot.exists())
				{
					database.ref('Activities/' + activity + '/Searching/' + user.uid + '/Preferences').update(newPreference);
					database.ref('Users/'+ user.uid + '/Queue_List/' + activity + '/Preferences').update(newPreference);
				}
			});
		}
	});
}

var getQueueList = function() {
	var queueListPromise = new Promise(function(resolve, reject)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
			{
				database.ref('Users/' + user.uid + '/Queue_List/').once('value').then(function(snapshot)
				{
					resolve(snapshot.val());
				});
			}
		});
	});

	return queueListPromise;
}


return {
	modifyUsername: modifyUsername,
	setPreferencesForActivity: setPreferencesForActivity,
	getPreferenceList: getPreferenceList,
	setPreferencesForUser: setPreferencesForUser,
	modifyProfilePicture: modifyProfilePicture,
	addAuthUser:addAuthUser,
	deleteUser:deleteUser,
	signIn:signIn,
	getCurrentUser:getCurrentUser,
	signOut:signOut,
	resetPassword:resetPassword,
	sendPasswordResetEmail:sendPasswordResetEmail,
	sendEmailVerification:sendEmailVerification,
	printCurrentUserData:printCurrentUserData,
	initiateConversation:initiateConversation,
	sendMessage:sendMessage,
	viewConversation:viewConversation,
	viewConversationList:viewConversationList,
	listenToConversation:listenToConversation,
	addActivity:addActivity,
	getActivityList:getActivityList,
	enterQueue:enterQueue,
	leaveQueue:leaveQueue,
	respondToPending: respondToPending,
	checkPendingStatus: checkPendingStatus,
	modifyAboutMe: modifyAboutMe,
	getMatchList: getMatchList,
	clearConversation: clearConversation,
	deleteMatch: deleteMatch,
	searchForMatch: searchForMatch,
	addToFavorites: addToFavorites,
	getFavoritesList: getFavoritesList,
	removeFromFavorites: removeFromFavorites,
	editQueue: editQueue,
	getQueueList: getQueueList
}
})
