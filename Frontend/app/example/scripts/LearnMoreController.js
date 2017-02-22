angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";
     $scope.myFunction = function(){
         var view = new supersonic.ui.View("example#message");
         supersonic.ui.layers.push(view);
         supersonic.logger.log("Something semi-interesting just happened.");

     }

  });
