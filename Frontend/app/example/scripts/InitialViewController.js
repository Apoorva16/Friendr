/**
 * Created by apoorvaparmar on 1/14/17.
 */
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
    .module('example')
    .controller('InitialViewController', function($scope, supersonic,backendService) {

        $scope.email = "testing@purdue.edu";
        $scope.password = "testing";

        $scope.login = function() {

            //firebase.signIn($scope.email, $scope.password);
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(object) {
                window.localStorage.setItem("userObj", JSON.stringify(object) + "");

                /* AP: Get user's profile */
                firebase.database().ref('Users/' + object.uid + '/Profile').once('value').then(function(snapshot) {
                    var profile = {
                        FirstName: snapshot.val().FirstName,
                        LastName: snapshot.val().LastName,
                        Gender: snapshot.val().Gender,
                        UserName: snapshot.val().UserName
                    };
                    window.localStorage.setItem("profile", JSON.stringify(profile) + "");

                    supersonic.ui.initialView.dismiss();
                }).catch(function(error) {
                    /* AP: Error in retrieving user's profile */
                   alert(JSON.stringify(error)) ;
                });
            }).catch(function (error) {
                alert("Sign in unsuccessful");
            });
        };

        $scope.signUp = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");
            var modalView = new supersonic.ui.View("example#signup");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };
        $scope.reset = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#password");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };
    });