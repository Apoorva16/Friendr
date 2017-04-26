angular.module('home', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

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
