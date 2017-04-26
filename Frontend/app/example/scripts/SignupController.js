/**
 * Created by apoorvaparmar on 1/14/17.
 */
angular
    .module('example')
    .controller('SignupController', function($scope, supersonic,backendService) {

        $scope.email = "apu@gmail.com";
        $scope.password = "helloworld";
        $scope.firstName = "Alpha";
        $scope.lastName = "Numeric";
        $scope.username = "alpha";
        $scope.gender = "Female";

        $scope.signup = function() {
            /* Note: Perform ERROR CHECKING for all fields */
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function(object) {
                    firebase.auth().onAuthStateChanged(function(currentUser) {
                        if(currentUser) {
                            firebase.database().ref('Users/' + currentUser.uid + '/Profile').set({
                                FirstName: $scope.firstName,
                                LastName: $scope.lastName,
                                Username: $scope.username,
                                Gender: $scope.gender
                            });
                            //fi
                        }

                        window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");


                        $scope.confirmemail();
                    });
                })
                .catch(function(error) {
                    alert(JSON.stringify(error));
                    alert("Sign up unsuccessful");
                });
        };

        $scope.close = function() {
            supersonic.ui.modal.hide();

        };
        $scope.confirmemail = function () {

            user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function(object) {
                window.localStorage.setItem("userObj", JSON.stringify(object) + "");
                alert("Confirmation email sent");
                supersonic.ui.modal.hide();
            })
                .catch(function(error) {
                    alert(JSON.stringify(error));
                    alert("Confirmation email failed");
                });
        };
    });