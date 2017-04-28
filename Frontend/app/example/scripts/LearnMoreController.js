angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic, backendService) {
        $scope.conversationList = [];
        //	var id1;

        $scope.populateConversationListDetails = function(user) {
            firebase.database().ref('Users/' + user.other_user_uid + '/Profile').once('value').then(function(snapshot) {
                var element = {
                    user : {
                        uid: user.other_user_uid,
                        profile : {
                            FirstName : snapshot.val().FirstName,
                            LastName : snapshot.val().LastName,
                            UserName : snapshot.val().UserName,
                            Gender : snapshot.val().Gender,
                            Image : snapshot.val().Image
                        }
                    }
                };
                $scope.conversationList.push(element);
                $scope.$apply();
            });
        };

<<<<<<< HEAD
     $scope.myFunction = function(index){
         var id8 = $scope.other_users[index].other_user;
     	var id1= $scope.other_users[index].other_user_uid;
         var view = new supersonic.ui.View("example#message");
         supersonic.ui.layers.push(view);
         window.localStorage.setItem('id5',JSON.stringify(id1));
         window.localStorage.setItem('id10',JSON.stringify(id8));
     }
      var id2 = window.localStorage.getItem('id5');

      $scope.deleteTapped = function(){
          backendService.deleteMatch(JSON.parse(id2));
      }
=======
         backendService.viewConversationList().then(function(value) {
             for(var index = 0; index < value.length; index++) {
                 var user = value[index];
                 $scope.populateConversationListDetails(user);
             }
          });

        $scope.viewConversation = function(index){
            window.localStorage.setItem("messageUserObj", JSON.stringify($scope.conversationList[index]));

            var id1 = $scope.conversationList[index].user.uid;
            window.localStorage.setItem('id5',JSON.stringify(id1));

            var view = new supersonic.ui.View("example#message");
            supersonic.ui.layers.push(view);

        }
>>>>>>> 0e0bae3e1badac6325f5e99b3704c0c3c5845bf5

      $scope.viewTitle = JSON.parse(id2);
  });
