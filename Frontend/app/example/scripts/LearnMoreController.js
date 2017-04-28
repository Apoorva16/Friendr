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

      $scope.viewTitle = JSON.parse(id2);
  });
