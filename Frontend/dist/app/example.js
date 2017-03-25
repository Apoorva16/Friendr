angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'common'
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
        $scope.myFunction = function(){
            var view = new supersonic.ui.View("example#getting-started");
            supersonic.ui.layers.push(view);
            //supersonic.logger.log("Something semi-interesting just happened.");
            supersonic.ui.drawers.close();

        }


    });
/**
 * Created by apoorvaparmar on 1/14/17.
 */
//  (function(){
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
    .controller('InitialViewController', function($scope, supersonic, backendService) {

        $scope.email = "jradocho@purdue.edu";
        $scope.password = "password";
        $scope.login = function() {

            //firebase.signIn($scope.email, $scope.password);
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function(object) {

                window.localStorage.setItem("userObj", JSON.stringify(object) + "");
                supersonic.ui.initialView.dismiss();

                // alert(JSON.stringify(object));
                // alert("Sign in successful");
            }).catch(function (error) {
                alert("Sign in unsuccessful");
            });
            // backendService.signIn($scope.email,$scope.password);
            // supersonic.logger.log(success);
        };

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
  .controller('LearnMoreController', function($scope, supersonic, backendService) {
  		$scope.other_users;
  		var id1;
  	 backendService.viewConversationList().then(function(value) {
         	$scope.other_users = value;
         	supersonic.logger.log($scope.other_users);
         	
      })

     $scope.myFunction = function(index){
     	id1= $scope.other_users[index].other_user_uid;
     	// supersonic.logger.log(id);
        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);

     }


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

        $scope.email = "abcd@gmail.com";
        $scope.password = "helloworld";
        $scope.firstName = "Alpha";
        $scope.lastName = "Numeric";
        $scope.username = "alpha";

        $scope.signup = function() {
            /* Note: Perform ERROR CHECKING for all fields */

            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
            .then(function(object) {
                firebase.auth().onAuthStateChanged(function(currentUser) {
                    if(currentUser) {
                        firebase.database().ref('users/' + currentUser.uid).set({
                            firstName: $scope.firstName,
                            lastName: $scope.lastName,
                            username: $scope.username
                        });
                    }

                    window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");
                    supersonic.ui.modal.hide();
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
    });
angular
  .module('example')
  .controller('messageController', function($scope, supersonic, backendService) {
        supersonic.logger.log("this is in a new view");
        $scope.test= "tesght";
        
  });

/**
 * Created by srishti on 2/19/17.
 */

     var myFunction = function($scope, supersonic) {

        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);
    supersonic.logger.log("Something semi-interesting just happened.");

    };