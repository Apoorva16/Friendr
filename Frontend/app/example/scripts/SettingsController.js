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
