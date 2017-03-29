var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("testing@purdue.edu", "testing");

/*backend.getPreferencesList("Eat").then(function(list){
	console.log(list);
});*/

/*var userPreferenceList =
{
	"Location":"No Preference",
	"Preferred Match Gender":"Male"
}
backend.setPreferencesForUser("Eat", userPreferenceList);*/

backend.enterQueue("Eat");

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

/*var preferencesList = 
{
	"Work Out Type":["No Preference", "Upper Body", "Lower Body", "Cardio"],
	"Preferred Match Gender":["No Preference", "Male", "Female"]
};
backend.setPreferencesForActivity("Work Out", preferencesList);*/

/*
var userPreferenceList =
{
	"Location":"No Preference",
	"Preferred Match Gender":"Male"
}
backend.setPreferencesForUser("Eat", userPreferenceList);
*/

//backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.modifyUsername("joshradochonski");

