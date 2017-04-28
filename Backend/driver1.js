var backend = require('./backend1');

//testing@purdue.edu - testing - ncH0z3R75LTV9ZptUtWjTkQyZIi2
//jradocho@purdue.edu - password - M8Ca19FlM1cIyYkYIjrfMiOI8vO2
//user1 = 8VMQ2SqhwTc4luRtYuuo9A0OCea2
//user2 = g9NRtQ27MeMulGfRm2QBNBwB6ME3
//user3 = Q1K19YJgkfTYTIWs2CJbik8W5f02
backend.signIn("user1@purdue.edu", "password");

//backend.addAuthUser("user3@purdue.edu", "password", "User", "Three", "user3", "Male");

//backend.initiateConversation("Q1K19YJgkfTYTIWs2CJbik8W5f02");
//backend.sendMessage("M8Ca19FlM1cIyYkYIjrfMiOI8vO2", "New Test Message");
//backend.listenForPending();
//backend.respondToPending("ncH0z3R75LTV9ZptUtWjTkQyZIi2", "yes");
//backend.clearConversation("M8Ca19FlM1cIyYkYIjrfMiOI8vO2");
//backend.deleteMatch("M8Ca19FlM1cIyYkYIjrfMiOI8vO2");
//backend.addToFavorites("8VMQ2SqhwTc4luRtYuuo9A0OCea2");
//backend.removeFromFavorites("M8Ca19FlM1cIyYkYIjrfMiOI8vO2");

backend.enterQueue("Eat", {"Location":"Earhart", "Gender":"Female"});
//backend.editQueue("Eat", {"Location":"Earhart", "Gender":"Male"});
/*backend.getQueueList().then(function(value)
{
	console.log(value);
});*/
//backend.leaveQueue("Eat");

/*backend.getActivityList().then(function(value)
{
	console.log(value);
});*/

/*backend.searchForMatch("Josh Rado").then(function(value)
{
	console.log("Search Found:");
	console.log(value);
});*/

/*backend.viewConversationList().then(function(value)
{
	console.log(value);
});*/

/*backend.viewConversation("M8Ca19FlM1cIyYkYIjrfMiOI8vO2").then(function(value)
{
	console.log(value);
});*/

/*backend.listenToConversation("M8Ca19FlM1cIyYkYIjrfMiOI8vO2");*/

/*backend.getMatchList().then(function(value)
{
	console.log(value);
});*/

/*backend.getFavoritesList().then(function(value)
{
	value.forEach(function(match)
	{
		console.log(match[0]);
		console.log(match[1]);
	});
});*/

/*backend.getMyProfile().then(function(value)
{
	console.log(value);
});*/

/*backend.getOtherProfile("g9NRtQ27MeMulGfRm2QBNBwB6ME3").then(function(value)
{
	console.log(value);
});*/