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
        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);
         window.localStorage.setItem('id5',JSON.stringify(id1));


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
        $scope.hasmsg;
        $scope.testmsg;
      var id2;
      var obj;
      id2 = window.localStorage.getItem('id5');

      backendService.viewConversation(JSON.parse(id2)).then(function(value){
          $scope.hasmsg= value;
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
                  var convoId1 = firebase.database().ref('conversations').child(conversation_id1);
                  var convoId2 = firebase.database().ref('conversations').child(conversation_id2);
                  supersonic.logger.log("Is it working?");

                  convoId1.child('message_list').on('child_added', function (snapshot, prevKey) {
                      if (snapshot.hasChildren()) {
                          supersonic.logger.log("Is it working?");

                          //TODO: insert code to add message to conversation
                         // var obj1 = snapshot.val().message;
                        //  obj = JSON.parse(obj1);
                        //  $scope.testmsg = obj;
                          $scope.testmsg = snapshot.val().message;

                          supersonic.logger.log(snapshot.val().message);
                          //resolve(snapshot.val());
                      }
                  });

                  convoId2.child('message_list').on('child_added', function (snapshot, prevKey) {
                      if (snapshot.hasChildren()) {
                          supersonic.logger.log("Is it working?");

                          //TODO: insert code to add message to conversation
                          //var obj1 = snapshot.val().message;
                          //obj = JSON.parse(obj1);

                         $scope.testmsg = snapshot.val().message;
                          //$scope.testmsg = obj;

                          supersonic.logger.log(snapshot.val().message);
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


         // $scope.currmsg = backendService.listenToConversation(JSON.parse(id2));
          //supersonic.logger.log($scope.currmsg);
      }


     // backendService.sendMessage(user.other_user,$message).then(function(value) {


//})


});

/**
 * Created by srishti on 2/19/17.
 */

     var myFunction = function($scope, supersonic) {

        var view = new supersonic.ui.View("example#message");
        supersonic.ui.layers.push(view);
    supersonic.logger.log("Something semi-interesting just happened.");

    };
