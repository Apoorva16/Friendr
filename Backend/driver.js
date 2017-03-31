var backend = require('./backend1');

//testing@purdue.edu - testing - fjRhMBaMjGSNf1szze23rGg1fts1
//jradocho@purdue.edu - password - U1PMF6lJBzereWItzrxnQbCrIH03
backend.signIn("testing@purdue.edu", "testing");

//backend.enterQueue("Eat");
//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "Newer Test Message");


//reseting static preferences
/*var preferencesList = 
{
	"Location":["Wiley", "Ford", "Earhart", "Hillenbrand", "Windsor"],
	"Preferred Match Gender":["No Preference", "Male", "Female"]
};
backend.setPreferencesForActivity("Eat", preferencesList);

var preferencesList = 
{
	"Subject":["Computer Science", "Math", "Statistics", "Physics"],
	"Preferred Match Gender":["No Preference", "Male", "Female"],
	"Location":["Hicks", "Lawson", "Stewart"]
};
backend.setPreferencesForActivity("Study", preferencesList);

var preferencesList = 
{
	"Work Out Type":["Shoulders", "Biceps", "Triceps", "Legs", "Abs", "Chest", "Back"],
	"Preferred Match Gender":["No Preference", "Male", "Female"]
};
backend.setPreferencesForActivity("Work Out", preferencesList);*/
