angular
.module('home')
.controller('IndexController', function($scope, supersonic, backendService, $http) {
    // Controller functionality here
    $scope.position = undefined;

    $scope.getPosition = function() {
    	supersonic.device.geolocation.getPosition().then( function(position){
    		$scope.position = position;
    	});
    };

    $scope.activities = ['Eat', 'Study', 'Work Out'];

    backendService.listenForPending().then(function(data) {
        var activityName = data.Activity;
        var otherUserID = data.OtherUID;
        backendService.getOtherProfile(otherUserID).then(function(userData) {
            var profile = userData;
            var options = {
                message: activityName + "\nName: " + profile.FirstName + " " + profile.LastName,
                buttonLabels: ["Accept", "Reject"]
            };
            supersonic.ui.dialog.confirm("A Match was Found!", options).then(function(index) {
                if (index == 0) {
                    backendService.respondToPending(otherUserID, "yes");
                } else {
                    backendService.respondToPending(otherUserID, "no");
                }
            });
        });
    });
    
    $scope.queue = function(activity) {
        backendService.getPreferenceList(activity).then(function(data) {
            window.localStorage.setItem('preferences',JSON.stringify(data));
        });
        var view = new supersonic.ui.View("example#queueSettings");
        window.localStorage.setItem('activity',JSON.stringify(activity));
        supersonic.ui.layers.push(view);
    };


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
