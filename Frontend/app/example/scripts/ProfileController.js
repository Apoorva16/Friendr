angular
    .module('example')
    .controller('ProfileController', function($scope, supersonic) {

        $scope.profilefunc = function() {

            // supersonic.ui.dialog.alert("Signup working Yo");


            var modalView = new supersonic.ui.View("example#profile");
            var options = {
                animate: true
            };
            supersonic.ui.modal.show(modalView, options);
        };

    });
