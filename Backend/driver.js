var backend = require('./backend1');

//testing@purdue.edu - testing
//jradocho@purdue.edu - password
backend.signIn("jradocho@purdue.edu", "password");

/*backend.getPreferencesList("Eat").then(function(list){
	console.log(list);
});*/

//backend.enterQueue("Eat");

//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "This is the sixth message in this conversation.");

/*backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03").then(function(value){
	console.log(value);
});*/

var preferencesList = 
{
	"Location":["Wiley", "Ford", "Earhart", "Hillenbrand", "Windsor"],
	"Preferred Match Gender":["No Preference", "Male", "Female"]
};
backend.setPreferencesForActivity("Eat", preferencesList);

/*var userPreferenceList =
{
	"Location":"Earhart",
	"Preferred Match Gender":"Male"
}
backend.setPreferencesForUser("Eat", userPreferenceList);*/


/*backend.listenToConversation("fjRhMBaMjGSNf1szze23rGg1fts1").then(function(value){
	console.log(value);
});*/
