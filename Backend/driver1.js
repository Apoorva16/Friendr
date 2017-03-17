var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("jradocho@purdue.edu", "password");
//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
//backend.sendMessage("fjRhMBaMjGSNf1szze23rGg1fts1", "This is the fourth message in this conversation.");
//console.log(backend.getActivityList());

backend.viewConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
//backend.modifyUsername("joshrado");