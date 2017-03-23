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
