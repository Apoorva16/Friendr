var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("testing@purdue.edu", "testing");
<<<<<<< HEAD
//backend.signIn("xiab@purdue.edu", "password");

//backend.addAuthUser("xiab@purdue.edu", "password", "Eric", "Tao", "EX1990");
//backend.initiateConversation("9A4qaTgVs6gYu49X228WA6Ui20F3");
//backend.sendMessage("9A4qaTgVs6gYu49X228WA6Ui20F3", "This is the third message in this conversation.");
//console.log(backend.getActivityList());

backend.viewConversation("9A4qaTgVs6gYu49X228WA6Ui20F3").then(function(values)
{
	var i;
	for (i = 0; i < values.length; i ++)
	{
		console.log(values[i].message);
	}
	
});


backend.getActivityList().then(function(values) {
	console.log(values);
});


var other_uid;
backend.enterQueue("Study").then(function(values) {
	if (values != null) {
		backend.initiateConversation (values);
	}


	console.log(values);
	//other_uid = values;
});

//backend.addAuthUser()
//backend.sendMessage("diZfoNdEaSZFOo011aLi4XiVWS92", "HELLO");
	




//console.log(other_uid);


=======
//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the sixth message in this conversation.");
//console.log(backend.getActivityList());

//backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.modifyUsername("joshradochonski");
>>>>>>> master
