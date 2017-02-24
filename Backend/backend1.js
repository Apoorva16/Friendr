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
				
			}
			
			database.ref('conversations').child(conversation_id).set(
			{
				User1: user.uid,
				User2: other_uid,
				MessageCount: 0,
			});
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

				var conversation_id;
				if (convoId1 != null)
					conversation_id = conversation_id1;
				else
					conversation_id = conversation_id2;

				//add message to database
				database.ref('conversations').child(conversation_id).once('value').then(function(snapshot)
				{
					var messageCount = snapshot.val().MessageCount;
					var nextMessageId = messageCount + 1;
					var date = new Date();
				
					database.ref('conversations').child(conversation_id).child('message_list').child(nextMessageId).set(
					{
						message: message,
						sender: user.uid,
						date: date.toDateString(),
						time: date.toTimeString()
					});	

					database.ref('conversations').child(conversation_id).update(
					{
						MessageCount: messageCount+1
					});
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
		var messageListPromise = new Promise(function(resolve, reject)
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

					var conversation_id;
					if (convoId1 != null)
						conversation_id = conversation_id1;
					else
						conversation_id = conversation_id2;

					//get message list
					database.ref('conversations').child(conversation_id).child('message_list').once('value').then(function(snapshot)
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
  		database.ref('Activities/').once('value').then(function(snapshot)
  		{
   			snapshot.forEach(function(childSnapshot) {
      			list.push(childSnapshot.key);
    		});
    		console.log(list.toString());
    		return list; //u
  		});
	},

	enterQueue: function(activity) {
		firebase.auth().onAuthStateChanged(function(user)
		{
	    	if (user)
	    	{ // User is signed in.
	       		console.log("matching");
	     	   	database.ref('Activities/'+ activity).once('value').then(function(snapshot)
	        	{
	          		if (snapshot.child("Searching").exists())
	          		{
			            // get matched with this user
			            var other_uid = snapshot.child("Searching").val();
			            console.log(user.uid + " matched with user " + other_uid)
			            database.ref('Activities/' + activity).set(
			            {
			                activity: activity
	           	 		});
	            		return other_uid;
	          		}	
		          	else if(snapshot.exists())
		          	{
		          		database.ref('Activities/'+ activity).set(
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
			            	database.ref('Activities/' + activity).set(
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
	}
}