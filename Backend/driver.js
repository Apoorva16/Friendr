var backend = require('./backend1');


backend.signIn("jradocho@purdue.edu", "testing");
//backend.addAuthUser("jradocho@purdue.edu", "testing", "Josh", "Radochonski", "joshrado");
backend.initiateConversation("1dZ1EAuND6MRB8s4eMKJBz6IYgq2");
backend.sendMessage("1dZ1EAuND6MRB8s4eMKJBz6IYgq2", "This is a test.");