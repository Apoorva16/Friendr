angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'common'
]);

/**
 * Created by apoorvaparmar on 1/14/17.
 */

angular
    .module('example')
    .controller('DrawerController', function($scope, supersonic,backendService) {

        $scope.logout = function() {


            supersonic.ui.initialView.show();
            //supersonic.ui.dialog.alert("Say hello");
        };

        $scope.preference = function() {
            //supersonic.logger.log("hi");
            var view = new supersonic.ui.View("example#preference");
            supersonic.ui.layers.push(view);
            supersonic.ui.drawers.close();
        }

        $scope.myFunction = function(){
            var view = new supersonic.ui.View("example#getting-started");
            supersonic.ui.layers.push(view);
            supersonic.logger.log("Something semi-interesting just happened.");
            supersonic.ui.drawers.close();

        }


    });
angular
    .module('example')
    .controller('FAQController', function($scope, supersonic,backendService) {

        $scope.faqs = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#faq");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });

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
                supersonic.ui.initialView.dismiss();

                // alert(JSON.stringify(object));
                // alert("Sign in successful");
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
angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic,backendService) {

     $scope.myFunction = function(){
         var view = new supersonic.ui.View("example#message");
         supersonic.ui.layers.push(view);
         supersonic.logger.log("Something semi-interesting just happened.");

     }


  });

/**
 * Created by apoorvaparmar on 3/28/17.
 */
angular
    .module('example')
    .controller('PasswordController', function($scope, supersonic,backendService) {

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
angular
    .module('example')
    .controller('Profile', function($scope, supersonic,backendService) {

        var userObj = JSON.parse(window.localStorage.getItem("userObj"));
        $scope.profileImage = userObj.photoURL;

        $scope.choosePhoto = function() {
            var options = {
                quality: 50,
                allowEdit: true,
                targetWidth: 300,
                targetHeight: 300,
                encodingType: "jpeg",
                destinationType: "dataURL"
            };
            supersonic.media.camera.getFromPhotoLibrary(options).then( function(result){
                // save it in database
                $scope.profileImage = result;

                var user = firebase.auth().currentUser;
                user.updateProfile({
                    photoURL: result
                });

                userObj.photoURL = result;
                window.localStorage.setItem("userObj", JSON.stringify(userObj));

                // alert()
            });
        };

    });/**
 * Created by apoorvaparmar on 3/29/17.
 */

angular
    .module('example')
    .controller('ProfileController', function($scope, supersonic,backendService) {

        $scope.profilefunc = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#profile");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });

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
angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic,backendService) {

      $scope.settings = function() {

          // supersonic.ui.dialog.alert("Signup working Yo");


          var modalView = new supersonic.ui.View("example#settings");
          var options = {
              animate: true
          };
          supersonic.ui.modal.show(modalView, options);
      };

  });

/**
 * Created by apoorvaparmar on 1/14/17.
 */
angular
    .module('example')
    .controller('SignupController', function($scope, supersonic,backendService) {

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
/**
 * Created by srishti on 2/19/17.
 */

     var myFunction = function($scope, supersonic,backendService) {

        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);
    supersonic.logger.log("Something semi-interesting just happened.");

    };

angular
	.module('example')
	.controller('preferenceController', function($scope,supersonic,$http,backendService){
		$scope.studyKey = [];
		$scope.workoutKey = [];
		$scope.eatKey = [];
		$scope.eat;
		$scope.workout;
		$scope.study;
		$scope.test;
		// $scope.eatPreferrence = ["Location": "", "Preferred Match Gender": ""];
		// $scope.workoutPreferrence = ["Work Out Type": "", "Preferred Match Gender": ""];
		// $scope.studyPreference = ["Location": "", "Preferred Match Gender": "", "Subject": ""];



		$http.get('http://api.purdue.io/odata/Subjects').then(function(data) {
				$scope.courses = data.data.value;
				//supersonic.logger.log($scope.courses);
		}).catch(function(err){
			supersonic.logger.log("error " + 	err);
		}) 

		backendService.getPreferenceList("Eat").then(function(data) {
			$scope.eat = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					$scope.eatKey.push(key);
				}
			}
		})
		backendService.getPreferenceList("Study").then(function(data) {
			$scope.study = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					supersonic.logger.log($scope.study[key]);
					$scope.studyKey.push(key);
				}
			}
		})
		backendService.getPreferenceList("Work Out").then(function(data) {
			$scope.workout = data;
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					supersonic.logger.log($scope.workout[key]);
					$scope.workoutKey.push(key);
				}
			}
		})

		$scope.submitEat = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Eat", value);
		}
		$scope.submitWorkout = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Work Out", value);
		}
		$scope.submitStudy = function(value) {
			// supersonic.logger.log($scope.eatKey);
			// supersonic.logger.log($scope.studyKey);
			backendService.setPreferencesForUser("Study", value);
		}
	})