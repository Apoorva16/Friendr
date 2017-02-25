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
