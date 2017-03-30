/**
 * Created by apoorvaparmar on 3/28/17.
 */
angular
    .module('example')
    .controller('PasswordController', function($scope, supersonic) {

        $scope.resetPassword = function() {

            firebase.auth().sendPasswordResetEmail($scope.email).then(function(object) {
                // email sent
                window.localStorage.setItem("userObj", JSON.stringify(object) + "");
                alert("Sucess password change");
        })
        .catch(function(error) {
            alert(JSON.stringify(error));
            alert("Password changed failed");
        });
        };
        $scope.close = function() {
            supersonic.ui.modal.hide();

        };
    });