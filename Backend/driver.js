var backend = require('./backend1');

//testing@purdue.edu - testing - fjRhMBaMjGSNf1szze23rGg1fts1
//jradocho@purdue.edu - password - U1PMF6lJBzereWItzrxnQbCrIH03
backend.signIn("testing@purdue.edu", "testing");

/*backend.getPreferencesList("Eat").then(function(list){
	console.log(list);
});*/

//backend.enterQueue("Eat");

//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "Newer Test Message");

/*backend.viewConversation("U1PMF6lJBzereWItzrxnQbCrIH03").then(function(value){
	console.log(value);
});*/

/*var preferencesList = 
{
	"Location":["Wiley", "Ford", "Earhart", "Hillenbrand", "Windsor"],
	"Preferred Match Gender":["No Preference", "Male", "Female"]
};
backend.setPreferencesForActivity("Eat", preferencesList);*/

/*var userPreferenceList =
{
	"Location":"Earhart",
	"Preferred Match Gender":"Male"
}
backend.setPreferencesForUser("Eat", userPreferenceList);*/


/*backend.listenToConversation("fjRhMBaMjGSNf1szze23rGg1fts1").then(function(value){
	console.log(value);
});*/
