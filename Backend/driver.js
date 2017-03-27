var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("jradocho@purdue.edu", "password");

//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the sixth message in this conversation.");
//console.log(backend.getActivityList());

//backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.modifyUsername("joshradochonski");

//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the 10 message in this conversation.");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the 11 message in this conversation.");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the 12 message in this conversation.");
//backend.setPreferencesForActivity("Eat", ["No Preference", "Earhart", "Ford", "Wiley", "Hillenbrand", "Windsor"]);
backend.setPreferencesForUser("Eat", "Earhart");

//console.log(backend.getActivityList());

//backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.modifyUsername("joshradochonski");

