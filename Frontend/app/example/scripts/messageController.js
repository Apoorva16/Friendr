angular
  .module('example')
  .controller('messageController', function($scope, supersonic, backendService) {
      supersonic.logger.log("this is in a new view");
        $scope.hasmsg;
        $scope.testmsg;
        $scope.newMessage = -1;
        $scope.newMsg = [];
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
                          // $scope.newMsg.push($scope.testmsg);
                          //supersonic.logger.log(snapshot.val().message);
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
                          // $scope.newMsg.push($scope.testmsg);
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
          //$scope.apply();

         // $scope.currmsg = backendService.listenToConversation(JSON.parse(id2));
          //supersonic.logger.log($scope.currmsg);
      }


     // backendService.sendMessage(user.other_user,$message).then(function(value) {


//})


});
