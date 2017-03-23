angular
  .module('example')
  .controller('messageController', function($scope, supersonic, backendService) {
        supersonic.logger.log("this is in a new view");
        $scope.test= "tesght";
        
  });
