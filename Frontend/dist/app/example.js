angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'common'
]);

/**
 * Created by apoorvaparmar on 4/25/17.
 */
/**
 * Created by apoorvaparmar on 3/29/17.
 */
angular
    .module('example')
    .controller('Activity', function($scope, supersonic, backendService) {

        $scope.matchedlistusers;

        backendService.viewConversationList().then(function (value) {
            $scope.$apply();
            $scope.matchedlistusers = value;
            $scope.$apply();
            alert($scope.matchedlistusers[0].other_user);
        });

       /* $scope.searchforuser = function() {

            var matchedUser = new Promise(function(resolve, reject)
            {
                firebase.auth().onAuthStateChanged(function(user)
                {
                    if (user)
                    {
                        database.ref('Users/' + user.uid + '/Match_List').once('value').then(function(snapshot)
                        {
                            snapshot.forEach(function(childSnapshot)
                            {
                                var other_uid = childSnapshot.key;
                                database.ref('Users/' + other_uid + '/Profile').once('value').then(function(snapshot1)
                                {
                                    var other_user = snapshot1.val();
                                    if (srchFirstName == other_user.FirstName)
                                    {
                                        if (srchLastName == other_user.LastName)
                                        {
                                            resolve(other_user);
                                        }
                                        else
                                        {
                                            resolve("None Found.")
                                        }
                                    }
                                    else
                                    {
                                        resolve("None Found.")
                                    }
                                });
                            });
                        });
                    }
                });
            });

            return matchedUser;

        };*/


});
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
  .controller('LearnMoreController', function($scope, supersonic, backendService) {
  		$scope.other_users;
  	//	var id1;
  	 backendService.viewConversationList().then(function(value) {
         	$scope.other_users = value;
         	supersonic.logger.log($scope.other_users);

      })

     $scope.myFunction = function(index){
     	var id1= $scope.other_users[index].other_user_uid;
         var view = new supersonic.ui.View("example#message");
         supersonic.ui.layers.push(view);
         window.localStorage.setItem('id5',JSON.stringify(id1));

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
        $scope.userObj = userObj;
        $scope.profileImage = userObj.photoURL;
        // var userObj = JSON.parse(window.localStorage.getItem("userObj"));
        // $scope.PictureLink = userObj.PictureLink;
        $scope.description = "";

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
                // s


                /* SUPER IDEAL
                1. First user selects image.
                2. Appgyver gives to us a base64 string.
                3. we need to make api call to send this image to firebase.
                4. backend should host the image, which means we get a hyperlink for it. www.aws/s3/myimage ...
                5. backend should send us this URL in the userObj they send us on login.
                 */

                /* How we did it for Sprint 2.
                 1. First user selects image.
                 2. Appgyver gives to us a base64 string.
                 3. We save this entire image itself (which is a base64 string) into 'photoURL'
                 4. photoURL is something firebase already includes when in the default userObj, which we get upon login.
                 */

                // var user = firebase.auth().currentUser;
                firebase.auth().onAuthStateChanged(function(currentUser) {
                    // if (currentUser) {
                    //     {
                    //         database.ref('Users/' + currentUser.uid + '/Profile').update({
                    //             PictureLink: $scope.profileImage
                    //         });
                    //     }
                        currentUser.updateProfile({
                            photoURL: $scope.profileImage  /*is base64 */
                        });
                    // }
                });

                userObj.photoURL = result;
                // userObj.PictureLink = result;
                // window.localStorage.setItem("userObj", JSON.stringify(userObj) + "");
                window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");

                // console.log("JSON.stringify(userObj)");
            });
        };

        $scope.aboutme = function() {

            // var user = firebase.auth().currentUser;
            firebase.auth().onAuthStateChanged(function(currentUser) {
                if (currentUser) {
                    alert("I'm here");
                    database.ref('Users/' + user.uid + '/Profile').update({
                        AboutMe: $scope.description
                    });
                    alert("I'm here2");
                }
                alert("I'm here3");
                window.localStorage.setItem("userObj", JSON.stringify(currentUser) + "");
                alert("Your changes have been made");
            })
                .catch(function(error) {
                    alert(JSON.stringify(error));
                    alert("Your changes were not made");
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
            backendService.modifyUsername($scope.username);

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

                    database.ref('Users/' + user.uid).update({
                        username: $scope.username
                    });
                }
            });

            $scope.password ="";
            $scope.username= "";
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
angular
  .module('example')
  .controller('messageController', function($scope, supersonic, backendService) {
      supersonic.logger.log("this is in a new view");
        $scope.hasmsg;
        $scope.testmsg;
        $scope.newMessage = -1;
        $scope.msgs = [];
      var id2;
      var obj;
      id2 = window.localStorage.getItem('id5');
      var id12 = window.localStorage.getItem('id10');

      $scope.viewTitle = JSON.parse(id12);
      $scope.msgS = JSON.parse(id2);

      backendService.viewConversation(JSON.parse(id2)).then(function(value){
          $scope.hasmsg= value;
         //alert($scope.hasmsg);
          supersonic.logger.log($scope.hasmsg);
          $scope.testmsg = " ";
      })
      var other_data = JSON.parse(id2);

      $scope.tester1 = function(){
          firebase.auth().onAuthStateChanged(function (user) {
              if (user) {

                  var conversation_id1 = user.uid + ' ' + other_data;
                  var conversation_id2 = other_data + ' ' + user.uid;
                  supersonic.logger.log("Is it working?");

                  //determine which conversation_id is correct
                  var convoId1 = firebase.database().ref('Conversations').child(conversation_id1);
                  var convoId2 = firebase.database().ref('Conversations').child(conversation_id2);
                  supersonic.logger.log("Is it working?");

                  convoId1.child('Message_List').limitToLast(1).on('child_added', function (snapshot, prevKey) {
                      if (snapshot.hasChildren()) {
                          supersonic.logger.log("Is it working?");

                          //TODO: insert code to add message to conversation
                         // var obj1 = snapshot.val().message;
                        //  obj = JSON.parse(obj1);
                        //  $scope.testmsg = obj;
                          $scope.testmsg = snapshot.val().Message;
                          //alert($scope.testmsg);
                          $scope.msgs.push(snapshot.val());
                          //supersonic.logger.log(snapshot.val().message);
                          //resolve(snapshot.val());
                      }
                  });

                  convoId2.child('Message_List').limitToLast(1).on('child_added', function (snapshot, prevKey) {
                      if (snapshot.hasChildren()) {
                          supersonic.logger.log("Is it working?");

                          //TODO: insert code to add message to conversation
                          //var obj1 = snapshot.val().message;
                          //obj = JSON.parse(obj1);

                         $scope.testmsg = snapshot.val().Message;
                          //alert($scope.testmsg);
                         $scope.msgs.push(snapshot.val());

                          //$scope.testmsg = obj;
                          // alert("hey");

                          //supersonic.logger.log(snapshot.val().message);
                          // resolve(snapshot.val());
                      }
                  });
              }
          });
      }




      $scope.inputValue = function(){
         //   alert("Yo" + $scope.foo);
         //alert(JSON.parse(id2));
          supersonic.logger.log("id2 "+ JSON.parse(id2));
          backendService.sendMessage(JSON.parse(id2),$scope.foo);
          $scope.newMessage++;
          $scope.foo = "";
          //alert($scope.msgs);
          $scope.apply();

         // $scope.currmsg = backendService.listenToConversation(JSON.parse(id2));
          //supersonic.logger.log($scope.currmsg);
      }


     // backendService.sendMessage(user.other_user,$message).then(function(value) {


//})


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