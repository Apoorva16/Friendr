var backend = require('./backend1');

var email = "brandonxia01@gmail.com";
var password = "password";
var username = "brandonxia01";
var firstname = "brandon";
var lastname = "xia";
var gender = "Male";
//backend.addAuthUser(email, password, firstname, lastname, username, gender);



//testing@purdue.edu - testing - fjRhMBaMjGSNf1szze23rGg1fts1
//jradocho@purdue.edu - password - U1PMF6lJBzereWItzrxnQbCrIH03
backend.signIn(email, password);
backend.addToFavorites("QPcfMZziKuhPqapjh1j9fOX0X2d2");
//backend.getFavoritesList();


//backend.enterQueue("Eat");
//backend.initiateConversation("U1PMF6lJBzereWItzrxnQbCrIH03");
//backend.sendMessage("U1PMF6lJBzereWItzrxnQbCrIH03", "Newer Test Message");


//reseting static preferences
/*var preferencesList = 
{
	"Location":["Wiley", "Ford", "Earhart", "Hillenbrand", "Windsor"],
	"Gender":["NoPref", "Male", "Female"]
};
backend.setPreferencesForActivity("Eat", preferencesList);

var preferencesList = 
{
	"Subject":["Computer Science", "Math", "Statistics", "Physics"],
	"Gender":["NoPref", "Male", "Female"],
	"Location":["Hicks", "Lawson", "Stewart"]
};
backend.setPreferencesForActivity("Study", preferencesList);

var preferencesList = 
{
	"Work Out Type":["Shoulders", "Biceps", "Triceps", "Legs", "Abs", "Chest", "Back"],
	"Gender":["NoPref", "Male", "Female"]
};
backend.setPreferencesForActivity("Work Out", preferencesList);*/
