angular
  .module('example')
  .controller('messageController', function($scope, supersonic, backendService) {

        var messageUserObj = JSON.parse(window.localStorage.getItem("messageUserObj"));
        $scope.title = messageUserObj.user.profile.FirstName + " " + messageUserObj.user.profile.LastName[0];
       // alert($scope.title);

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

      $scope.buttonTapped = function(){
          //alert("does it work?");
          backendService.clearConversation(JSON.parse(id2));
          $scope.msgs ="";
          $scope.hasmsg = "";
      }

      backendService.viewConversation(JSON.parse(id2)).then(function(value){
          $scope.hasmsg= value;
         //alert($scope.hasmsg);
          supersonic.logger.log($scope.hasmsg);
          $scope.testmsg = " ";
<<<<<<< HEAD
          $scope.apply();
      })
=======
      });
>>>>>>> 0e0bae3e1badac6325f5e99b3704c0c3c5845bf5
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
      };




      $scope.inputValue = function(){
         //   alert("Yo" + $scope.foo);
         //alert(JSON.parse(id2));
          supersonic.logger.log("id2 "+ JSON.parse(id2));
          backendService.sendMessage(JSON.parse(id2),$scope.foo);
          $scope.newMessage++;
          $scope.foo = "";
         // $scope.tester1();
          //alert($scope.msgs);
          $scope.apply();

         // $scope.currmsg = backendService.listenToConversation(JSON.parse(id2));
          //supersonic.logger.log($scope.currmsg);
      };


      backendService.sendMessage(user.other_user,$message).then(function(value) {


      })


});
