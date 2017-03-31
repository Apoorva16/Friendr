var backend = require('./backend1');

//testing@purdue.edu - testing - fjRhMBaMjGSNf1szze23rGg1fts1
//jradocho@purdue.edu - password - U1PMF6lJBzereWItzrxnQbCrIH03
backend.signIn("jradocho@purdue.edu", "password");
//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
//backend.sendMessage("fjRhMBaMjGSNf1szze23rGg1fts1", "New Test Message");
//console.log(backend.getActivityList());

//backend.viewConversation("fjRhMBaMjGSNf1szze23rGg1fts1");
//backend.modifyUsername("joshrado");
//backend.setPreferencesForUser("Eat", "Dining Court");
backend.enterQueue("Eat");

//backend.listenToConversation("fjRhMBaMjGSNf1szze23rGg1fts1");