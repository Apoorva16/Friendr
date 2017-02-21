var backend = require('./backend1');


backend.signIn("testing@purdue.edu", "testing");
//backend.addAuthUser("testing@purdue.edu", "testing", "Test", "Tester", "imatester");
//backend.initiateConversation("9A4qaTgVs6gYu49X228WA6Ui20F3");
backend.sendMessage("9A4qaTgVs6gYu49X228WA6Ui20F3", "This is a test.");