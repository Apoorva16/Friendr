var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("testing@purdue.edu", "testing");
//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is a new message.");
//console.log(backend.getActivityList());

//backend.viewConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
//backend.modifyUsername("joshrado");
//backend.setPreferencesForUser("Eat", "Dining Court");
//backend.enterQueue("Eat");