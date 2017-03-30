/**
 * Created by apoorvaparmar on 3/29/17.
 */
angular
    .module('example')
    .controller('Settings', function($scope, supersonic, backendService) {

        // $scope.fillDetails = function() {
            var user = firebase.auth().currentUser;
            $scope.usernameStr = user.email;
            $scope.username = "";
            $scope.password = "";
            $scope.confirmPassword = "";
            $scope.timestamp = null;

            $scope.userObj = window.localStorage.getItem("userObj");
        // };

        // setTimeout(function(){ $scope.fillDetails() }, 5000);

        $scope.changePass = function() {
            //Change Password
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