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

  });
