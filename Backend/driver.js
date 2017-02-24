var backend = require('./backend1');


backend.signIn("jradocho@purdue.edu", "password");
//backend.addAuthUser("jradocho@purdue.edu", "password", "Josh", "Rado", "");
//backend.initiateConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
backend.sendMessage("fjRhMBaMjGSNf1szze23rGg1fts1", "This is the first message in this conversation.");
//console.log(backend.getActivityList());

/*
backend.viewConversationList().then(function(values)
{
	console.log(values);
	
});
*/