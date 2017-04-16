angular.module('home', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
    .module('home')
    .controller('ActivitiesController', function($scope, supersonic) {


        $scope.recent = function () {

            // supersonic.ui.dialog.alert("Signup working Yo");
            var modalView = new supersonic.ui.View("home#activites");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };
    });

// (function(){
//     // some code…
//     var config = {
//         apiKey: "AIzaSyB9-bQjCSShbkJuiDeWtyOurzFqTnr7pFU",
//         authDomain: "friendr-be400.firebaseapp.com",
//         databaseURL: "https://friendr-be400.firebaseio.com",
//         storageBucket: "friendr-be400.appspot.com",
//         messagingSenderId: "852808235414"
//     };

//     firebase.initializeApp(config);
// })();


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
        
       backendService.enterQueue(activity).then(function(id) {
            if(id == null) {
                alert("Placed in Queue");
            } else {
                backendService.initiateConversation(id);
                alert("You're Matched!");
            }
       });

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

/**
 * Created by apoorvaparmar on 4/16/17.
 */
/**
 * Created by apoorvaparmar on 1/14/17.
 */
angular
    .module('home')
    .controller('RecentActivities', function($scope, supersonic) {


        $scope.close = function() {
            supersonic.ui.modal.hide();

        };

    });