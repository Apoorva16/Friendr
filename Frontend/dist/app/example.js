angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

/**
 * Created by apoorvaparmar on 1/14/17.
 */

angular
    .module('example')
    .controller('DrawerController', function($scope, supersonic) {

        $scope.logout = function() {


            supersonic.ui.initialView.show();
            //supersonic.ui.dialog.alert("Say hello");
        };

    });

/**
 * Created by apoorvaparmar on 1/14/17.
 */

/*
angular
    .module('example')
    .controller('InitialViewController', function($scope, supersonic) {

        $scope.signUp = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#signup");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });*/

angular
    .module('example')
    .controller('InitialViewController', function($scope, supersonic, $http) {


        $scope.login = function() {
            $http({
                url: "https://friendr-be400.firebaseio.com" + "/signIn",
                method: "POST",
                data: {
                    username: $scope.email,
                    password: $scope.password
                }
            }).success(function(data, status, headers, config) {
                if(data !== undefined && data !== null) {
                    $scope.data = data;
                    window.localStorage.setItem("userId", data.userId + "");
                    window.localStorage.setItem("authKey", data.authKey + "");
                    window.localStorage.setItem("userProfile", JSON.stringify(data.userProfile));
                    supersonic.ui.initialView.dismiss();
                } else {
                    alert("Error");
                }
            }).error(function(data, status, headers, config) {
                alert(JSON.stringify(data));
            });
        }

        $scope.signUp = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#signup");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };
    });

angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

  });

angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
        $scope.myName = "BOO BOO";

  });

/**
 * Created by apoorvaparmar on 1/14/17.
 */
angular
    .module('example')
    .controller('SignupController', function($scope, supersonic) {

        $scope.close = function() {
            supersonic.ui.modal.hide();

        };

    });