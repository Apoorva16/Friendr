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

var addAuthUser = function(email, password, firstName, lastName, username)
{
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {});

	firebase.auth().onAuthStateChanged(function(currentUser)
	{
		if(currentUser)
		{
			firebase.database().ref('users/' + currentUser.uid).set(
			{
				firstName: firstName,
				lastName: lastName,
				username: username
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
		return;
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

				firebase.database().ref('users/' + other_uid).once('value').then(function(snapshot)
				{
					firebase.database().ref('users/' + user.uid).child("conversation_list").child(conversation_id).set(
					{
						other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
					});
				});

				firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot)
				{
					firebase.database().ref('users/' + other_uid).child("conversation_list").child(conversation_id).set(
					{
						other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
					});
				});

			}

			firebase.database().ref('conversations').child(conversation_id).set(
			{
				User1: user.uid,
				User2: other_uid,
				MessageCount: 0,
			});
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
				var convoId1 = firebase.database().ref('conversations').child(conversation_id1);
				var convoId2 = firebase.database().ref('conversations').child(conversation_id2);

				var conversation_id;
				if (convoId1 != null)
					conversation_id = conversation_id1;
				else
					conversation_id = conversation_id2;

				//add message to database
				firebase.database().ref('conversations').child(conversation_id).once('value').then(function(snapshot)
				{
					var messageCount = snapshot.val().MessageCount;
					var nextMessageId = messageCount + 1;
					var date = new Date();

					firebase.database().ref('conversations').child(conversation_id).child('message_list').child(nextMessageId).set(
					{
						message: message,
						sender: user.uid,
						date: date.toDateString(),
						time: date.toTimeString()
					});	

					firebase.database().ref('conversations').child(conversation_id).update(
					{
						MessageCount: messageCount+1
					});
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
					database.ref('users').child(user.uid).child('conversation_list').once('value').then(function(snapshot)
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
		var messageListPromise = new Promise(function(resolve, reject)
		{
			firebase.auth().onAuthStateChanged(function(user)
			{
				if (user)
				{
					var conversation_id1 = user.uid + ' ' + other_uid;
					var conversation_id2 = other_uid + ' ' + user.uid;

					//determine which conversation_id is correct
					var convoId1 = firebase.database().ref('conversations').child(conversation_id1);
					var convoId2 = firebase.database().ref('conversations').child(conversation_id2);

					var conversation_id;
					if (convoId1 != null)
						conversation_id = conversation_id1;
					else
						conversation_id = conversation_id2;

					//get message list
					firebase.database().ref('conversations').child(conversation_id).child('message_list').once('value').then(function(snapshot)
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


	var addActivity= function(activity) 
	{
		firebase.database().ref('Activities/'+activity).set(
		{ 
			activity: activity
		});
	};

	var getActivityList= function() {
		var list = [];
		firebase.database().ref('Activities/').once('value').then(function(snapshot)
		{
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.key);
			});
			console.log(list.toString());
    		return list; //u
    	});
	};

	var enterQueue= function(activity) {
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
	    	{ // User is signed in.
	    		supersonic.logger.log("matching");
	    		firebase.database().ref('Activities/'+ activity).once('value').then(function(snapshot)
	    		{
	    			if (snapshot.child("Searching").exists())
	    			{
			            // get matched with this user
			            var other_uid = snapshot.child("Searching").val();
			            console.log(user.uid + " matched with user " + other_uid)
			            firebase.database().ref('Activities/' + activity).set(
			            {
			            	activity: activity
			            });
			            var conversation_id = user.uid + ' ' + other_uid;

			            firebase.database().ref('users/' + other_uid).once('value').then(function(snapshot)
			            {
			            	firebase.database().ref('users/' + user.uid).child("conversation_list").child(conversation_id).set(
			            	{
			            		other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
			            	});
			            });

			            firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot)
			            {
			            	firebase.database().ref('users/' + other_uid).child("conversation_list").child(conversation_id).set(
			            	{
			            		other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
			            	});
			            });

			            firebase.database().ref('conversations').child(conversation_id).set(
			            {
			            	User1: user.uid,
			            	User2: other_uid,
			            	MessageCount: 0,
			            });
			        }	
			        else if(snapshot.exists())
			        {
			        	firebase.database().ref('Activities/'+ activity).set(
			        	{
			        		activity: activity,
			        		Searching: user.uid
			        	});
			        	console.log(user.uid + " in queue for "+ activity);
			        	return null;
			        }
			    }); 
	    	}
	    });
	};

	var leaveQueue= function(activity)
	{
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user)
		    { // User is signed in.
		    	firebase.database().ref('Activities/'+ activity).once('value').then(function(snapshot)
		    	{
		    		if (snapshot.child("Searching").exists())
		    		{
			            // get matched with this user
			            if (snapshot.child("Searching").val() == user.uid)
			            {
			            	firebase.database().ref('Activities/' + activity).set(
			            	{
			            		activity: activity
			            	});
			            	console.log("User out of queue");
			            }
			        }
			    }); 
		        // User is signed in.
		    }
		});
	};

	var test = function() {
		return 1;
	};



	return {
		test:test,
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
		addActivity:addActivity,
		getActivityList:getActivityList,
		enterQueue:enterQueue,
		leaveQueue:leaveQueue
	}
});
