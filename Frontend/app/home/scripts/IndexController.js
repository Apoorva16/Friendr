angular
.module('home')
.controller('IndexController', function($scope, supersonic, backendService) {
    // Controller functionality here
    $scope.position = undefined;

    $scope.getPosition = function() {
    	supersonic.device.geolocation.getPosition().then( function(position){
    		$scope.position = position;
    	});
    };

    $scope.activities = ['Eat', 'Study', 'Work Out'];

    $scope.test = function(){
        var i = backendService.test(); 
        supersonic.logger.log(i);

    }

    $scope.queue = function(activity) {
        backendService.enterQueue(activity);
        // firebase.auth().onAuthStateChanged(function(user)
        // {
        //     if (user)
        //     { // User is signed in.
        //         supersonic.logger.log("matching");
        //         supersonic.logger.log(activity);
        //         firebase.database().ref('Activities/'+ activity).once('value').then(function(snapshot)
        //         {
        //             if (snapshot.child("Searching").exists())
        //             {
        //                 // get matched with this user
        //                 var other_uid = snapshot.child("Searching").val();
        //                 console.log(user.uid + " matched with user " + other_uid)
        //                 firebase.database().ref('Activities/' + activity).set(
        //                 {
        //                     activity: activity
        //                 });
        //                 var conversation_id = user.uid + ' ' + other_uid;

        //                 firebase.database().ref('users/' + other_uid).once('value').then(function(snapshot)
        //                 {
        //                     firebase.database().ref('users/' + user.uid).child("conversation_list").child(conversation_id).set(
        //                     {
        //                         other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
        //                     });
        //                 });

        //                 firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot)
        //                 {
        //                     firebase.database().ref('users/' + other_uid).child("conversation_list").child(conversation_id).set(
        //                     {
        //                         other_user: snapshot.val().firstName + ' ' + snapshot.val().lastName
        //                     });
        //                 });

        //                 firebase.database().ref('conversations').child(conversation_id).set(
        //                 {
        //                     User1: user.uid,
        //                     User2: other_uid,
        //                     MessageCount: 0,
        //                 });
        //             }   
        //             else if(snapshot.exists())
        //             {
        //                 supersonic.logger.log(activity + "test 2");
        //                 firebase.database().ref('Activities/'+ activity).set(
        //                 {
        //                     activity: activity,
        //                     Searching: user.uid
        //                 });
        //                 console.log(user.uid + " in queue for "+ activity);
        //                 return null;
        //             }
        //         }); 
        //     }

        //     supersonic.logger.log("user doesnt exists");
        // });

    }

    drawerBtn = new supersonic.ui.NavigationBarButton({
    	onTap: function() {
    		supersonic.ui.drawers.open();
    	},
    	styleId: "nav-drawer"
    });

    supersonic.ui.navigationBar.update({
    	title: "Friendr",
    	overrideBackButton: false,
    	buttons: {
    		left: [drawerBtn]
    	}
    }).then(supersonic.ui.navigationBar.show());
});
