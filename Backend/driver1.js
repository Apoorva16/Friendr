var backend = require('./backend1');

//testing@purdue.edu - testing - QPcfMZziKuhPqapjh1j9fOX0X2d2
//jradocho@purdue.edu - password - M8Ca19FlM1cIyYkYIjrfMiOI8vO2
backend.signIn("testing@purdue.edu", "testing");

//backend.addAuthUser("jradocho@purdue.edu", "password", "Josh", "Rado", "joshrado", "Male");

//backend.setPreferencesForUser("Eat", {"Location":"Earhart", "Gender":"Male"});
//backend.enterQueue("Eat");
//backend.initiateConversation("qmve6W2IsQenoh8Ndb8l3mav4ZG2");
//backend.sendMessage("qmve6W2IsQenoh8Ndb8l3mav4ZG2", "New Test Message");
//console.log(backend.getActivityList());

//backend.viewConversation("qmve6W2IsQenoh8Ndb8l3mav4ZG2");
//backend.modifyUsername("joshrado");

backend.searchForMatch("Josh", "Rado").then(function(value)
{
	console.log("Search Found:");
	console.log(value);
});