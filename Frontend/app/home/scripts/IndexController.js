angular
.module('home')
.controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
    $scope.position = undefined;

    $scope.getPosition = function() {
    	supersonic.device.geolocation.getPosition().then( function(position){
    		$scope.position = position;
    	});
    };

    $scope.activities = ['Workout', 'Leisure', 'Drinking', 'Sports'];

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
