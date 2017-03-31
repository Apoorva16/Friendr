/**
 * Created by apoorvaparmar on 3/29/17.
 */
angular
    .module('example')
    .controller('Settings', function($scope, supersonic, backendService) {

            $scope.username = "";
            $scope.password = "";
            $scope.confirmPassword = "";
            $scope.timestamp = null;

        $scope.changePass = function() {
            //Change Password
            var user = firebase.auth().currentUser;
            user.updatePassword($scope.password).then(function(object) {
                window.localStorage.setItem("userObj", JSON.stringify(object) + "");
                alert("Sucess password change");
                //success
            })
            .catch(function(error) {
                alert(JSON.stringify(error));
                alert("Password changed failed");
            });

            //Change username
            firebase.auth().onAuthStateChanged(function(currentUser) {
                if (currentUser) {
                    currentUser.updateProfile({
                        username: $scope.username
                    });

                    window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");

                    database.ref('users/' + user.uid).update({
                        username: $scope.username
                    });
                }
            });
        };
    });